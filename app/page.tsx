'use client';
import { Note } from '@/app/types/types';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NoteDisplay from '../components/NoteDisplay';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectNote, setSelectNote] = useState<string | null>(null);
  const selectNoteContent = notes.find((note) => note.id === selectNote);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('api/notes');
        if (!res.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col h-screen mx-auto">
      <Header />
      <div className="w-full flex flex-row overflow-hidden h-full">
        <Sidebar
          notes={notes}
          selectNote={selectNote}
          setSelectNote={setSelectNote}
        />
        <NoteDisplay selectNoteContent={selectNoteContent} />
      </div>
    </div>
  );
}
