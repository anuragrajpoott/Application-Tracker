import clsx from "clsx";

export default function Select({ className, children, ...props }) {
  return (
    <select
      className={clsx(
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition",
        "focus:border-slate-900",
        "disabled:cursor-not-allowed disabled:bg-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}