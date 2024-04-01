import React from 'react';
import { FormControl, NativeSelect, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

interface PresetSelectProps {
  selectedPresetId: string;
  presets: { id: string; name: string }[];
  onPresetChange: (id: string) => void;
}

const PresetSelect: React.FC<PresetSelectProps> = ({
  selectedPresetId,
  presets,
  onPresetChange,
}) => {
  return (
    <div className="flex flex-col px-4">
      <div className="flex gap-2">
        <FormControl fullWidth>
          <NativeSelect
            id="preset-select"
            value={selectedPresetId}
            size="medium"
            variant="filled"
            className="rounded-lg"
            onChange={(e) => onPresetChange(e.target.value)}
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        <IconButton
          aria-label="settings"
          className="w-fit"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default PresetSelect;