import { DefaultBlockSchema } from "@blocknote/core";
import { ReactSlashMenuItem, createReactBlockSpec } from "@blocknote/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeBlockComponent from "./CodeBlockComponent";

const CodeBlock = createReactBlockSpec({
  type: "codeBlock",
  propSchema: {
    language: {
      default: "javascript",
    },
    code: {
      default: "",
    },
  },
  containsInlineContent: true,
  render: ({ block }) => (
      <div className="w-full min-h-[32px] bg-gray-500"></div>
    ),
    /*<SyntaxHighlighter
      language={block.props.language}
      style={darcula}
      contentEditable
      showLineNumbers>
        {block.props.code}
  </SyntaxHighlighter>*/
});

export default CodeBlock;

// Creates a slash menu item for inserting an image block.
export const insertCodeBlock = new ReactSlashMenuItem<
  DefaultBlockSchema & { codeBlock: typeof CodeBlock }
>(
  "CodeBlock",
  (editor) => {
    editor.insertBlocks(
      [
        {
          type: "codeBlock",
          props: {
            language: "javascript",
            code: "import random\n print(random.randint(0, 9))",
          },
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
    );
  },
  ["code", "codeBlock", "programming"],
  "Programming",
  <div className="m-auto text-lg text-white">C</div>,
  "Add a code block"
);
