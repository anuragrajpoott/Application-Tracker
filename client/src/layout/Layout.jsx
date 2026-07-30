import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <Outlet />
    </main>
  );
}