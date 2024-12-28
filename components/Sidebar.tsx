import { NoteDisplayProp } from '@/app/types/NoteDisplay';
import React from 'react';

const Sidebar: React.FC<NoteDisplayProp> = ({ notes }) => {
  return (
    <div className="flex w-64 min-w-32 h-full bg-slate-800">
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
