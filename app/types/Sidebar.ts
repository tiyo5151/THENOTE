import { Note } from './types';

export interface SidebarProp {
  notes: Note[];
  selectNote: string | null;
  setSelectNote: (id: string) => void;
  addNote: () => void;
}
