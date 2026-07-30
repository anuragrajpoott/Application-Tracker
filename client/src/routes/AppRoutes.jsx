// src/routes/AppRoutes.jsx

import { Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}