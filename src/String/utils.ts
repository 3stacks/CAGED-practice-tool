import type { Interval, StringNumber } from "./types";

const filterIntervals = (intervals: [number, number][]) => {
  return intervals.filter(([position]) => {
    return position >= 0;
  });
};

export const intervalGetterFactory = (
  stringNumber: StringNumber
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
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 3],
            [rootPosition - 2, 4],
            [rootPosition, 5],
            [rootPosition + 2, 6],
            [rootPosition + 4, 7],
            [rootPosition + 5, 1],
            [rootPosition + 7, 2],
            [rootPosition + 9, 3],
            [rootPosition + 10, 4],
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
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 7],
            [rootPosition - 2, 1],
            [rootPosition, 2],
            [rootPosition + 2, 3],
            [rootPosition + 3, 4],
            [rootPosition + 5, 5],
            [rootPosition + 7, 6],
            [rootPosition + 9, 7],
            [rootPosition + 10, 1],
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
            [rootPosition + 1, 7],
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
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, 6],
            [rootPosition + 1, 7],
            [rootPosition + 2, 1],
            [rootPosition + 4, 2],
            [rootPosition + 6, 3],
            [rootPosition + 7, 4],
            [rootPosition + 9, 5],
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
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 2],
            [rootPosition - 1, 3],
            [rootPosition, 4],
            [rootPosition + 2, 5],
            [rootPosition + 4, 6],
            [rootPosition + 6, 7],
            [rootPosition + 7, 1],
            [rootPosition + 9, 2],
          ]);
        },
      };
    case 5:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 6],
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
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 6],
            [rootPosition - 1, 7],
            [rootPosition, 1],
            [rootPosition + 2, 2],
            [rootPosition + 4, 3],
            [rootPosition + 5, 4],
            [rootPosition + 7, 5],
            [rootPosition + 9, 6],
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
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, 3],
            [rootPosition - 2, 4],
            [rootPosition, 5],
            [rootPosition + 2, 6],
            [rootPosition + 4, 7],
            [rootPosition + 5, 1],
            [rootPosition + 7, 2],
            [rootPosition + 9, 3],
          ]);
        },
      };
  }
};
