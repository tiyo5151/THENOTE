import { Note } from './types';

export interface NoteDisplayProp {
  notes: Note[];
  selectedNote: string | null;
}
