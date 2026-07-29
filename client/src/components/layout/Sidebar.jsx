import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CirclePlus,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    path: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    name: "Add Application",
    path: "/applications/new",
    icon: CirclePlus,
  },
];

function Sidebar() {
  return (
    <aside className="fixed hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
      <div className="border-b border-slate-200 px-6 py-6">
        <h1 className="text-xl font-bold text-slate-900">
          Job Tracker
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Personal Dashboard
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;