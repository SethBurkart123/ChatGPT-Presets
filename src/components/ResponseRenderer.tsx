import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Button, IconButton } from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { createLowlight, common } from 'lowlight';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface ResponseRendererProps {
  response: string;
  error: boolean;
  onCopyResponse: (text: string) => void;
  onOpenChatGPT: () => void;
}

const CodeBlockTitle: React.FC<{ language: string; code: string }> = ({
  language,
  code,
}) => {
  return (
    <div className="flex items-center justify-between px-2 py-1 text-white rounded-t-lg bg-zinc-800">
      <span className="text-sm">{language}</span>
      <IconButton
        color="inherit"
        onClick={() => navigator.clipboard.writeText(language)}
        size="small"
      >
        <FileCopy fontSize="small" />
      </IconButton>
    </div>
  );
};

const CodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => {
  const detectedLanguage = language || detectLanguage(value);
  return (
    <div className="relative rounded-b-lg bg-zinc-800/40">
      <CodeBlockTitle code={value} language={detectedLanguage} />
      <div className="p-2 w-full overflow-x-scroll shadow-inner">
        <SyntaxHighlighter language={detectedLanguage} style={{ ...atomDark, 'pre[class*="language-"]': { ...atomDark['pre[class*="language-"]'], backgroundColor: 'transparent', borderRadius: 0, padding: 0 } }}>
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const detectLanguage = (value: string): string => {
  const lowlight = createLowlight(common);
  const language = lowlight.highlightAuto(value);
  return language.data.language;
};

const ResponseRenderer: React.FC<ResponseRendererProps> = ({
  response,
  error,
  onCopyResponse,
  onOpenChatGPT,
}) => {
  return (
    <div className="p-4">
      {response !== '' && (
        <div className="p-2 mt-4 text-lg text-white border rounded-lg bg-zinc-900/70 drop-shadow-lg border-white/20">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/20">
            <p className="font-bold align-middle">Response:</p>
            <Button
              variant="text"
              color="inherit"
              onClick={() => onCopyResponse(response)}
              endIcon={<FileCopy fontSize="small" />}
            >
              Copy
            </Button>
          </div>

          <Markdown
            options={{
              overrides: {
                code: {
                  component: ({ className, children, ...props }) => {
                    return className ? (
                      <CodeBlock language={className.split('-')[1]} value={String(children).replace(/\n$/, '')} {...props} />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );    
                    /* return <CodeBlock language={language} value={String(children).replace(/\n$/, '')} {...props} />; */
                  },
                },
              },
            }}
            className="max-w-2xl prose prose-invert prose-pre:bg-transparent prose-pre:p-0 prose-pre:rounded-none"
          >
            {response}
          </Markdown>

          {error && (
            <a
              onClick={onOpenChatGPT}
              className="text-blue-400 underline cursor-pointer"
            >
              chat.openai.com
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseRenderer;