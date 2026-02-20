import clsx from "clsx";
import React, { useEffect } from "react";
import CircleOfFifths from "../CircleOfFifths";
import FretNumbers from "../FretNumbers";
import { Notes } from "../types";
import { mod } from "../utils";
import String from "./String";
import { CIRCLE_OF_FIFTHS, circleOfFifthsNoteAudio } from "./constants";
import Note from "./Note";
import { CircleOfFifthsNotes } from "./types";

export default function Fretboard() {
  const [delay, setDelay] = React.useState<number>(2);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [activeNote, setActiveNote] = React.useState<CircleOfFifthsNotes>("C");
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const preloadAudio = (file: string) => {
      const audio = new Audio(file);
      audio.preload = "auto";
      audio.load();
    };

    Object.values(circleOfFifthsNoteAudio).forEach((file) => {
      preloadAudio(file);
    });
  }, []);

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(parseInt(e.target.value, 10));
  };

  const playNote = (note: CircleOfFifthsNotes) => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = circleOfFifthsNoteAudio[note];
      audio.play();
    }
  };

  const handleStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const flip = !isStarted;

    setIsStarted(flip);

    if (!flip) {
      setActiveNote("C");
    }
  };

  useEffect(() => {
    if (isStarted) {
      let activeIndex = -1;

      const interval = setInterval(() => {
        activeIndex = mod(activeIndex + 1, CIRCLE_OF_FIFTHS.length);
        const nextNote = CIRCLE_OF_FIFTHS[activeIndex];

        setActiveNote(nextNote);
        playNote(nextNote);
      }, delay * 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isStarted]);

  return (
    <div className="flex flex-col">
      <audio ref={audioRef}></audio>

      {/* Controls section - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 items-start">
        {/* Circle of Fifths - hidden on smallest screens */}
        <div className="hidden sm:flex justify-center">
          <CircleOfFifths />
        </div>

        {/* Active Note */}
        <div className="flex items-center flex-col space-y-2">
          <h2 className="font-bold text-xl sm:text-2xl dark:text-white">Active Note</h2>
          <Note note={activeNote} />
        </div>

        {/* Play controls */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="font-bold text-xl sm:text-2xl mb-3 dark:text-white">Play</h2>
          <form onSubmit={handleStart} className="w-full max-w-[200px]">
            <div className="flex flex-col space-y-1 mb-3">
              <label htmlFor="delay" className="text-sm dark:text-gray-200">
                Delay (seconds)
              </label>
              <input
                type="number"
                name="delay"
                value={delay}
                min={1}
                max={10}
                className="min-h-[44px] border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                onChange={handleDelayChange}
              />
            </div>
            <button
              type="submit"
              className={clsx(
                "w-full min-h-[44px] px-4 py-2 rounded-lg font-medium transition-colors",
                isStarted
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              {isStarted ? "Stop" : "Start"}
            </button>
          </form>
        </div>
      </div>

      {/* Fretboard with horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[650px]">
          <div className="flex w-full flex-col space-y-3 sm:space-y-4 items-center">
            {(["E", "B", "G", "D", "A", "E"] as Notes[]).map((firstNote, index) => (
              <String key={`${firstNote}-${index}`} firstNote={firstNote} />
            ))}
            <FretNumbers fretCount={13} />
          </div>
        </div>
      </div>
    </div>
  );
}
