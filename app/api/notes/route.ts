import { Note } from '@/app/types/types';
import { NextResponse } from 'next/server';

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
