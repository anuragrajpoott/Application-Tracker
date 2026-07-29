import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/applications/new": "Add Application",
};

function Header() {
  const { pathname } = useLocation();

  const title =
    titles[pathname] ||
    (pathname.includes("/edit")
      ? "Edit Application"
      : "Job Tracker");

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            Track your job applications efficiently.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;