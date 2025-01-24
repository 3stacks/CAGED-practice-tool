import React from "react";
import CircleOfFifths from "../CircleOfFifths";
import { Notes } from "../types";
import String from "./String";

export default function Fretboard() {
  return (
    <div>
      WIP
      <div className="flex w-full flex-col space-y-4 items-center overflow-auto">
        {(["E", "B", "G", "D", "A", "E"] as Notes[]).map((firstNote, index) => (
          <String key={`${firstNote}-${index}`} firstNote={firstNote} />
        ))}
        <div className="w-full justify-between px-4 items-center text-center flex">
          {new Array(13).fill(0).map((_, index) => (
            <span className="note text-black" key={index}>
              {index}
            </span>
          ))}
        </div>
      </div>
      <CircleOfFifths />
    </div>
  );
}
