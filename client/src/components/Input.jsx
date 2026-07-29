import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(function Input(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={clsx(
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition",
        "placeholder:text-slate-400",
        "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100",
        "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;