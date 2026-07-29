import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";

import Applications from "../pages/Applications";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}