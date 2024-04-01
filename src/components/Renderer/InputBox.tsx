import { TextField } from '@mui/material';
import React from 'react';

interface InputBoxProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

export const InputBox: React.FC<InputBoxProps> = ({ label, onChange, value }) => {
  return (
    <div className="flex flex-col my-4 mt-5">
      <TextField size="small" className="px-0.5" onChange={(e) => onChange(e.target.value)} label={label} multiline variant="outlined" id="input" value={value} />
    </div>
  );
};
