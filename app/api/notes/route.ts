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
  const res = await fetch('http://localhost:3001/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: uuid(),
      title: 'New Note',
      content: [
        {
          id: uuid() + '1',
          text: 'New Note',
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create note');
  }

  return NextResponse.redirect('/notes');
}
