import { NoteDisplayProp } from '@/app/types/NoteDisplay';
import React from 'react';

const Sidebar: React.FC<NoteDisplayProp> = ({ notes }) => {
  return (
    <div className="flex justify-center items-start px-2 py-4 w-64 min-w-32 h-full bg-slate-800">
      <ul className="flex flex-col justify-start items-center w-full h-full">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-center items-center my-1 bg-white w-full h-16"
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
