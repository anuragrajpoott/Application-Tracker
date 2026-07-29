import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/applications/new": "Add Application",
};

export default function Header() {
  const { pathname } = useLocation();

  const title = pathname.includes("/edit")
    ? "Edit Application"
    : pageTitles[pathname] || "Job Tracker";

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center px-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">
            Track your job applications efficiently.
          </p>
        </div>
      </div>
    </header>
  );
}