import { Note } from './types';

export interface NoteDisplayProp {
  selectNote: string | null;
  selectNoteContent: Note | undefined;
  updateNoteContent: (noteId: string | null, text: string) => Promise<void>;
  deleteNote: (noteId: string | null) => Promise<void>;
  noteContent: string | null;
  setNoteContent: (content: string | null) => void;
}
