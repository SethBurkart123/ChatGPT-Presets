import React, { useState } from 'react';
import { usePresetContext } from '../hooks/PresetContext';
import { Button } from '@mui/material';
import { Help } from '@mui/icons-material';
import HelpModal from '../components/Options/HelpModal';
import Sidebar from '../components/Options/Sidebar';
import Editor from '../components/Options/Editor';

const PresetMenu: React.FC = () => {
  const { presets, addPreset, editPreset, deletePreset } = usePresetContext();
  const [editingPresetId, setEditingPresetId] = useState('');
  const [presetContent, setPresetContent] = useState('');
  const [presetName, setPresetName] = useState('');

  const [deletingPresetID, setDeletingPresetID] = useState('');
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const handleUpdatePreset = () => {
    if (editingPresetId) {
      editPreset(editingPresetId, presetContent, presetName);
      setEditingPresetId('');
      setPresetContent('');
      setPresetName('');
    }
  };

  const handleEditPreset = (id: string, content: string, name: string) => {
    setPresetName(name);
    setEditingPresetId(id);
    setPresetContent(content);
  };

  return (
    <div className="flex w-screen min-h-screen bg-neutral-800">
      {Sidebar(handleEditPreset, addPreset, presets, editingPresetId, deletingPresetID, deletePreset, setDeletingPresetID)}

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col justify-between w-4/5 h-screen gap-2 pb-2 text-white">
          {editingPresetId === '' ? (
          <div className="flex flex-col justify-between py-4 overflow-y-scroll text-4xl font-bold text-white">
            <div className="h-full pb-8 overflow-y-scroll text-white border shadow-2xl bg-neutral-900/70 border-white/20 backdrop-blur-lg drop-shadow-2xl rounded-xl">
              <h2 className="sticky top-0 left-0 flex w-full p-4 pb-3 text-3xl font-bold">Getting Started</h2>
              <div className="max-w-3xl px-4 text-lg font-light">
                To create a prompt, click on add prompt and then type a chatgpt prompt into the textbox. When you select the prompt in the extension popup and click "generate", the text will be sent to ChatGPT. This feature becomes useful when paired with placeholders, which are special text surrounded by double curly braces.<br /><br />
                Placeholders enable you to insert buttons and text boxes in the popup, creating reusable prompts with a simple interface. There are three types of placeholders:<br /><br />
                <h2 className="py-1 pt-3 text-2xl font-bold">Placeholder Types</h2>
                <p>1. <span className="bg-neutral-800 w-fit p-0.5 px-1 rounded-md">Multi-choice:</span> Creates buttons that allow you to select only one option.</p>
                <p className="mb-2">Eg: <span className="font-bold">{'{{ multi-choice: "Choose an animal", Cat, Dog, Bird }}'}</span></p>
                <p>2. <span className="bg-neutral-800 w-fit p-0.5 px-1 rounded-md">Input:</span> Creates a text box where you can type in text.</p>
                <p className="mb-2">Eg: <span className="font-bold">{'{{ input: "Enter your name" }}'}</span></p>
                <p>3. <span className="bg-neutral-800 w-fit p-0.5 px-1 rounded-md">Multi-select:</span> Creates buttons that allow you to select multiple options.</p>
                <p className="mb-4">Eg: <span className="font-bold">{'{{ multi-select: "Choose your favorite colors", Red, Blue, Green }}'}</span></p>
                When you send the chat request, the selected option or text will replace the placeholder in the prompt. For multi-select placeholders, the selected options will be appended into the prompt separated by commas.
              </div>
            </div>
          </div>
        ) : (
            <div className="min-h-screen overflow-y-scroll">
              <div className="flex justify-between py-4 text-6xl font-bold">
                <input
                  value={presetName}
                  onChange={(e) => {
                    setPresetName(e.target.value);
                  }}
                  placeholder="Preset Name"
                  className="transition duration-300 border-none outline-none bg-black/0 placeholder:text-neutral-400 hover:placeholder:text-neutral-300 focus:placeholder:text-neutral-300"
                />
                <button className="rounded-lg hover:bg-neutral-900" onClick={() => setHelpModalOpen(true)}>
                  <Help />
                </button>
              </div>
              <div className="pb-8 text-lg">
                <Editor presetContent={presetContent} setPresetContent={setPresetContent} />
              </div>
              <Button className="w-full" onClick={handleUpdatePreset} variant="contained">
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      {HelpModal(helpModalOpen, setHelpModalOpen)}
    </div>
  );
};

export default PresetMenu;