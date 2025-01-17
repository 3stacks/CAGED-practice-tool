import React from "react";
import clsx from "clsx";
import { CAGED } from "./App";
import { useMemo } from "react";

export type Notes = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export const NOTES = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const getIntervalsForString1 = (activeShape: CAGED, activeKey: CAGED) => {
  switch (activeKey) {
    case "C":
      switch (activeShape) {
        case "C":
          return [
            [0, 3],
            [1, 4],
            [3, 5],
          ];
        case "A":
          return [
            [3, 5],
            [5, 6],
            [7, 7],
            [8, 1],
          ];
        case "G":
          return [
            [5, 6],
            [7, 7],
            [8, 1],
          ];
        case "E":
          return [
            [7, 7],
            [8, 1],
            [10, 2],
          ];
        case "D":
          return [
            [10, 2],
            [12, 3],
            [13, 4],
          ];
      }
    case "A":
      switch (activeShape) {
        case "A":
          return [
            [0, 5],
            [2, 6],
            [4, 7],
            [5, 1],
          ];
        case "G":
          return [
            [2, 6],
            [4, 7],
            [5, 1],
          ];
        case "E":
          return [
            [4, 7],
            [5, 1],
            [7, 2],
          ];
        case "D":
          return [
            [7, 2],
            [9, 3],
            [10, 4],
          ];
        case "C":
          return [
            [9, 3],
            [10, 4],
            [12, 5],
          ];
      }
  }
};

const getIntervalsForString2 = (activeShape: CAGED, activeKey: CAGED) => {
  switch (activeKey) {
    case "C":
      switch (activeShape) {
        case "C":
          return [
            [0, 7],
            [1, 1],
            [3, 2],
          ];
        case "A":
          return [
            [3, 2],
            [5, 3],
            [6, 4],
          ];
        case "G":
          return [
            [5, 3],
            [6, 4],
            [8, 5],
          ];
        case "E":
          return [
            [8, 5],
            [10, 6],
          ];
        case "D":
          return [
            [10, 6],
            [12, 7],
            [13, 1],
          ];
      }
    case "A":
      switch (activeShape) {
        case "A":
          return [
            [0, 2],
            [2, 3],
            [3, 4],
          ];
        case "G":
          return [
            [2, 3],
            [3, 4],
            [5, 5],
          ];
        case "E":
          return [
            [5, 5],
            [7, 6],
          ];
        case "D":
          return [
            [7, 6],
            [9, 7],
            [10, 1],
          ];
        case "C":
          return [
            [9, 7],
            [10, 1],
            [12, 2],
          ];
      }
  }
};

const getIntervalsForString3 = (activeShape: CAGED, activeKey: CAGED) => {
  const getCIntervals = (rootPosition: number) => {
    return [
      [rootPosition - 3, 5],
      [rootPosition - 1, 6],
      [rootPosition, 7],
    ].filter(([position]) => position >= 0);
  };
  const getAIntervals = (rootPosition: number) => {
    return [
      [rootPosition - 1, 6],
      [rootPosition, 7],
      [rootPosition + 2, 1],
    ].filter(([position]) => position >= 0);
  };
  const getGIntervals = (rootPosition: number) => {
    return [
      [rootPosition - 4, 7],
      [rootPosition - 3, 1],
      [rootPosition - 1, 2],
    ];
  };
  const getEIntervals = (rootPosition: number) => {
    return [
      [rootPosition - 1, 2],
      [rootPosition + 1, 3],
      [rootPosition + 2, 4],
    ];
  };
  const getDIntervals = (rootPosition: number) => {
    return [
      [rootPosition - 1, 3],
      [rootPosition, 4],
      [rootPosition + 2, 5],
    ];
  };

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
      }
  }
};

