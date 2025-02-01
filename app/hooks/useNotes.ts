export const useNotes = () => {
  const createNote = async () => {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to create note');
    }
    return res.json();
  };

  const addNoteContent = async (noteId: string, text: string) => {
    const res = await fetch('/api/notes', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteId, text }),
    });
    if (!res.ok) {
      throw new Error('Failed to add content');
    }
    return res.json();
  };

  return { createNote, addNoteContent };
};
