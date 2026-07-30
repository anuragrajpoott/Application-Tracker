// src/components/ui/Input.jsx

import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(function Input(
  {
    label,
    error,
    className,
    type = "text",
    ...props
  },
  ref
) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        ref={ref}
        type={type}
        className={clsx(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900",
          "placeholder:text-slate-400",
          "transition-colors",
          "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100",
          "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-100",
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;