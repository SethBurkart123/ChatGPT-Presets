import { Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MultiChoiceProps {
  choices: string[];
  onChange: (value: string) => void;
  value: string;
  label: string;
}

export const SingleChoice: React.FC<MultiChoiceProps> = ({ label, choices, onChange, value }) => {
  const [selected, setSelected] = useState(value);

  const handleChoiceClick = (choice: string) => {
    setSelected(choice);
    onChange(choice);
  };

  return (
    <div className="flex flex-col my-4">
      <label className="text-md p-0.5 text-blue-200">{label}</label>
      <div className="flex flex-wrap max-w-3xl">
        {choices.map((choice) => (
          <div key={uuidv4()} className="p-0.5">
            <Button
              variant={choice === selected ? 'contained' : 'outlined'}
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
