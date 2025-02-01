interface text {
  id: string;
  text: string;
}
// ノートの型定義
interface Note {
  id: string;
  title: string;
  content: text[];
}

interface handleNotesProps {
  title: string | null;
  content: string | null;
}

interface NewMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMemo: (title: string, content: string) => void;
}

export type { Note, handleNotesProps, NewMemoModalProps };
