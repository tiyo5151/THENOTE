import { NoteDisplayProp } from '@/app/types/NoteDisplay';
import React from 'react';

const NoteDisplay: React.FC<NoteDisplayProp> = ({ notes, selectNote }) => {
  return (
    <div className="container flex glow-1 h-full  justify-center items-end py-4 px-6">
      <div className="flex">
        <div className="flex items-start"></div>
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
