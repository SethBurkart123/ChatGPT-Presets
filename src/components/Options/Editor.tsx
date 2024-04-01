import React from "react";
/*
import { BlockNoteEditor, DefaultBlockSchema } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import {
  defaultBlockSchema,
} from "@blocknote/core";
import CodeBlock, { insertCodeBlock } from "./Editor/Codeblock";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import CodeBlockComponent from "./Editor/CodeBlockComponent";*/

export default function Editor({presetContent, setPresetContent} : {presetContent: string, setPresetContent: React.Dispatch<React.SetStateAction<string>>}): JSX.Element {

  /*const editor = useEditor({
    extensions: [
      StarterKit,
      //CodeBlockComponent
    ],
    content: presetContent,
    onUpdate(props) {
      setPresetContent(props.editor.getHTML())
    },
  })*/

  {/* <EditorContent className="w-full p-2 prose prose-xl border rounded-lg bg-zinc-900/20 dark:prose-invert focus:outline-none focus:border-white/50 border-zinc-200/20" editor={editor} />
   */}
  return (
    <textarea
      value={presetContent}
      onChange={(e) => setPresetContent(e.target.value)}
      className="bg-zinc-900/20 min-h-[300px] focus:outline-none focus:border-white/50 border-zinc-200/20 w-full p-2 border rounded-lg" />
  );
}
  /* @ts-ignore
  const editor: BlockNoteEditor | null = useBlockNote({
    theme: "dark",
    enableBlockNoteExtensions: true,
    // Tells BlockNote which blocks to use.
    blockSchema: {
      // Adds all default blocks.
      ...defaultBlockSchema,
      // Adds the custom image block.
      codeBlock: CodeBlock,
    },
    slashCommands: [...defaultReactSlashMenuItems, insertCodeBlock],
  });

  // Renders the editor instance using a React component.
  return(
    <BlockNoteView  editor={editor} />
  );*/