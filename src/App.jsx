import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppRoutes from "./routes/AppRoutes";
import NotFound from "./Components/NotFound/NotFound"; 

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/leaderboard/*" element={<AppRoutes />} />
      <Route path="/*" element={<DashboardRoutes />} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
};

export default App;
