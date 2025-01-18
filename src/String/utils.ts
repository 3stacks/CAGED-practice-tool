import type {
  Interval,
  ScaleDegree,
  ScaleInterval,
  StringNumber,
} from "./types";

const filterIntervals = (intervals: [number, number][]) => {
  return intervals.filter(([position]) => {
    return position >= 0;
  });
};

/**
 * Intervals for respective chords
 * Tonic - 1, 3, 5
 * ii - 2, 4, 6
 * iii - 3, 5, 7
 * IV - 4, 6, 1
 * V - 5, 7, 2
 * vi - 6, 1, 3
 * vii° - 7, 2, 4
 */
export const transformInterval = (
  baseInterval: ScaleInterval,
  scaleDegree: ScaleDegree
) => {
  console.log({ baseInterval, scaleDegree });
  switch (scaleDegree) {
    case "I":
      return baseInterval;
    case "ii":
      return (baseInterval + 1) % 7;
    case "iii":
      return (baseInterval + 2) % 7;
    case "IV":
      return (baseInterval + 3) % 7;
    case "V":
      return (baseInterval + 4) % 7;
    case "vi":
      return (baseInterval + 5) % 7;
    case "vii°":
      return (baseInterval + 6) % 7;
  }
};

export const intervalGetterFactory = (
  stringNumber: StringNumber,
  scaleDegree: ScaleDegree
): {
  getCIntervals(rootPosition: number): Interval[];
  getAIntervals(rootPosition: number): Interval[];
  getGIntervals(rootPosition: number): Interval[];
  getEIntervals(rootPosition: number): Interval[];
  getDIntervals(rootPosition: number): Interval[];
  getAllIntervals(rootPosition: number): Interval[];
} => {
  switch (stringNumber) {
    case 1:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(3, scaleDegree)],
            [rootPosition - 2, transformInterval(4, scaleDegree)],
            [rootPosition, transformInterval(5, scaleDegree)],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, transformInterval(5, scaleDegree)],
            [rootPosition + 2, transformInterval(6, scaleDegree)],
            [rootPosition + 4, transformInterval(7, scaleDegree)],
            [rootPosition + 5, transformInterval(1, scaleDegree)],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(6, scaleDegree)],
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
            [rootPosition + 2, transformInterval(2, scaleDegree)],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, transformInterval(2, scaleDegree)],
            [rootPosition + 2, transformInterval(3, scaleDegree)],
            [rootPosition + 3, transformInterval(4, scaleDegree)],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(3, scaleDegree)],
            [rootPosition - 2, transformInterval(4, scaleDegree)],
            [rootPosition, transformInterval(5, scaleDegree)],
            [rootPosition + 2, transformInterval(6, scaleDegree)],
            [rootPosition + 4, transformInterval(7, scaleDegree)],
            [rootPosition + 5, transformInterval(1, scaleDegree)],
            [rootPosition + 7, transformInterval(2, scaleDegree)],
            [rootPosition + 9, transformInterval(3, scaleDegree)],
            [rootPosition + 10, transformInterval(4, scaleDegree)],
          ]);
        },
      };
    case 2:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(7, scaleDegree)],
            [rootPosition - 2, transformInterval(1, scaleDegree)],
            [rootPosition, transformInterval(2, scaleDegree)],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, transformInterval(2, scaleDegree)],
            [rootPosition + 2, transformInterval(3, scaleDegree)],
            [rootPosition + 3, transformInterval(4, scaleDegree)],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(3, scaleDegree)],
            [rootPosition - 2, transformInterval(4, scaleDegree)],
            [rootPosition, transformInterval(5, scaleDegree)],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, transformInterval(5, scaleDegree)],
            [rootPosition + 2, transformInterval(6, scaleDegree)],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, transformInterval(6, scaleDegree)],
            [rootPosition + 2, transformInterval(7, scaleDegree)],
            [rootPosition + 3, transformInterval(1, scaleDegree)],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(7, scaleDegree)],
            [rootPosition - 2, transformInterval(1, scaleDegree)],
            [rootPosition, transformInterval(2, scaleDegree)],
            [rootPosition + 2, transformInterval(3, scaleDegree)],
            [rootPosition + 3, transformInterval(4, scaleDegree)],
            [rootPosition + 5, transformInterval(5, scaleDegree)],
            [rootPosition + 7, transformInterval(6, scaleDegree)],
            [rootPosition + 9, transformInterval(7, scaleDegree)],
            [rootPosition + 10, transformInterval(1, scaleDegree)],
          ]);
        },
      };
    case 3:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(5, scaleDegree)],
            [rootPosition - 1, transformInterval(6, scaleDegree)],
            [rootPosition + 1, transformInterval(7, scaleDegree)],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(6, scaleDegree)],
            [rootPosition + 1, transformInterval(7, scaleDegree)],
            [rootPosition + 2, transformInterval(1, scaleDegree)],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 4, transformInterval(7, scaleDegree)],
            [rootPosition - 3, transformInterval(1, scaleDegree)],
            [rootPosition - 1, transformInterval(2, scaleDegree)],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(2, scaleDegree)],
            [rootPosition + 1, transformInterval(3, scaleDegree)],
            [rootPosition + 2, transformInterval(4, scaleDegree)],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(3, scaleDegree)],
            [rootPosition, transformInterval(4, scaleDegree)],
            [rootPosition + 2, transformInterval(5, scaleDegree)],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(6, scaleDegree)],
            [rootPosition + 1, transformInterval(7, scaleDegree)],
            [rootPosition + 2, transformInterval(1, scaleDegree)],
            [rootPosition + 4, transformInterval(2, scaleDegree)],
            [rootPosition + 6, transformInterval(3, scaleDegree)],
            [rootPosition + 7, transformInterval(4, scaleDegree)],
            [rootPosition + 9, transformInterval(5, scaleDegree)],
          ]);
        },
      };
    case 4:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(2, scaleDegree)],
            [rootPosition - 1, transformInterval(3, scaleDegree)],
            [rootPosition, transformInterval(4, scaleDegree)],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(3, scaleDegree)],
            [rootPosition, transformInterval(4, scaleDegree)],
            [rootPosition + 2, transformInterval(5, scaleDegree)],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(5, scaleDegree)],
            [rootPosition - 1, transformInterval(6, scaleDegree)],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(6, scaleDegree)],
            [rootPosition + 1, transformInterval(7, scaleDegree)],
            [rootPosition + 2, transformInterval(1, scaleDegree)],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
            [rootPosition + 2, transformInterval(2, scaleDegree)],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(2, scaleDegree)],
            [rootPosition - 1, transformInterval(3, scaleDegree)],
            [rootPosition, transformInterval(4, scaleDegree)],
            [rootPosition + 2, transformInterval(5, scaleDegree)],
            [rootPosition + 4, transformInterval(6, scaleDegree)],
            [rootPosition + 6, transformInterval(7, scaleDegree)],
            [rootPosition + 7, transformInterval(1, scaleDegree)],
            [rootPosition + 9, transformInterval(2, scaleDegree)],
          ]);
        },
      };
    case 5:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(6, scaleDegree)],
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
            [rootPosition + 2, transformInterval(2, scaleDegree)],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(2, scaleDegree)],
            [rootPosition - 1, transformInterval(3, scaleDegree)],
            [rootPosition, transformInterval(4, scaleDegree)],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(3, scaleDegree)],
            [rootPosition, transformInterval(4, scaleDegree)],
            [rootPosition + 2, transformInterval(5, scaleDegree)],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, transformInterval(4, scaleDegree)],
            [rootPosition, transformInterval(5, scaleDegree)],
            [rootPosition + 2, transformInterval(6, scaleDegree)],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(6, scaleDegree)],
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
            [rootPosition + 2, transformInterval(2, scaleDegree)],
            [rootPosition + 4, transformInterval(3, scaleDegree)],
            [rootPosition + 5, transformInterval(4, scaleDegree)],
            [rootPosition + 7, transformInterval(5, scaleDegree)],
            [rootPosition + 9, transformInterval(6, scaleDegree)],
          ]);
        },
      };
    case 6:
    default:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(3, scaleDegree)],
            [rootPosition - 2, transformInterval(4, scaleDegree)],
            [rootPosition, transformInterval(5, scaleDegree)],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, transformInterval(5, scaleDegree)],
            [rootPosition + 2, transformInterval(6, scaleDegree)],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(6, scaleDegree)],
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, transformInterval(7, scaleDegree)],
            [rootPosition, transformInterval(1, scaleDegree)],
            [rootPosition + 2, transformInterval(2, scaleDegree)],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, transformInterval(1, scaleDegree)],
            [rootPosition, transformInterval(2, scaleDegree)],
            [rootPosition + 2, transformInterval(3, scaleDegree)],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, transformInterval(3, scaleDegree)],
            [rootPosition - 2, transformInterval(4, scaleDegree)],
            [rootPosition, transformInterval(5, scaleDegree)],
            [rootPosition + 2, transformInterval(6, scaleDegree)],
            [rootPosition + 4, transformInterval(7, scaleDegree)],
            [rootPosition + 5, transformInterval(1, scaleDegree)],
            [rootPosition + 7, transformInterval(2, scaleDegree)],
            [rootPosition + 9, transformInterval(3, scaleDegree)],
          ]);
        },
      };
  }
};
