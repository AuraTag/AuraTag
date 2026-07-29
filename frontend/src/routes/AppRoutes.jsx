import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Batches from "../pages/Batches/Batches";
import RegisterBottle from "../pages/RegisterBottle/RegisterBottle";
import BottleList from "../pages/BottleList/BottleList";
import BottleDetails from "../pages/BottleDetails/BottleDetails";
import Verify from "../pages/Verify/Verify";
import VerificationHistory from "../pages/VerificationHistory/VerificationHistory";
import Profile from "../pages/Profile/Profile";
import Reports from "../pages/Reports/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        {/* Batches */}
        <Route path="/batches" element={<Batches />} />

        {/* Register Bottle */}
        <Route
          path="/register-bottle"
          element={<RegisterBottle />}
        />

        {/* Bottle List */}
        <Route
          path="/bottles"
          element={<BottleList />}
        />

        {/* Bottle Details */}
        <Route
          path="/bottles/:id"
          element={<BottleDetails />}
        />

        {/* Verification */}
        <Route
          path="/verify/:uid"
          element={<Verify />}
        />
        <Route
    path="/verification-history"
    element={<VerificationHistory />}
/>

    {/* Profile */}
<Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/reports"
  element={<Reports />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;