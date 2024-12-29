import { Note } from '@/app/types/types';
import NoteClientWrapper from '@/components/NoteClientWrapper';

async function getNotes() {
  const res = await fetch('http://localhost:3001/notes', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  return res.json();
}

export default async function Page() {
  const notes: Note[] = await getNotes();
  return <NoteClientWrapper notes={notes} />;
}
