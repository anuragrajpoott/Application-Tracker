// src/layout/Header.jsx

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Job Application Tracker
          </h1>

          <p className="text-sm text-slate-500">
            Keep track of your job applications.
          </p>
        </div>
      </div>
    </header>
  );
}