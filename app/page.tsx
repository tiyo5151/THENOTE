'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { NewMemoModal } from '@/components/NewMemoModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface Memo {
  id: string
  title: string
  content: string
}

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null)
  const [isNewMemoModalOpen, setIsNewMemoModalOpen] = useState(false)

  const handleNewMemo = (title: string) => {
    const newMemo: Memo = {
      id: Date.now().toString(),
      title,
      content: '',
    }
    setMemos([...memos, newMemo])
  }

  const selectedMemo = memos.find(memo => memo.id === selectedMemoId)

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          memos={memos}
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
            <p className="text-center text-gray-500 mt-10">Select a memo or create a new one</p>
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
        onCreateMemo={handleNewMemo}
      />
    </div>
  )
}

