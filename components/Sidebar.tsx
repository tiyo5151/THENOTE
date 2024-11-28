import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Memo {
  id: string
  title: string
}

interface SidebarProps {
  memos: Memo[]
  onMemoSelect: (id: string) => void
  onNewMemo: () => void
}

export function Sidebar({ memos, onMemoSelect, onNewMemo }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`border-r bg-background ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="flex h-14 items-center justify-between px-4">
        <h2 className={`font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>Memos</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="px-2">
          {memos.map((memo) => (
            <Button
              key={memo.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onMemoSelect(memo.id)}
            >
              <span className={`truncate ${isCollapsed ? 'hidden' : 'block'}`}>{memo.title}</span>
              {isCollapsed && <span>{memo.title[0]}</span>}
            </Button>
          ))}
        </div>
      </ScrollArea>
      {!isCollapsed && (
        <Button className="absolute bottom-4 left-4" onClick={onNewMemo}>
          <Plus className="mr-2 h-4 w-4" /> New Memo
        </Button>
      )}
    </div>
  )
}

