import clsx from "clsx";
import React from "react";

export default function Note({ note }: { note: string | null }) {
  if (!note) {
    return <div className="note"></div>;
  }

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
      })}
    >
      {note}
    </div>
  );
}
