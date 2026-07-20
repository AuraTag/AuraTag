import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import RegisterBottle from "../pages/RegisterBottle/RegisterBottle";
import BottleList from "../pages/BottleList/BottleList";
import BottleDetails from "../pages/BottleDetails/BottleDetails";
import Verify from "../pages/Verify/Verify";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/register-bottle"
          element={<RegisterBottle />}
        />

        {/* 👇 Add it here */}
        <Route
          path="/bottles"
          element={<BottleList />}
        />
        <Route
    path="/verify/:uid"
    element={<Verify />}
/>
        <Route
    path="/bottles/:id"
    element={<BottleDetails />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;