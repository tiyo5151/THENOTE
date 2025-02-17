import { Note } from './types';
export interface SidebarProp {
  notes: Note[];
  selectNote: string | null;
  setSelectNote: (noteId: string) => void;
  addNote: () => void;
}
