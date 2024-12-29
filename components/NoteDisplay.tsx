'use client';
import { NoteDisplayProp } from '@/app/types/NoteDisplay';
import React from 'react';

const NoteDisplay: React.FC<NoteDisplayProp> = ({ selectNoteContent }) => {
  return (
    <div className="container flex flex-col glow-1 h-full justify-center items-end py-4 px-6 overflow-y-scroll">
      <div className="flex grow justify-start items-center flex-col mb-4 h-auto w-full">
        <div className="flex justify-center items-center">
          {selectNoteContent?.title}
        </div>
        {selectNoteContent?.content.map((content, index) => (
          <div key={index} className="flex justify-center items-center">
            {content.text}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center h-72 w-full border-grey-400 border-2 rounded-xl">
        <div className="flex glow-1"></div>
        <div className="border-t border-gray-300 w-[90%] my-4"></div>
        <div className="flex h-[60%] w-full"></div>
        <div className="border-t border-gray-300 w-[90%] my-4"></div>
        <div className="flex glow-1"></div>
      </div>
    </div>
  );
};

export default NoteDisplay;