const getIntervalsForString4 = (activeShape: CAGED, activeKey: CAGED) => {
  switch (activeKey) {
    case "C":
      switch (activeShape) {
        case "C":
          return [
            [0, 2],
            [2, 3],
            [3, 4],
          ];
        case "A":
          return [
            [2, 3],
            [3, 4],
            [5, 5],
          ];
        case "G":
          return [
            [5, 5],
            [7, 6],
          ];
        case "E":
          return [
            [7, 6],
            [9, 7],
            [10, 1],
          ];
        case "D":
          return [
            [9, 7],
            [10, 1],
            [12, 2],
          ];
      }
    case "A":
      switch (activeShape) {
        case "A":
          return [
            [0, 4],
            [2, 5],
            [4, 6],
          ];
        case "G":
          return [
            [2, 5],
            [4, 6],
          ];
        case "E":
          return [
            [4, 6],
            [6, 7],
            [7, 1],
          ];
        case "D":
          return [
            [6, 7],
            [7, 1],
            [9, 2],
          ];
        case "C":
          return [
            [9, 2],
            [11, 3],
            [12, 4],
          ];
      }
  }
};

const getIntervalsForString5 = (activeShape: CAGED, activeKey: CAGED) => {
  switch (activeKey) {
    case "C":
      switch (activeShape) {
        case "C":
          return [
            [0, 6],
            [2, 7],
            [3, 1],
          ];
        case "A":
          return [
            [2, 7],
            [3, 1],
            [5, 2],
          ];
        case "G":
          return [
            [5, 2],
            [7, 3],
            [8, 4],
          ];
        case "E":
          return [
            [7, 3],
            [8, 4],
            [10, 5],
          ];
        case "D":
          return [
            [8, 4],
            [10, 5],
            [12, 6],
          ];
      }
    case "A":
      switch (activeShape) {
        case "A":
          return [
            [0, 1],
            [2, 2],
            [4, 3],
          ];
        case "G":
          return [
            [2, 2],
            [4, 3],
            [5, 4],
          ];
        case "E":
          return [
            [4, 3],
            [5, 4],
            [7, 5],
          ];
        case "D":
          return [
            [5, 4],
            [7, 5],
            [9, 6],
          ];
        case "C":
          return [
            [9, 6],
            [11, 7],
            [12, 1],
          ];
      }
  }
};

const getIntervalsForString6 = (activeShape: CAGED, activeKey: CAGED) => {
  switch (activeKey) {
    case "C":
      switch (activeShape) {
        case "C":
          return [
            [0, 3],
            [1, 4],
            [3, 5],
          ];
        case "A":
          return [
            [3, 5],
            [5, 6],
          ];
        case "G":
          return [
            [5, 6],
            [7, 7],
            [8, 1],
          ];
        case "E":
          return [
            [7, 7],
            [8, 1],
            [10, 2],
          ];
        case "D":
          return [
            [8, 1],
            [10, 2],
            [12, 3],
          ];
      }
    case "A":
      switch (activeShape) {
        case "A":
          return [
            [0, 5],
            [2, 6],
          ];
        case "G":
          return [
            [2, 6],
            [4, 7],
            [5, 1],
          ];
        case "E":
          return [
            [4, 7],
            [5, 1],
            [7, 2],
          ];
        case "D":
          return [
            [5, 1],
            [7, 2],
            [9, 3],
          ];
        case "C":
          return [
            [9, 3],
            [10, 4],
            [12, 5],
          ];
      }
  }
};

export default function String({
  firstNote,
  stringNumber,
  activeKey,
  activeShape,
  triadMode,
  hideAccidentals,
  intervalMode,
}: {
  stringNumber: number;
  firstNote: Notes;
  activeKey: CAGED | "";
  activeShape: CAGED | "";
  triadMode: boolean;
  hideAccidentals: boolean;
  intervalMode: boolean;
}) {
  const firstIndex = NOTES.indexOf(firstNote);

  console.log({ activeKey, activeShape });

  const intervals = useMemo(() => {
    switch (stringNumber) {
      case 6:
        return getIntervalsForString6(activeShape, activeKey);
      case 5:
        return getIntervalsForString5(activeShape, activeKey);
      case 4:
        return getIntervalsForString4(activeShape, activeKey);
      case 3:
        return getIntervalsForString3(activeShape, activeKey);
      case 2:
        return getIntervalsForString2(activeShape, activeKey);
      case 1:
      default:
        return getIntervalsForString1(activeShape, activeKey);
    }
  }, [stringNumber, firstNote, activeKey, activeShape]);

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
          return <div className="note"></div>;
        }

        return (
          <div
            className={clsx("note z-10", {
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
            key={i}
          >
            {intervalMode && interval ? interval[1] : note}
          </div>
        );
      })}
    </div>
  );
}
