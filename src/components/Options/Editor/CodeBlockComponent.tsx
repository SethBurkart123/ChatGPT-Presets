import './CodeBlockComponent.css';

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { Extension } from '@tiptap/core';
import { FormControl, Select, MenuItem } from '@mui/material';

interface CodeBlockProps {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (attrs: { language: string }) => void;
  extension: Extension;
}

const CodeBlockComponent: React.FC<CodeBlockProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) => {
  return (
    <NodeViewWrapper className="code-block">
      <FormControl>
        <Select
          contentEditable={false}
          defaultValue="null"
          onChange={(event) =>
            updateAttributes({ language: event.target.value })
          }
        >
          <MenuItem value="null">auto</MenuItem>
          <MenuItem disabled>—</MenuItem>
          {extension.options.lowlight.listLanguages().map((lang: any, index: any) => (
            <MenuItem key={index} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
        <pre>
          <NodeViewContent as="code" />
        </pre>
      </FormControl>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
