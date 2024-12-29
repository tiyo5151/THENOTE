'use client';
import { Note } from '@/app/types/types';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import NoteDisplay from './NoteDisplay';

const NoteClientWrapper: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const [selectNote, setSelectNote] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <div className="w-full flex flex-row overflow-hidden h-full">
        <Sidebar
          notes={notes}
          selectNote={selectNote}
          setSelectNote={setSelectNote}
        />
        <NoteDisplay notes={notes} selectedNote={selectNote} />
      </div>
    </div>
  );
};

export default NoteClientWrapper;