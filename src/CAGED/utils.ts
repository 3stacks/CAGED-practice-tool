import { Scales } from "../types";

export const parseScaleName = (scale: Scales): string => {
  if (scale === "major") {
    return "Major (Ionian)";
  }

  if (scale === "natural_minor") {
    return "Natural Minor (Aeolian)";
  }

  return scale.replace("_", " ");
};
