import { Note } from '@/app/types/types';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

const API_ENDPOINT = 'http://localhost:3001/notes';

async function getNotes() {
  const res = await fetch(API_ENDPOINT, {
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
  const newNote: Note = {
    id: noteId,
    title: 'New Note',
    content: [{ id: `${noteId}0`, text: 'New Note' }],
  };

  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });

  if (!res.ok) {
    throw new Error('Failed to create note');
  }
  return NextResponse.json(await res.json());
}

export async function PATCH(request: Request) {
  const { noteId, text } = await request.json();
  const notes = await getNotes();
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    return NextResponse.error();
  }

  note.content.push({
    id: `${noteId}${note.content.length}`,
    text: text,
  });

  const res = await fetch(`${API_ENDPOINT}/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error('Failed to update note');
  }
  return NextResponse.json(await res.json());
}

export async function DELETE(request: Request) {
  const { noteId, contentId } = await request.json();

  // コンテンツアイテムの削除の場合
  if (noteId && contentId) {
    const notes = await getNotes();
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // コンテンツアイテムを削除
    note.content = note.content.filter((item) => item.id !== contentId);

    // ノートを更新
    const updateRes = await fetch(`${API_ENDPOINT}/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });

    if (!updateRes.ok) {
      throw new Error('Failed to update note after deleting content');
    }

    return NextResponse.json(note);
  }
  // ノート全体の削除の場合
  else if (noteId) {
    const res = await fetch(`${API_ENDPOINT}/${noteId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete note');
    }
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  }
}
