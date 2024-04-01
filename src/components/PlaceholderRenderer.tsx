import React from 'react';
import { InputBox } from './Renderer/InputBox';
import { SingleChoice } from './Renderer/SingleChoice';
import { MultipleChoice } from './Renderer/MultipleChoice';

const MemoInputBox = React.memo(InputBox);
const MemoSingleChoice = React.memo(SingleChoice);
const MemoMultipleChoice = React.memo(MultipleChoice);

interface PlaceholderRendererProps {
  placeholders: {
    type: 'text-input' | 'single-choice' | 'multiple-choice';
    name: string;
    values: string[];
  }[];
  replacementValues: { [key: string]: string };
  onValueChange: (name: string, value: string) => void;
}

const PlaceholderRenderer: React.FC<PlaceholderRendererProps> = ({
  placeholders,
  replacementValues,
  onValueChange,
}) => {
  const renderPlaceholder = (placeholder: any) => {
    const { type, name, values } = placeholder;

    if (type === 'text-input') {
      return (
        <MemoInputBox
          key={`${name}`}
          label={name}
          onChange={(value) => onValueChange(name, value)}
          value={replacementValues[name] || ''}
        />
      );
    } else if (type === 'single-choice') {
      return (
        <MemoSingleChoice
          key={`${name}`}
          label={name}
          choices={values}
          onChange={(value) => onValueChange(name, value)}
          value={replacementValues[name] || ''}
        />
      );
    } else if (type === 'multiple-choice') {
      return (
        <MemoMultipleChoice
          key={`${name}`}
          label={name}
          choices={values}
          onChange={(values) => onValueChange(name, values.join(','))}
          value={(replacementValues[name] || '').split(',')}
        />
      );
    }
  };

  return <div className="mx-4">{placeholders.map(renderPlaceholder)}</div>;
};

export default PlaceholderRenderer;