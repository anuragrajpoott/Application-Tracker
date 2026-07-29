function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}

export default Loader;