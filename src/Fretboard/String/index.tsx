import React from "react";
import type { Notes } from "../../types";
import { NOTES } from "../../constants";
import Note from "../Note";

const notesToShow = ["G", "A", "B", "D", "E"];

export default function String({ firstNote }: { firstNote: Notes }) {
  const firstIndex = NOTES.indexOf(firstNote);

  return (
    <div className="w-full px-4 relative flex items-center">
      <div className="justify-between self-stretch flex items-center w-full">
        {new Array(13).fill(0).map((_, i) => {
          const note = NOTES[(firstIndex + i) % NOTES.length];
          const parsedNote = !notesToShow.includes(note) ? null : note;

          return (
            <React.Fragment key={`${note}-${i}`}>
              <Note note={parsedNote} />
              {i === 0 && (
                <div className="h-[32px] xs:h-[35px] lg:h-[50px] w-[4px] xs:w-[5px] bg-black dark:bg-white"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-1 bg-black dark:bg-gray-400 z-0"></div>
    </div>
  );
}
