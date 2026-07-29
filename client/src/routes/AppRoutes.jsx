import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

import AddApplication from "../pages/AddApplication";
import Applications from "../pages/Applications";
import Dashboard from "../pages/Dashboard";
import EditApplication from "../pages/EditApplication";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/new" element={<AddApplication />} />
        <Route
          path="/applications/:id/edit"
          element={<EditApplication />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}