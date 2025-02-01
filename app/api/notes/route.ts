import { Note } from '@/app/types/types';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

async function getNotes() {
  const res = await fetch('http://localhost:3001/notes', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }
  return res.json();
}

export async function GET() {
  const notes: Note[] = await getNotes();
  return NextResponse.json(notes);
}

export async function POST() {
  const noteId = uuid();
  const res = await fetch('http://localhost:3001/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: noteId,
      title: 'New Note',
      content: [{ id: `${noteId}0`, text: 'New Note' }],
    }),
  });
  if (!res.ok) {
    throw new Error('Failed to create note');
  }
  return NextResponse.redirect('/notes');
}

// 内容追加
export async function PATCH(request: Request) {
  const { noteId, text } = await request.json();
  const notes = await getNotes();
  const note = notes.find((n) => n.id === noteId);

  const newContent = {
    id: `${noteId}${note.content.length}`,
    text: text,
  };

  note.content.push(newContent);
  // 更新処理
}

export async function DELETE(request: Request) {
  const { noteId } = await request.json();
  const notes = await getNotes();
  const noteIndex = notes.findIndex((n) => n.id === noteId);
  notes.splice(noteIndex, 1);
  // 削除処理
}
