import { Scales } from "../types";

export const parseScaleName = (scale: Scales): string => {
  switch (scale) {
    case "major":
      return "Major (Ionian)";
    case "natural_minor":
      return "Natural Minor (Aeolian)";
    case "harmonic_minor":
      return "Harmonic Minor";
    case "melodic_minor":
      return "Melodic Minor";
    case "pentatonic_major":
      return "Pentatonic Major";
    case "pentatonic_minor":
      return "Pentatonic Minor";
    case "blues":
      return "Blues";
    default:
      // Capitalize first letter of mode names
      return scale.charAt(0).toUpperCase() + scale.slice(1);
  }
};
