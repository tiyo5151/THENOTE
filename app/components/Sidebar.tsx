'use client';
import { SidebarProp } from '@/app/types/Sidebar';

const Sidebar: React.FC<SidebarProp> = ({ notes, selectNote, setSelectNote, addNote }) => {
  return (
    <div className="relative flex flex-col w-64 min-w-32 h-full bg-white border-grey-400 border-r-2">
      <div className="flex-1 overflow-y-auto px-2 py-4 pb-20 flex flex-col">
        <ul className="flex flex-col gap-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`flex justify-center items-center ${
                selectNote === note.id ? 'bg-slate-400' : 'bg-white'
              } ${
                selectNote === note.id ? 'hover:bg-slate-400' : 'hover:bg-slate-200'
              } w-full h-16 rounded-sm shadow-md transition-all duration-500 ease-in-out cursor-pointer`}
              onClick={() => setSelectNote(note.id)}
            >
              {note.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 flex justify-end w-full p-4">
        <button
          onClick={addNote}
          className="text-white bg-black px-4 py-2 rounded-md shadow-lg hover:bg-gray-800 transition-colors"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
