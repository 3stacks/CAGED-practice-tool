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

const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
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
  scaleDegree: ScaleDegree,
  relativeIntervals: boolean
) => {
  console.log({ baseInterval, scaleDegree });
  if (!relativeIntervals) {
    return baseInterval;
  }

  switch (scaleDegree) {
    case "I":
      return baseInterval;
    case "ii":
      return mod(baseInterval - 1, 7);
    case "iii":
      return mod(baseInterval - 2, 7);
    case "IV":
      console.log(baseInterval, baseInterval - 3, mod(baseInterval - 3, 7));
      return mod(baseInterval - 3, 7);
    case "V":
      return mod(baseInterval - 4, 7);
    case "vi":
      return mod(baseInterval - 5, 7);
    case "vii°":
      return mod(baseInterval - 6, 7);
  }
};

export const intervalGetterFactory = (
  stringNumber: StringNumber,
  scaleDegree: ScaleDegree,
  relativeIntervals: boolean
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
            [
              rootPosition - 3,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 5,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 3,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 5,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 7,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 9,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 10,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
          ]);
        },
      };
    case 2:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 3,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 3,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 3,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 5,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 7,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 9,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 10,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
      };
    case 3:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 4,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 3,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 6,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 7,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 9,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
          ]);
        },
      };
    case 4:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 6,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 7,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 9,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
      };
    case 5:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 5,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 7,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 9,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
          ]);
        },
      };
    case 6:
    default:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 1,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 2,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [
              rootPosition - 3,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition - 2,
              transformInterval(4, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition,
              transformInterval(5, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 2,
              transformInterval(6, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 4,
              transformInterval(7, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 5,
              transformInterval(1, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 7,
              transformInterval(2, scaleDegree, relativeIntervals),
            ],
            [
              rootPosition + 9,
              transformInterval(3, scaleDegree, relativeIntervals),
            ],
          ]);
        },
      };
  }
};
