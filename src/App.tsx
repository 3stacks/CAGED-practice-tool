import React, { ChangeEvent, useState } from "react";
import "./index.css";
import CAGED from "./CAGED";
import Fretboard from "./Fretboard";
import clsx from "clsx";

function App() {
  const [studyMode, setStudyMode] = useState<"CAGED" | "fretboard">("CAGED");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col items-between">
        <div className="w-full flex items-end justify-between mb-6">
          <h1 className="font-bold text-5xl">Study Tool</h1>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setStudyMode("CAGED")}
              className={clsx(
                "bg-blue-300 text-white px-4 py-2 rounded-lg",
                studyMode === "CAGED" ? "bg-blue-600" : ""
              )}
            >
              CAGED mode
            </button>
            <button
              type="button"
              onClick={() => setStudyMode("fretboard")}
              className={clsx(
                "bg-blue-300 text-white px-4 py-2 rounded-lg",
                studyMode === "fretboard" ? "bg-blue-600" : ""
              )}
            >
              Fretboard memorisation
            </button>
          </div>
        </div>
        {studyMode === "CAGED" ? <CAGED /> : <Fretboard />}
      </div>
    </div>
  );
}

export default App;
