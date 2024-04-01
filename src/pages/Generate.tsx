import React, { useEffect, useState } from 'react';
import { usePresetContext } from '../hooks/PresetContext';
import getAnswer from '../chatgpt/generation';
import { Button, CircularProgress } from '@mui/material';
import PresetSelect from '../components/PresetSelect';
import PlaceholderRenderer from '../components/PlaceholderRenderer';
import ResponseRenderer from '../components/ResponseRenderer';

const PlaceholderRegex = /{{\s*(text-input|single-choice|multiple-choice)\s*:\s*(?:"([^"]*)"|([^;"]+)(?:;\s*[^\s"]+)*)\s*(?:;\s*(?:"([^"]*)"|([^;"]+)(?:,\s*[^\s"]+)*)\s*)?}}/g;

const parsePreset = (presetContent: string) => {
  const placeholderMatches = presetContent.matchAll(PlaceholderRegex);

  const placeholders = [];
  for (const match of placeholderMatches) {
    const [placeholder, type, name1, name2, valuesString1, valuesString2] = match;
    let name = name1 || name2;
    let valuesString = valuesString1 || valuesString2;

    // split values by comma
    const values = valuesString ? valuesString.split(',').map(value => value.trim()) : [];
    try {
      if (name.startsWith('"') && name.endsWith('"')) {
        name = name.slice(1, -1);
      }
    } catch {}
    placeholders.push({ placeholder, type, name, values });
  }
  return placeholders;
};

export default function Generate() {
  const { presets } = usePresetContext();
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0]?.id || '');
  const [replacementValues, setReplacementValues] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const selectedPreset = presets.find((preset) => preset.id === selectedPresetId);

  useEffect(() => {
    setSelectedPresetId(presets[0]?.id || '');
  }, [presets]);

  const placeholders = selectedPreset
    ? parsePreset(selectedPreset.content)
    : [];

  const handleValueChange = (name: string, value: string) => {
    const trimmedValue = value.startsWith(',') ? value.slice(1) : value;
    setReplacementValues({ ...replacementValues, [name]: trimmedValue });
  };

  async function handleGetAnswer(prompt: string) {
    setError(false);
    setLoading(true);

    const filledPrompt = placeholders.reduce(
      (result, { placeholder, name }) => {
        const replacement = (replacementValues[name] || '').trim();
        return result.replace(placeholder, replacement);
      },
      prompt
    );

    try {
      const answer = await getAnswer(filledPrompt, setResponse);
      if (answer === 'CLOUDFLARE') {
        setError(true);
        setResponse('Failed Cloudflare check, please open ChatGPT at: ');
      } else if (answer === 'UNAUTHORIZED') {
        setError(true);
        setResponse('Please login to ChatGPT at: ');
      }
    } catch (err) {
      setError(true);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="px-4 py-2 mb-2 text-xl font-bold text-white border-b border-b-white/20">ChatGPT Presets</h1>
      <PresetSelect
        selectedPresetId={selectedPresetId}
        presets={presets}
        onPresetChange={(id) => setSelectedPresetId(id)}
      />
      <PlaceholderRenderer
        placeholders={placeholders}
        replacementValues={replacementValues}
        onValueChange={handleValueChange}
      />
      <div className="px-4 pt-4">
        {loading ? (
          <div className="relative flex justify-center align-middle">
            <Button
              disabled
              disableRipple
              className="absolute top-0 left-0 w-full"
              variant="contained"
              onClick={() => {
                setLoading(true);
                handleGetAnswer(selectedPreset?.content || '');
              }}
            >
              <span className="text-zinc-800">Generate</span>
            </Button>
            <CircularProgress
              className="absolute my-1"
              size={24}
              sx={{
                color: 'white',
                zIndex:1,
              }}
            />
          </div>
        ) : (
          <div className="relative flex justify-center align-middle">
            <Button
              className="absolute top-0 left-0 w-full"
              variant="contained"
              onClick={() => {
                setLoading(true);
                handleGetAnswer(selectedPreset?.content || '');
              }}
            >
              <span className="text-zinc-800">Generate</span>
            </Button>
          </div>
        )}
      </div>
      <ResponseRenderer
        response={response}
        error={error}
        onCopyResponse={(text) => navigator.clipboard.writeText(text)}
        onOpenChatGPT={() =>
          chrome.windows.create({
            url: 'https://chat.openai.com',
            type: 'popup',
            height: 700,
            width: 500,
          })
        }
      />
    </>
  );
};