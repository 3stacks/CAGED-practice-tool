import React, { useMemo } from "react";
import clsx from "clsx";
import type { CAGED, Notes, ScaleDegree, StringNumber } from "./types";
import { NOTES } from "./constants";
import { intervalGetterFactory } from "./utils";

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
}) {
  const firstIndex = NOTES.indexOf(firstNote);

  const intervals = useMemo(() => {
    const {
      getCIntervals,
      getAIntervals,
      getGIntervals,
      getEIntervals,
      getDIntervals,
      getAllIntervals,
    } = intervalGetterFactory(stringNumber, scaleDegree, relativeIntervals);

    switch (activeKey) {
      case "C":
        switch (activeShape) {
          case "C":
            return getCIntervals(3);
          case "A":
            return getAIntervals(3);
          case "G":
            return getGIntervals(8);
          case "E":
            return getEIntervals(8);
          case "D":
            return getDIntervals(10);
          case "all":
            return getAllIntervals(3);
        }
      case "A":
        switch (activeShape) {
          case "A":
            return getAIntervals(0);
          case "G":
            return getGIntervals(5);
          case "E":
            return getEIntervals(5);
          case "D":
            return getDIntervals(7);
          case "C":
            return getCIntervals(12);
          case "all":
            return getAllIntervals(0);
        }
      case "G":
        switch (activeShape) {
          case "G":
            return getGIntervals(3);
          case "E":
            return getEIntervals(5);
          case "D":
            return getDIntervals(7);
          case "C":
            return getCIntervals(10);
          case "A":
            return getAIntervals(10);
          case "all":
            return getAllIntervals(3);
        }
      case "E":
        switch (activeShape) {
          case "E":
            return getEIntervals(0);
          case "D":
            return getDIntervals(2);
          case "C":
            return getCIntervals(7);
          case "A":
            return getAIntervals(7);
          case "G":
            return getGIntervals(12);
          case "all":
            return getAllIntervals(0);
        }
      case "D":
        switch (activeShape) {
          case "D":
            return getDIntervals(0);
          case "C":
            return getCIntervals(5);
          case "A":
            return getAIntervals(5);
          case "G":
            return getGIntervals(10);
          case "E":
            return getEIntervals(10);
          case "all":
            return getAllIntervals(0);
        }
    }
  }, [stringNumber, firstNote, activeKey, activeShape, scaleDegree]);

  return (
    <div className="relative flex items-center space-x-4">
      <div className="w-[105%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-1 bg-black z-0"></div>
      {new Array(15).fill(0).map((_, i) => {
        const note = NOTES[(firstIndex + i) % NOTES.length];
        const interval = intervals?.find((interval) => interval[0] === i);

        if (
          (activeKey && activeShape && !interval) ||
          (triadMode && interval && ![1, 3, 5].includes(interval[1])) ||
          (hideAccidentals && note.endsWith("b"))
        ) {
          return <div className="note" key={`${note}-${i}`}></div>;
        }

        return (
          <div
            className={clsx("note z-10", {
              flat: note.endsWith("b"),
              "note-C": note === "C",
              "note-Db": note === "Db",
              "note-D": note === "D",
              "note-Eb": note === "Eb",
              "note-E": note === "E",
              "note-F": note === "F",
              "note-Gb": note === "Gb",
              "note-G": note === "G",
              "note-Ab": note === "Ab",
              "note-A": note === "A",
              "note-Bb": note === "Bb",
              "note-B": note === "B",
            })}
            key={`${note}-${i}`}
          >
            {intervalMode && interval ? interval[1] : note}
          </div>
        );
      })}
    </div>
  );
}
