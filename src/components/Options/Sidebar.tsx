import React from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function Sidebar(handleEditPreset: (id: string, content: string, name: string) => void, addPreset: (content: string, name: string) => string, presets: { id: string; name: string; content: string; }[], editingPresetId: string, deletingPresetID: string, deletePreset: (id: string) => void, setDeletingPresetID: React.Dispatch<React.SetStateAction<string>>) {
  return <div className="bg-neutral-900/40 border-r border-r-neutral-600 backdrop-blur-md h-screen max-h-screen w-[300px]">

    <div className="absolute top-0 z-20 flex w-full gap-1 px-2 py-2 border-b border-b-neutral-600 bg-neutral-950/50 backdrop-blur-lg">
      <Button size="medium" className="flex justify-between w-full gap-2 align-middle backdrop-blur-2xl" onClick={() => handleEditPreset(addPreset('', 'New Preset'), '', 'New Preset')}>
        <Add />Add Prompt
      </Button>
    </div>


    <div className="h-screen py-12 overflow-y-scroll">
      <div className="flex flex-col gap-2 px-1 py-4">
        {presets.map((preset) => (
          <div
            key={preset.id}
            style={editingPresetId === preset.id ? { backgroundColor: 'rgb(39 39 42)' } : {}}
            onClick={() => handleEditPreset(preset.id, preset.content, preset.name)}
            className="flex items-center justify-between px-2 py-2 text-white transition rounded-md cursor-pointer hover:bg-neutral-800 bg-neutral-950/0">
            <div className="flex gap-1 pl-1" style={{'fontSize': '1rem'}}>
              {preset.name}
            </div>
            {deletingPresetID == preset.id ?
              <div className="flex">
                <button
                  className="p-1 text-white rounded-lg hover:bg-neutral-900"
                  onClick={() => {
                    deletePreset(preset.id);
                    setDeletingPresetID('');
                  } }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  className="p-1 text-white rounded-lg hover:bg-neutral-900"
                  onClick={() => {
                    setDeletingPresetID('');
                  } }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              :
              <button
                className="p-1 text-white rounded-lg hover:bg-neutral-900"
                onClick={() => setDeletingPresetID(preset.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>}
          </div>
        ))}
      </div>
    </div>


    <div className="absolute bottom-0 z-10 flex items-center justify-center w-full gap-1 px-2 py-2 text-white border-t border-t-neutral-600 bg-neutral-950/50 backdrop-blur-xl">
      {/*<button disabled className="flex justify-center w-full gap-2 p-2 text-white transition cursor-not-allowed rounded-xl bg-neutral-950/20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.00014 14H18.1359C19.1487 14 19.6551 14 20.0582 13.8112C20.4134 13.6448 20.7118 13.3777 20.9163 13.0432C21.1485 12.6633 21.2044 12.16 21.3163 11.1534L21.9013 5.88835C21.9355 5.58088 21.9525 5.42715 21.9031 5.30816C21.8597 5.20366 21.7821 5.11697 21.683 5.06228C21.5702 5 21.4155 5 21.1062 5H4.50014M2 2H3.24844C3.51306 2 3.64537 2 3.74889 2.05032C3.84002 2.09463 3.91554 2.16557 3.96544 2.25376C4.02212 2.35394 4.03037 2.48599 4.04688 2.7501L4.95312 17.2499C4.96963 17.514 4.97788 17.6461 5.03456 17.7462C5.08446 17.8344 5.15998 17.9054 5.25111 17.9497C5.35463 18 5.48694 18 5.75156 18H19M7.5 21.5H7.51M16.5 21.5H16.51M8 21.5C8 21.7761 7.77614 22 7.5 22C7.22386 22 7 21.7761 7 21.5C7 21.2239 7.22386 21 7.5 21C7.77614 21 8 21.2239 8 21.5ZM17 21.5C17 21.7761 16.7761 22 16.5 22C16.2239 22 16 21.7761 16 21.5C16 21.2239 16.2239 21 16.5 21C16.7761 21 17 21.2239 17 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="my-auto font-semibold text-md">Store</p>
      </button>
      */}
      <Button onClick={() => chrome.tabs.create({url: chrome.extension.getURL('store.html')})} variant="text" color="inherit" className="flex justify-center w-full gap-2 p-2 text-white transition rounded-xl bg-neutral-950/20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.00014 14H18.1359C19.1487 14 19.6551 14 20.0582 13.8112C20.4134 13.6448 20.7118 13.3777 20.9163 13.0432C21.1485 12.6633 21.2044 12.16 21.3163 11.1534L21.9013 5.88835C21.9355 5.58088 21.9525 5.42715 21.9031 5.30816C21.8597 5.20366 21.7821 5.11697 21.683 5.06228C21.5702 5 21.4155 5 21.1062 5H4.50014M2 2H3.24844C3.51306 2 3.64537 2 3.74889 2.05032C3.84002 2.09463 3.91554 2.16557 3.96544 2.25376C4.02212 2.35394 4.03037 2.48599 4.04688 2.7501L4.95312 17.2499C4.96963 17.514 4.97788 17.6461 5.03456 17.7462C5.08446 17.8344 5.15998 17.9054 5.25111 17.9497C5.35463 18 5.48694 18 5.75156 18H19M7.5 21.5H7.51M16.5 21.5H16.51M8 21.5C8 21.7761 7.77614 22 7.5 22C7.22386 22 7 21.7761 7 21.5C7 21.2239 7.22386 21 7.5 21C7.77614 21 8 21.2239 8 21.5ZM17 21.5C17 21.7761 16.7761 22 16.5 22C16.2239 22 16 21.7761 16 21.5C16 21.2239 16.2239 21 16.5 21C16.7761 21 17 21.2239 17 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="my-auto font-semibold text-md">Store</p>
      </Button>
    </div>
  </div>;
}
