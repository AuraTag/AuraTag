import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>AuraTag</h2>
      </div>

      <nav>
        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/products">
          📦 Products
        </NavLink>

        <NavLink to="/batches">
          🏭 Batch Management
        </NavLink>

        <NavLink to="/bottles">
          🍾 Bottles
        </NavLink>

        <NavLink to="/verify/sample">
          📱 Verification
        </NavLink>

        <NavLink to="/verification-history">
          📜 Verification History
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>

        <NavLink to="/analytics">
          📊 Analytics
        </NavLink>
      </nav>
    </div>
  );
}