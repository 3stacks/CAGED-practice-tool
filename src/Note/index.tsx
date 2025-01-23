import clsx from "clsx";
import React, { useMemo } from "react";
import type { CAGED, ScaleDegree, ScaleInterval, Scales } from "../types";
import { keyShapeRootFretPositionRange, majorKeys } from "../constants";
import { isIntervalInTriad, transformInterval } from "./utils";

export default function Note({
  intervalMode,
  note,
  activeKey,
  fretNumber,
  activeShape,
  hideAccidentals,
  activeScale,
  scaleDegree,
  triadMode,
  relativeIntervals,
}: {
  note: string;
  intervalMode: boolean;
  fretNumber: number;
  activeKey: CAGED | "";
  activeShape: CAGED | "all" | "";
  activeScale: Scales;
  scaleDegree: ScaleDegree;
  triadMode: boolean;
  hideAccidentals: boolean;
  relativeIntervals: boolean;
}) {
  const isInKey = activeKey ? majorKeys[activeKey].includes(note) : true;

  if (!isInKey || (hideAccidentals && note.endsWith("b"))) {
    return <div className="note"></div>;
  }

  const isFretInRange = useMemo(() => {
    if (!activeKey || activeShape === "all") {
      return true;
    }

    const highlightRange =
      keyShapeRootFretPositionRange[activeKey][activeShape];

    if (highlightRange) {
      return fretNumber >= highlightRange[0] && fretNumber <= highlightRange[1];
    }
  }, [activeKey, activeShape]);

  const noteInterval = activeKey
    ? transformInterval(
        majorKeys[activeKey].indexOf(note) as ScaleInterval,
        scaleDegree,
        relativeIntervals
      ) + 1
    : 0;

  const shouldNoteBeHighlighted = useMemo(() => {
    if (!activeKey) {
      return true;
    }

    if (!isFretInRange) {
      return false;
    }

    if (activeScale === "pentatonic_major") {
      return ![4, 7].includes(noteInterval);
    }

    if (triadMode) {
      console.log(noteInterval, scaleDegree);
      if (relativeIntervals) {
        return [1, 3, 5].includes(noteInterval);
      }

      return isIntervalInTriad(noteInterval, scaleDegree);
    }

    return isFretInRange;
  }, [
    activeKey,
    activeScale,
    isFretInRange,
    noteInterval,
    relativeIntervals,
    scaleDegree,
    triadMode,
  ]);

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
        grayscale: !shouldNoteBeHighlighted,
      })}
    >
      {intervalMode ? noteInterval : note}
    </div>
  );
}
