'use client';
import { NoteDisplayProp } from '@/app/types/NoteDisplay';
import React from 'react';
import { PencilLine, Trash2, Image, Paperclip, X } from 'lucide-react';

const NoteDisplay: React.FC<NoteDisplayProp> = ({
  selectNote,
  selectNoteContent,
  updateNoteContent,
  deleteNote,
  deleteNoteContent,
  noteContent,
  setNoteContent,
}) => {
  if (!selectNote) {
    return (
      <div className="container flex flex-col glow-1 h-full justify-start items-start py-4 px-6 overflow-y-scroll">
        ようこそTheNoteへ
      </div>
    );
  }
  return (
    <div className="container flex flex-col glow-1 justify-center items-end py-4 px-6 overflow-y-scroll h-full">
      <div className="flex grow justify-start items-center flex-col mb-4 h-auto w-full">
        <div className="flex justify-center items-center font-bold text-2xl">
          {selectNoteContent?.title}
          <PencilLine />
          <Trash2 onClick={() => deleteNote(selectNote)} />
        </div>
        {selectNoteContent?.content.map((content, index) => (
          <div
            key={index}
            className="flex justify-between items-start border-solid border-2 border-gray-300 rounded-xl p-2 my-2 w-full pb-4"
          >
            <div className="flex-grow">{content.text}</div>
            <X
              className="cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => deleteNoteContent(selectNote, content.id)}
              size={18}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center h-72 w-full border-grey-400 border-2 rounded-xl">
        <div className="flex glow-1"></div>
        <div className="border-t border-gray-300 w-[90%] my-4"></div>
        <div className="flex h-[60%] w-full px-4">
          <textarea
            name="note"
            rows={4}
            cols={40}
            className="flex w-full resize-none"
            value={noteContent || ''}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
        <div className="border-t border-gray-300 w-[90%] my-4"></div>
        <div className="flex glow-1 w-full">
          <div className="flex justify-between items-center w-full px-8">
            <div className="flex gap-4">
              <Image className="cursor-pointer hover:text-gray-600" />
              <Paperclip className="cursor-pointer hover:text-gray-600" />
            </div>
            <button
              onClick={() => {
                updateNoteContent(selectNote, noteContent || '');
                setNoteContent('');
              }}
              className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition-colors"
            >
              add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDisplay;
