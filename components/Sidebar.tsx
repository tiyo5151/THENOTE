'use client';
import { SidebarProp } from '@/app/types/Sidebar';

const Sidebar: React.FC<SidebarProp> = ({
  notes,
  selectNote,
  setSelectNote,
}) => {
  return (
    <div className="z-0 flex flex-col justify-center items-start px-2 py-4 w-64 min-w-32 h-full bg-white border-grey-400 border-r-2 overflow-y-scroll">
      <ul className="flex flex-col justify-start items-center w-full h-full">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`flex justify-center items-center my-1 ${
              selectNote === note.id ? 'bg-slate-400' : 'bg-white'
            } ${
              selectNote === note.id
                ? 'hover:bg-slate-400'
                : 'hover:bg-slate-200'
            } w-full h-16 rounded-sm shadow-md transition-all duration-500 ease-in-out`}
            onClick={() => setSelectNote(note.id)}
          >
            {note.title}
          </li>

        ))}
      </ul>
      <button className="z-10 sticky left-32  bottom-1 text-white bg-black px-1 py-2 b-1 rounded-md">
        Add Note
      </button>
    </div>
  );
};

export default Sidebar;
