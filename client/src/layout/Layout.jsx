// src/layout/Layout.jsx

import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}