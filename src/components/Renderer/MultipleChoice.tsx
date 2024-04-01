import { Button } from '@mui/material';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MultiSelectProps {
  choices: string[];
  onChange: (values: string[]) => void;
  value: string[];
  label: string;
}

export const MultipleChoice: React.FC<MultiSelectProps> = ({ label, choices, onChange, value }) => {
  const [selectedChoices, setSelectedChoices] = useState<string[]>(value);

  const handleChoiceClick = (choice: string) => {
    const newSelectedChoices = selectedChoices.includes(choice)
      ? selectedChoices.filter((c) => c !== choice)
      : [...selectedChoices, choice];
    setSelectedChoices(newSelectedChoices);
    onChange(newSelectedChoices);
  };

  return (
    <div className="flex flex-col my-4">
      <label className="text-md p-0.5 text-blue-200">{label}</label>
      <div className="flex flex-wrap max-w-3xl">
        {choices.map((choice) => (
          <div key={uuidv4()} className="p-0.5">
            <Button
              variant={selectedChoices.includes(choice) ? 'contained' : 'outlined'}
              key={choice}
              onClick={() => handleChoiceClick(choice)}
            >
              {choice}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
