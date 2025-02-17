'use client';
import { NoteDisplayProp } from '@/app/types/NoteDisplay';
import React from 'react';
import { PencilLine } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const NoteDisplay: React.FC<NoteDisplayProp> = ({
  selectNote,
  selectNoteContent,
  updateNoteContent,
  deleteNote,
}) => {
  if (!selectNote) {
    return <div>ようこそTheNoteへ</div>;
  }
  return (
    <div className="container flex flex-col glow-1 h-full justify-center items-end py-4 px-6 overflow-y-scroll">
      <div className="flex grow justify-start items-center flex-col mb-4 h-auto w-full">
        <div className="flex justify-center items-center font-bold text-2xl">
          {selectNoteContent?.title}
          <PencilLine />
          <Trash2 onClick={() => deleteNote(selectNote)} />
        </div>
        {selectNoteContent?.content.map((content, index) => (
          <div
            key={index}
            className="flex justify-start items-start border-solid border-2 border-gray-300 rounded-xl p-2 my-2 w-full pb-4"
          >
            {content.text}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center h-72 w-full border-grey-400 border-2 rounded-xl">
        <div className="flex glow-1"></div>
        <div className="border-t border-gray-300 w-[90%] my-4"></div>
        <div className="flex h-[60%] w-full"></div>
        <div className="border-t border-gray-300 w-[90%] my-4"></div>
        <div className="flex glow-1">
          <div className="flex justify-between items-center w-full px-4">
            <div className="flex">buttons</div>
            <button onClick={() => updateNoteContent(selectNote, 'Updated Content')}>add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDisplay;
