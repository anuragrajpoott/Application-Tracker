import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

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

        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/applications" className={navLinkClass}>
            Applications
          </NavLink>
        </nav>
      </div>
    </header>
  );
}