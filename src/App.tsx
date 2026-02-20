import React, { useState } from "react";
import "./index.css";
import CAGED from "./CAGED";
import Fretboard from "./Fretboard";
import PracticeMode from "./PracticeMode";
import Metronome from "./Metronome";
import EarTraining from "./EarTraining";
import clsx from "clsx";
import { useTheme } from "./context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="min-h-[44px] min-w-[44px] p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      )}
    </button>
  );
}

type StudyMode = "CAGED" | "fretboard" | "practice" | "metronome" | "ear";

function App() {
  const [studyMode, setStudyMode] = useState<StudyMode>("CAGED");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-4 sm:py-6 flex flex-col flex-1">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
            Study Tool
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={() => setStudyMode("CAGED")}
              className={clsx(
                "min-h-[44px] px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors",
                studyMode === "CAGED"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              CAGED mode
            </button>
            <button
              type="button"
              onClick={() => setStudyMode("fretboard")}
              className={clsx(
                "min-h-[44px] px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors",
                studyMode === "fretboard"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              Fretboard
            </button>
            <button
              type="button"
              onClick={() => setStudyMode("practice")}
              className={clsx(
                "min-h-[44px] px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors",
                studyMode === "practice"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              Practice
            </button>
            <button
              type="button"
              onClick={() => setStudyMode("metronome")}
              className={clsx(
                "min-h-[44px] px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors",
                studyMode === "metronome"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              Metronome
            </button>
            <button
              type="button"
              onClick={() => setStudyMode("ear")}
              className={clsx(
                "min-h-[44px] px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors",
                studyMode === "ear"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              Ear Training
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          {studyMode === "CAGED" && <CAGED />}
          {studyMode === "fretboard" && <Fretboard />}
          {studyMode === "practice" && <PracticeMode />}
          {studyMode === "metronome" && <Metronome />}
          {studyMode === "ear" && <EarTraining />}
        </main>
      </div>
    </div>
  );
}

export default App;
