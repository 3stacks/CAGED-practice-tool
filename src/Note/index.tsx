import clsx from "clsx";
import React, { useMemo } from "react";
import type { CAGED } from "../types";
import { keyShapeRootFretPositionRange } from "../constants";

const majorKeys = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  A: ["A", "B", "Db", "D", "E", "Gb", "Ab"],
  G: ["G", "A", "B", "C", "D", "E", "Gb"],
  E: ["E", "Gb", "Ab", "A", "B", "Db", "Eb"],
  D: ["D", "E", "Gb", "G", "A", "B", "Db"],
};

export default function Note({
  intervalMode,
  note,
  activeKey,
  fretNumber,
  activeShape,
}: {
  note: string;
  intervalMode: boolean;
  fretNumber: number;
  activeKey: CAGED | "";
  activeShape: CAGED | "all" | "";
}) {
  const isInKey = activeKey ? majorKeys[activeKey].includes(note) : true;

  if (!isInKey) {
    return <div className="note"></div>;
  }

  const highlight = useMemo(() => {
    if (!activeKey || activeShape === "all") {
      return true;
    }

    const highlightRange =
      keyShapeRootFretPositionRange[activeKey][activeShape];

    if (highlightRange) {
      return fretNumber >= highlightRange[0] && fretNumber <= highlightRange[1];
    }
  }, [activeKey, activeShape]);

  return (
    <div
      className={clsx("relative note z-10", {
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
        grayscale: activeKey && !highlight,
      })}
    >
      {intervalMode ? majorKeys[activeKey].indexOf(note) + 1 : note}
    </div>
  );
}
