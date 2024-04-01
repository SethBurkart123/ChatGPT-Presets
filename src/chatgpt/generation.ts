import { ChatGPTProvider, getChatGPTAccessToken } from './chatgpt'

export default async function getAnswer(prompt: string, onUpdate: (text: string) => void): Promise<any> {
  let token: string | undefined = undefined;
  try {
    token = await getChatGPTAccessToken()
  } catch(err) {
    console.log(err)
    if (err?.toString().includes("UNAUTHORIZED")) {
      console.log("not logged in")
      return "UNAUTHORIZED";
    } else if (err?.toString().includes("CLOUDFLARE")) {
      return "CLOUDFLARE";
    }
  }
  if (token !== undefined) {
    const provider = new ChatGPTProvider(token)
    await provider.generateAnswer({
      prompt,
      signal: undefined,
      onEvent: (event) => {
        if (event.type === 'answer') {
          onUpdate(event.data.text)
        } else if (event.type === 'done') {
          console.log('Done')
        }
      },
    })
  } else {
    console.error('Failed to get access token')
    return "failed";
  }
}