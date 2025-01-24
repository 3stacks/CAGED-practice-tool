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
        "note-G": note === "G",
        "note-A": note === "A",
        "note-B": note === "B",
        "note-D": note === "D",
        "note-E": note === "E",
      })}
    >
      {note}
    </div>
  );
}
