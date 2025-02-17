'use client';
import { Note } from '@/app/types/types';
import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import NoteDisplay from '@/app/components/NoteDisplay';
import Sidebar from '@/app/components/Sidebar';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectNote, setSelectNote] = useState<string | null>(null);
  const [hoveNote, setHoverNote] = useState<string | null>(null);
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

  const addNote = async () => {
    try {
      const res = await fetch('api/notes', { method: 'POST' });
      if (!res.ok) {
        throw new Error('Failed to add note');
      }
      const newNote = await res.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
    }
  };

  const deleteNote = async (noteId: string | null) => {
    try {
      const res = await fetch('api/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId }),
      });
      if (!res.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
    }
  };

  const updateNoteContent = async (noteId: string | null, text: string) => {
    try {
      const res = await fetch('api/notes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId, text }),
      });
      if (!res.ok) {
        throw new Error('Failed to update note content');
      }
      const updatedNote = await res.json();
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? updatedNote : note)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update note content');
    }
  };

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
          addNote={addNote}
        />
        <NoteDisplay
          selectNote={selectNote}
          selectNoteContent={selectNoteContent}
          updateNoteContent={updateNoteContent}
          deleteNote={deleteNote}
        />
      </div>
    </div>
  );
}
