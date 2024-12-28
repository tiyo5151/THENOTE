import { Note } from '@/app/types/types';
import Header from '@/components/Header';
import NoteDisplay from '@/components/NoteDisplay';
import Sidebar from '@/components/Sidebar';

const Home = async () => {
  'use server';
  const res = await fetch('http://localhost:3001/notes');
  const notes: Note[] = await res.json();
  return (
    <div className="max-w-screen w-screen h-screen mx-auto flex flex-col overflow-hidden">
      <Header />
      <div className="w-full flex flex-row overflow-hidden h-full ">
        <Sidebar notes={notes} />
        <NoteDisplay notes={notes} />
      </div>
    </div>
  );
};

export default Home;
