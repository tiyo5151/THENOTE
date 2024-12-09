interface Note {
  id: string;
  title: string;
  content: string[];
}

interface handleNotesProps {
  id: string | null;
  title: string | null;
  content: string | null;
}

interface NewMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMemo: (title: string) => void;
}

export type { Note, handleNotesProps, NewMemoModalProps };
