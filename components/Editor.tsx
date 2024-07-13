'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = entry?.analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ];

  useAutosave({
    data: value,
    //value === _value  _value is guaranteed to be the latest version of value
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>Loading...</div>}
        <textarea
          className="w-full h-full outline-none p-8 text-xl"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <section className="border-l border-black/10">
        <div className=" px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((item, index) => (
            <li
              key={index}
              className="flex items-center px-2 py-4 border-r border-black/10 border-b justify-between"
            >
              <span className="font-semibold text-lg">{item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Editor;
