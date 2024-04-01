import ExpiryMap from 'expiry-map'
import { v4 as uuidv4 } from 'uuid'
import { fetchSSE } from './fetch-sse'
import type { GenerateAnswerParams, Provider } from './types'
import axios from 'axios'

async function request(token: string, method: string, path: string, data?: unknown) {
  return fetch(`https://chat.openai.com/backend-api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  })
}

export async function sendMessageFeedback(token: string, data: unknown) {
  await request(token, 'POST', '/conversation/message_feedback', data)
}

export async function setConversationProperty(
  token: string,
  conversationId: string,
  propertyObject: object,
) {
  await request(token, 'PATCH', `/conversation/${conversationId}`, propertyObject)
}

const KEY_ACCESS_TOKEN = 'accessToken'

const cache = new ExpiryMap(10 * 1000)

export async function getChatGPTAccessToken(): Promise<string> {
  if (cache.get(KEY_ACCESS_TOKEN)) {
    return cache.get(KEY_ACCESS_TOKEN)
  }
  const resp = await fetch('https://chat.openai.com/api/auth/session')
  if (resp.status === 403) {
    console.log("Cloudflare is blocking us, can't get access token")
    throw new Error('CLOUDFLARE')
  }
  const data = await resp.json().catch(() => ({}))
  if (!data.accessToken) {
    console.log("Can't get access token", data)
    throw new Error('UNAUTHORIZED')
  }
  cache.set(KEY_ACCESS_TOKEN, data.accessToken)
  return data.accessToken
}

export class ChatGPTProvider implements Provider {
  constructor(private token: string) {
    this.token = token
  }

  private async fetchModels(): Promise<
    { slug: string; title: string; description: string; max_tokens: number }[]
  > {
    const resp = await request(this.token, 'GET', '/models').then((r) => r.json())
    return resp.models
  }

  private async getModelName(): Promise<string> {
    try {
      const models = await this.fetchModels()
      return models[0].slug
    } catch (err) {
      console.error(err)
      return 'text-davinci-002-render-sha'
    }
  }

  async generateAnswer(params: GenerateAnswerParams) {
    let conversationId: string | undefined

    const cleanup = () => {
      if (conversationId) {
        setConversationProperty(this.token, conversationId, { is_visible: false })
      }
    }

    const modelName = await this.getModelName()
    console.debug('Using model:', modelName)

    let requirement;
    try {
      const result = await axios.post(
        "https://chat.openai.com/backend-api/sentinel/chat-requirements",
        undefined,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        },
      );
      if (result) {
        requirement = result.data;
      }
    } catch (error) {
      console.error("Error get chat-requirements token:", error);
      console.error("ChatGPT response:", event);
    }

    if (!requirement) {
      console.error("ChatGPT response:", event);
    } else {
      console.log("Requirements:", requirement);
    }

    await fetchSSE('https://chat.openai.com/backend-api/conversation', {
      method: 'POST',
      signal: params.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
        Accept: 'text/event-stream',
        'Openai-Sentinel-Chat-Requirements-Token': requirement.token,
      },
      body: JSON.stringify({
        action: 'next',
        conversation_mode: {
          kind: "primary_assistant"
        },
        arkose_token: undefined,
        force_nulligen: false,
        force_paragen: false,
        force_paragen_model_slug: "",
        force_rate_limit: false,
        timezone_offset_min: -660,
        websocket_request_id: uuidv4(),
        history_and_training_disabled: false,
        messages: [
          {
            id: uuidv4(),
            author: {
              role: 'user',
            },
            content: {
              content_type: 'text',
              parts: [params.prompt],
            },
            metadata: {}
          },
        ],
        model: modelName,
        parent_message_id: uuidv4(),
      }),
      onMessage(message: string) {
        console.debug('sse message', message)
        if (message === '[DONE]') {
          params.onEvent({ type: 'done' })
          cleanup()
          return
        }
        let data
        try {
          data = JSON.parse(message)
        } catch (err) {
          console.error(err)
          return
        }
        const text = data.message?.content?.parts?.[0]
        if (text) {
          conversationId = data.conversation_id
          params.onEvent({
            type: 'answer',
            data: {
              text,
              messageId: data.message.id,
              conversationId: data.conversation_id,
            },
          })
        }
      },
    })
    return { cleanup }
  }
}