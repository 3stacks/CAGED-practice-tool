import React from "react";
import { getNoteClasses } from "../../Note/utils";

export default function Note({ note }: { note: string | null }) {
  if (!note) {
    return <div className="note"></div>;
  }

  return <div className={getNoteClasses(note, false)}>{note}</div>;
}
