import React from "react";
import type { AllKeys, CAGED, Notes, ScaleDegree, Scales } from "../types";
import { NOTES } from "../constants";
import Note from "../Note";

export default function String({
  firstNote,
  activeKey,
  activeShape,
  triadMode,
  hideAccidentals,
  showBothEnharmonics,
  intervalMode,
  scaleDegree,
  relativeIntervals,
  activeScale,
}: {
  firstNote: Notes;
  activeKey: AllKeys | "";
  activeShape: CAGED | "all" | "";
  triadMode: boolean;
  scaleDegree: ScaleDegree;
  hideAccidentals: boolean;
  showBothEnharmonics: boolean;
  intervalMode: boolean;
  relativeIntervals: boolean;
  activeScale: Scales;
}) {
  const firstIndex = NOTES.indexOf(firstNote);

  return (
    <div className="w-full px-4 relative flex items-center">
      {/* String label */}
      <span className="w-6 xs:w-8 text-center font-bold text-gray-700 dark:text-gray-300 mr-1 xs:mr-2 flex-shrink-0 text-sm xs:text-base">
        {firstNote}
      </span>
      <div className="justify-between self-stretch flex items-center w-full">
        {new Array(17).fill(0).map((_, i) => {
          const note = NOTES[(firstIndex + i) % NOTES.length];

          return (
            <React.Fragment key={`${note}-${i}`}>
              <Note
                hideAccidentals={hideAccidentals}
                showBothEnharmonics={showBothEnharmonics}
                activeKey={activeKey}
                activeShape={activeShape}
                activeScale={activeScale}
                scaleDegree={scaleDegree}
                intervalMode={intervalMode}
                relativeIntervals={relativeIntervals}
                triadMode={triadMode}
                fretNumber={i}
                note={note}
              />
              {i === 0 && <div className="h-full w-[4px] xs:w-[5px] bg-black dark:bg-white"></div>}
            </React.Fragment>
          );
        })}
      </div>
      <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-1 bg-black dark:bg-gray-400 z-0"></div>
    </div>
  );
}
