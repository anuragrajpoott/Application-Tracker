// src/pages/NotFound.jsx

import { Link } from "react-router-dom";

import Button from "../components/Button.jsx";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-slate-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-slate-800">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="mt-8">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}