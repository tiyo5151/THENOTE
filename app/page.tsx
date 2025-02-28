'use client';
import { Note } from '@/app/types/types';
import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import NoteDisplay from '@/app/components/NoteDisplay';
import Sidebar from '@/app/components/Sidebar';
import Modal from '@/app/components/Modal';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectNote, setSelectNote] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addNote = async (title: string) => {
    try {
      const res = await fetch('api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

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
    setSelectNote(null);
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

  const deleteNoteContent = async (noteId: string | null, contentId: string) => {
    try {
      const res = await fetch('api/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId, contentId }),
      });
      if (!res.ok) {
        throw new Error('Failed to delete note content');
      }
      const updatedNote = await res.json();
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? updatedNote : note)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note content');
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
          addNote={openModal}
        />
        <NoteDisplay
          selectNote={selectNote}
          selectNoteContent={selectNoteContent}
          updateNoteContent={updateNoteContent}
          deleteNote={deleteNote}
          deleteNoteContent={deleteNoteContent}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={addNote} />
    </div>
  );
}
