import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  History,
  BarChart3,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#161B22] text-white p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-[#D6B25E] mb-10">
        AuraTag
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2530] hover:text-[#D6B25E] transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/register-bottle"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2530] hover:text-[#D6B25E] transition"
        >
          <PackagePlus size={20} />
          Register Bottle
        </Link>

        <Link
          to="/bottles"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2530] hover:text-[#D6B25E] transition"
        >
          <Package size={20} />
          Bottle List
        </Link>

        <Link
          to="/history"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2530] hover:text-[#D6B25E] transition"
        >
          <History size={20} />
          Verification History
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2530] hover:text-[#D6B25E] transition"
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

      </nav>

      <div className="mt-auto">

        <button
          className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;