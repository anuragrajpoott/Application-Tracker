// src/components/ui/Button.jsx

import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}

      {children}
    </button>
  );
}