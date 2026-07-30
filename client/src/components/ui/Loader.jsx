// src/components/ui/Loader.jsx wow

export default function Loader({ text = "Loading..." }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
    >
      <div
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
      />

      <span className="sr-only">{text}</span>

      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}