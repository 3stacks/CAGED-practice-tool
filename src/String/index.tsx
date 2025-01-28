import React from "react";
import type { CAGED, Notes, ScaleDegree, Scales, StringNumber } from "../types";
import { NOTES } from "../constants";
import Note from "../Note";

export default function String({
  firstNote,
  stringNumber,
  activeKey,
  activeShape,
  triadMode,
  hideAccidentals,
  intervalMode,
  scaleDegree,
  relativeIntervals,
  activeScale,
}: {
  stringNumber: StringNumber;
  firstNote: Notes;
  activeKey: CAGED | "";
  activeShape: CAGED | "all" | "";
  triadMode: boolean;
  scaleDegree: ScaleDegree;
  hideAccidentals: boolean;
  intervalMode: boolean;
  relativeIntervals: boolean;
  activeScale: Scales;
}) {
  const firstIndex = NOTES.indexOf(firstNote);

  return (
    <div className="w-full px-4 relative flex items-center">
      <div className="justify-between self-stretch flex items-center w-full">
        {new Array(17).fill(0).map((_, i) => {
          const note = NOTES[(firstIndex + i) % NOTES.length];

          return (
            <>
              <Note
                hideAccidentals={hideAccidentals}
                activeKey={activeKey}
                activeShape={activeShape}
                activeScale={activeScale}
                scaleDegree={scaleDegree}
                intervalMode={intervalMode}
                relativeIntervals={relativeIntervals}
                triadMode={triadMode}
                fretNumber={i}
                note={note}
                key={`${note}-${i}`}
              />
              {i === 0 && <div className="h-full w-[5px] bg-black"></div>}
            </>
          );
        })}
      </div>
      <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-1 bg-black z-0"></div>
    </div>
  );
}
