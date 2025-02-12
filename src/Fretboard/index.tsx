import clsx from "clsx";
import React, { useEffect } from "react";
import CircleOfFifths from "../CircleOfFifths";
import FretNumbers from "../FretNumbers";
import { Notes } from "../types";
import String from "./String";
import { CIRCLE_OF_FIFTHS, circleOfFifthsNoteAudio } from "./constants";
import Note from "./Note";
import { mod } from "./Note/utils";
import { CircleOfFifthsNotes } from "./types";

export default function Fretboard() {
  const [delay, setDelay] = React.useState<number>(2);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [activeNote, setActiveNote] = React.useState<CircleOfFifthsNotes>("C");
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const preloadAudio = (file) => {
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
    <div>
      <audio ref={audioRef}></audio>
      <div className="flex items-center justify-between mb-5">
        <CircleOfFifths />
        <div className="flex items-center flex-col space-y-2">
          <h2 className="font-bold text-2xl">Active Note</h2>
          <Note note={activeNote} />
        </div>
        <div>
          <h2 className="font-bold text-2xl mb-3">Play</h2>
          <form onSubmit={handleStart}>
            <div className="flex flex-col space-y-1 mb-2">
              <label htmlFor="delay">Delay (seconds)</label>
              <input
                type="number"
                name="delay"
                value={delay}
                className="border border-gray-300 rounded-lg px-2 py-1"
                onChange={handleDelayChange}
              />
            </div>
            <button
              type="submit"
              className={clsx("bg-blue-600 text-white px-4 py-2 rounded-lg")}
            >
              {isStarted ? "Stop" : "Start"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-4 items-center overflow-auto">
        {(["E", "B", "G", "D", "A", "E"] as Notes[]).map((firstNote, index) => (
          <String key={`${firstNote}-${index}`} firstNote={firstNote} />
        ))}
        <FretNumbers fretCount={13} />
      </div>
    </div>
  );
}
