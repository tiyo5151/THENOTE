'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { NewMemoModal } from '@/components/NewMemoModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import { Content } from '@radix-ui/react-dialog';
import { Note } from './types/types';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [isNewMemoModalOpen, setIsNewMemoModalOpen] = useState(false);

  const handleNewNote = (title: string, content: string) => {
    const newNote: Note = {
      id: uuid(),
      title: title,
      content: [{ text: content }],
    };
    setNotes([...notes, newNote]);
  };

  const selectedMemo = notes.find((memo) => memo.id === selectedMemoId);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          memos={notes}
          onMemoSelect={setSelectedMemoId}
          onNewMemo={() => setIsNewMemoModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {selectedMemo ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">{selectedMemo.title}</h2>
              <p>{selectedMemo.content}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Select a memo or create a new one
            </p>
          )}
        </main>
      </div>
      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg"
        size="icon"
        onClick={() => setIsNewMemoModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <NewMemoModal
        isOpen={isNewMemoModalOpen}
        onClose={() => setIsNewMemoModalOpen(false)}
        onCreateMemo={handleNewNote}
      />
    </div>
  );
}
