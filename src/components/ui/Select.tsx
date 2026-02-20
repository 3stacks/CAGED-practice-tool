import React from "react";
import clsx from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={selectId} className="font-bold text-sm mb-1 dark:text-gray-200">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={clsx(
          "min-h-[44px] px-3 py-2 rounded-lg border",
          "bg-white dark:bg-gray-700",
          "border-gray-300 dark:border-gray-600",
          "text-gray-900 dark:text-gray-100",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    </div>
  );
}
