import React from 'react';


export default function HelpModal(helpModalOpen: boolean, setHelpModalOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  return <div>
    {helpModalOpen ? (
      <div className="bg-black/40 place-content-center fixed top-0 left-0 grid w-screen h-screen py-8">
        <div className="bg-zinc-900/70 backdrop-blur-lg drop-shadow-2xl rounded-xl border-white/20 h-full pb-8 overflow-y-scroll text-white border shadow-2xl">
          <h2 className="border-white/20 bg-black/60 sticky top-0 left-0 flex w-full p-4 pb-3 mb-4 text-3xl font-bold border-b">Getting Started
            <button className="hover:bg-zinc-800 p-1 ml-auto rounded-lg" onClick={() => setHelpModalOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </h2>
          <div className="max-w-2xl px-4 text-lg font-light">
            To create a prompt, type the desired text in the box below. When you select the prompt in the extension popup and click "generate", the text will be sent to ChatGPT. This feature becomes useful when paired with placeholders, which are special text surrounded by double curly braces.
            <br /><br />
            Placeholders enable you to insert buttons and text boxes in the popup, creating reusable prompts with a simple interface. There are three types of placeholders:
            <br /><br />

            <h2 className="py-1 pt-3 text-2xl font-bold">Placeholder Types</h2>

            <p>1. <span className="bg-zinc-800 w-fit p-0.5 px-1 rounded-md">Multi-choice:</span> Creates buttons that allow you to select only one option.</p>
            <p className="mb-2">Eg: <span className="font-bold">{'{{ multi-choice: "Choose an animal", Cat, Dog, Bird }}'}</span></p>

            <p>2. <span className="bg-zinc-800 w-fit p-0.5 px-1 rounded-md">Input:</span> Creates a text box where you can type in text.</p>
            <p className="mb-2">Eg: <span className="font-bold">{'{{ input: "Enter your name" }}'}</span></p>

            <p>3. <span className="bg-zinc-800 w-fit p-0.5 px-1 rounded-md">Multi-select:</span> Creates buttons that allow you to select multiple options.</p>
            <p className="mb-4">Eg: <span className="font-bold">{'{{ multi-select: "Choose your favorite colors", Red, Blue, Green }}'}</span></p>

            When you send the chat request, the selected option or text will replace the placeholder in the prompt. For multi-select placeholders, the selected options will be appended into the prompt separated by commas.
            
            <h2 className="py-1 pt-3 text-2xl font-bold">Examples</h2>

          </div>
        </div>
      </div>
    ) : null}
  </div>;
}