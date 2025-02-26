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
      <div className="container flex flex-col h-full justify-start items-start py-4 px-6">
        ようこそTheNoteへ
      </div>
    );
  }
  return (
    <div className="container flex flex-col h-full w-full">
      <div className="flex justify-center items-center font-bold text-2xl py-4 border-b">
        {selectNoteContent?.title}
        <PencilLine className="ml-2 cursor-pointer" />
        <Trash2 className="ml-2 cursor-pointer" onClick={() => deleteNote(selectNote)} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col w-full">
          {selectNoteContent?.content.map((content, index) => (
            <div
              key={index}
              className="flex justify-between items-start border-solid border-2 border-gray-300 rounded-xl p-3 my-2 w-full"
            >
              <div className="flex-grow">{content.text}</div>
              <X
                className="cursor-pointer text-gray-500 hover:text-red-500 ml-2"
                onClick={() => deleteNoteContent(selectNote, content.id)}
                size={18}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
        <div className="flex flex-col justify-center items-center w-full border-grey-400 border-2 rounded-xl p-4">
          <div className="flex w-full">
            <textarea
              name="note"
              rows={4}
              cols={40}
              className="flex w-full resize-none border rounded-md p-2"
              value={noteContent || ''}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="新しいノートを入力..."
            />
          </div>

          <div className="border-t border-gray-300 w-full my-4"></div>

          <div className="flex w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                <Image className="cursor-pointer hover:text-gray-600" />
                <Paperclip className="cursor-pointer hover:text-gray-600" />
              </div>
              <button
                onClick={() => {
                  if (noteContent?.trim()) {
                    updateNoteContent(selectNote, noteContent);
                    setNoteContent('');
                  }
                }}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                disabled={!noteContent?.trim()}
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDisplay;
