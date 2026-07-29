import clsx from "clsx";

const variants = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",

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

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
}

export default Button;