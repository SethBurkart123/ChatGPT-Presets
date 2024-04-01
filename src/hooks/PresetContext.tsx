import React, { useEffect, createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { v4 } from 'uuid';

type Preset = {
  id: string;
  name: string;
  content: string;
};

type PresetContextType = {
  presets: Preset[];
  addPreset: (content: string, name: string) => string;
  editPreset: (id: string, name: string, content: string) => void;
  deletePreset: (id: string) => void;
};

const PresetContext = createContext<PresetContextType | null>(null);

export const usePresetContext = () => {
  const context = useContext(PresetContext);
  if (!context) throw new Error('PresetContext not found');
  return context;
};

export const PresetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    chrome.storage.local.get('presets', ({ presets }) => {
      if (presets) {
        setPresets(presets);
      }
    });
  }, []);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      chrome.storage.local.set({ presets });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [presets]);

  const addPreset = (content: string, name: string) => {
    const id = v4();
    setPresets([...presets, { id, content, name }]);
    return id;
  };

  const editPreset = (id: string, content: string, name: string) => {
    setPresets(
      presets.map((preset) => (preset.id === id ? { ...preset, content, name } : preset))
    );
  };

  const deletePreset = (id: string) => {
    setPresets(presets.filter((preset) => preset.id !== id));
  };

  return (
    <PresetContext.Provider
      value={{ presets, addPreset, editPreset, deletePreset }}
    >
      {children}
    </PresetContext.Provider>
  );
};
