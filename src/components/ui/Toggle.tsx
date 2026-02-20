import React from "react";
import clsx from "clsx";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
}

export function Toggle({ label, checked, onChange, disabled, description }: ToggleProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex items-center justify-between min-h-[44px] py-1">
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-medium cursor-pointer",
            "dark:text-gray-200",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-gray-500 dark:text-gray-400">{description}</span>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer",
          "rounded-full border-2 border-transparent transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "dark:focus:ring-offset-gray-800",
          checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={clsx(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full",
            "bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
