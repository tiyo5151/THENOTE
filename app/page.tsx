'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { NewMemoModal } from '@/components/NewMemoModal';
import { Button } from '@/components/ui/button';
import { Key, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Memo {
  id: string;
  position: string;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState({});
  // const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [isNewMemoModalOpen, setIsNewMemoModalOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  // const handleNewMemo = (title: string) => {
  //   const newMemo: Memo = {
  //     id: uuidv4(),
  //     position: uuidv4 + title,
  //     content: '',
  //   };
  //   setMemos([...memos, newMemo]);
  // };

  const handleNewNote = (title: string, content: string) => {
    const newNote = {
      [uuidv4()]: {
        position: uuidv4(),
        title,
        content,
      },
    };
    setNotes((prevNotes) => ({
      ...prevNotes,
      [Object.keys(newNote)[0]]: newNote[Object.keys(newNote)[0]],
    }));
  };

  // const selectedMemo=;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          notes={notes}
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
