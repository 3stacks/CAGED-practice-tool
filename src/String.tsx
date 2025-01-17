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

const filterIntervals = (intervals: [number, number][]) => {
  return intervals.filter(([position]) => {
    return position >= 0;
  });
};

type Interval = [number, number];

const intervalGetterFactory = (
  stringNumber: number
): {
  getCIntervals(rootPosition: number): Interval[];
  getAIntervals(rootPosition: number): Interval[];
  getGIntervals(rootPosition: number): Interval[];
  getEIntervals(rootPosition: number): Interval[];
  getDIntervals(rootPosition: number): Interval[];
} => {
  switch (stringNumber) {
    case 1:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 3],
            [rootPosition - 2, 4],
            [rootPosition, 5],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, 5],
            [rootPosition + 2, 6],
            [rootPosition + 4, 7],
            [rootPosition + 5, 1],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 6],
            [rootPosition - 1, 7],
            [rootPosition, 1],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 7],
            [rootPosition, 1],
            [rootPosition + 2, 2],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, 2],
            [rootPosition + 2, 3],
            [rootPosition + 3, 4],
          ]);
        },
      };
    case 2:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 7],
            [rootPosition - 2, 1],
            [rootPosition, 2],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, 2],
            [rootPosition + 2, 3],
            [rootPosition + 3, 4],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 3],
            [rootPosition - 2, 4],
            [rootPosition, 5],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, 5],
            [rootPosition + 2, 6],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, 6],
            [rootPosition + 2, 7],
            [rootPosition + 3, 1],
          ]);
        },
      };
    case 3:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 5],
            [rootPosition - 1, 6],
            [rootPosition + 1, 7],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 6],
            [rootPosition, 7],
            [rootPosition + 2, 1],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 4, 7],
            [rootPosition - 3, 1],
            [rootPosition - 1, 2],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 2],
            [rootPosition + 1, 3],
            [rootPosition + 2, 4],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 3],
            [rootPosition, 4],
            [rootPosition + 2, 5],
          ]);
        },
      };
    case 4:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 2],
            [rootPosition - 1, 3],
            [rootPosition, 4],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 3],
            [rootPosition, 4],
            [rootPosition + 2, 5],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 5],
            [rootPosition - 1, 6],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 6],
            [rootPosition + 1, 7],
            [rootPosition + 2, 1],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 7],
            [rootPosition, 1],
            [rootPosition + 2, 2],
          ]);
        },
      };
    case 5:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, 6],
            [rootPosition - 1, 7],
            [rootPosition, 1],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 7],
            [rootPosition, 1],
            [rootPosition + 2, 2],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 2],
            [rootPosition - 1, 3],
            [rootPosition, 4],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 3],
            [rootPosition, 4],
            [rootPosition + 2, 5],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, 4],
            [rootPosition, 5],
            [rootPosition + 2, 6],
          ]);
        },
      };
    case 6:
    default:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 3],
            [rootPosition - 2, 4],
            [rootPosition, 5],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, 5],
            [rootPosition + 2, 6],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 6],
            [rootPosition - 1, 7],
            [rootPosition, 1],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 7],
            [rootPosition, 1],
            [rootPosition + 2, 2],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, 1],
            [rootPosition, 2],
            [rootPosition + 2, 3],
          ]);
        },
      };
  }
};

const getIntervalsForString1 = (activeShape: CAGED, activeKey: CAGED) => {
  const {
    getCIntervals,
    getAIntervals,
    getGIntervals,
    getEIntervals,
    getDIntervals,
  } = intervalGetterFactory(1);

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

const getIntervalsForString2 = (activeShape: CAGED, activeKey: CAGED) => {
  const {
    getCIntervals,
    getAIntervals,
    getGIntervals,
    getEIntervals,
    getDIntervals,
  } = intervalGetterFactory(2);

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

const getIntervalsForString3 = (activeShape: CAGED, activeKey: CAGED) => {
  const {
    getCIntervals,
    getAIntervals,
    getGIntervals,
    getEIntervals,
    getDIntervals,
  } = intervalGetterFactory(3);

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
  const {
    getCIntervals,
    getAIntervals,
    getGIntervals,
    getEIntervals,
    getDIntervals,
  } = intervalGetterFactory(4);

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

const getIntervalsForString5 = (activeShape: CAGED, activeKey: CAGED) => {
  const {
    getCIntervals,
    getAIntervals,
    getGIntervals,
    getEIntervals,
    getDIntervals,
  } = intervalGetterFactory(5);
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

const getIntervalsForString6 = (activeShape: CAGED, activeKey: CAGED) => {
  const {
    getCIntervals,
    getAIntervals,
    getGIntervals,
    getEIntervals,
    getDIntervals,
  } = intervalGetterFactory(6);

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
            key={`${note}-${i}`}
          >
            {intervalMode && interval ? interval[1] : note}
          </div>
        );
      })}
    </div>
  );
}
