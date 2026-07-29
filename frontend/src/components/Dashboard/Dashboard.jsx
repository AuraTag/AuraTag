import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import StatsCard from "../../components/Dashboard/StatsCard";

function Dashboard() {
  const [company, setCompany] = useState("");

  const [stats, setStats] = useState({
    total_products: 0,
    total_batches: 0,
    total_bottles: 0,

    verified_bottles: 0,
    opened_bottles: 0,
    total_verifications: 0,

    total_scans: 0,
    genuine_scans: 0,
    counterfeit_scans: 0,

    recent_batches: [],
    recent_bottles: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCompany = localStorage.getItem("company_name");
    const token = localStorage.getItem("token");

    if (storedCompany) {
      setCompany(storedCompany);
    }

    fetch("http://127.0.0.1:5000/api/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard");
        }

        return res.json();
      })

      .then((data) => {
        setStats(data);
        setLoading(false);
      })

      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F1117] text-white text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0F1117]">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
      {/* ================= HERO SECTION ================= */}

<div className="relative mb-8 overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-r from-[#1B2230] via-[#111827] to-[#0F172A] p-8">

  {/* Background Glow */}
  <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"></div>
  <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl"></div>

  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

    {/* Left Section */}

    <div>

      <p className="uppercase tracking-[0.35em] text-yellow-400 text-sm font-semibold">
        AuraTag Enterprise
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">
        Dashboard
      </h1>

      <h2 className="mt-3 text-3xl font-bold text-cyan-400">
        Welcome, {company || "Manufacturer"} 👋
      </h2>

      <p className="mt-6 max-w-2xl text-gray-400 leading-7">
        Manage products, batches and NFC-enabled bottles from one
        centralized dashboard. Track authentication activity and
        monitor counterfeit alerts in real time.
      </p>

    </div>

    {/* Right Section */}

    <div className="grid grid-cols-2 gap-5">

      <div className="rounded-2xl border border-gray-700 bg-white/5 p-5">
        <p className="text-sm text-gray-400">
          Products
        </p>

        <h2 className="mt-2 text-4xl font-bold text-cyan-400">
          {stats.total_products}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-white/5 p-5">
        <p className="text-sm text-gray-400">
          Bottles
        </p>

        <h2 className="mt-2 text-4xl font-bold text-yellow-400">
          {stats.total_bottles}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-white/5 p-5">
        <p className="text-sm text-gray-400">
          Total Scans
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-400">
          {stats.total_scans}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-white/5 p-5">
        <p className="text-sm text-gray-400">
          Counterfeit Alerts
        </p>

        <h2 className="mt-2 text-4xl font-bold text-red-400">
          {stats.counterfeit_scans}
        </h2>
      </div>

    </div>

  </div>

</div>  
{/* ================= QUICK ACTIONS ================= */}

<div className="mb-8 rounded-3xl border border-gray-800 bg-[#161922] p-6">

  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <p className="text-gray-400 mt-1">
        Frequently used actions for managing your inventory.
      </p>
    </div>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

    <button
      className="group rounded-2xl border border-cyan-500/30 bg-[#1B2230] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-cyan-500/10"
    >
      <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
        📦
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">
        Add Product
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Register a new product.
      </p>
    </button>

    <button
      className="group rounded-2xl border border-purple-500/30 bg-[#1B2230] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-purple-400 hover:bg-purple-500/10"
    >
      <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
        🏭
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">
        Create Batch
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Generate a manufacturing batch.
      </p>
    </button>

    <button
      className="group rounded-2xl border border-yellow-500/30 bg-[#1B2230] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-yellow-500/10"
    >
      <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
        🍾
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">
        Register Bottle
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Link NFC bottles to a batch.
      </p>
    </button>

    <button
      className="group rounded-2xl border border-green-500/30 bg-[#1B2230] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-400 hover:bg-green-500/10"
    >
      <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
        📄
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">
        Reports
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Download inventory reports.
      </p>
    </button>

  </div>

</div>

{/* ================= KPI CARDS ================= */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
<StatsCard
  title="Products"
  value={stats.total_products}
  icon="📦"
  color="border-cyan-500"
/>

<StatsCard
  title="Batches"
  value={stats.total_batches}
  icon="🏭"
  color="border-purple-500"
/>

<StatsCard
  title="Bottles"
  value={stats.total_bottles}
  icon="🍾"
  color="border-yellow-500"
/>

<StatsCard
  title="Verified Bottles"
  value={stats.verified_bottles}
  icon="✅"
  color="border-green-500"
/>

<StatsCard
  title="Opened Bottles"
  value={stats.opened_bottles}
  icon="🔓"
  color="border-orange-500"
/>

<StatsCard
  title="Verifications"
  value={stats.total_verifications}
  icon="📱"
  color="border-pink-500"
/>

<StatsCard
  title="Total Scans"
  value={stats.total_scans}
  icon="📊"
  color="border-blue-500"
/>

<StatsCard
  title="Genuine Scans"
  value={stats.genuine_scans}
  icon="🛡️"
  color="border-emerald-500"
/>

<StatsCard
  title="Counterfeit Alerts"
  value={stats.counterfeit_scans}
  icon="🚨"
  color="border-red-500"
/>

</div>

{/* ================= TABLES ================= */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
{/* ================= RECENT BATCHES ================= */}

<div className="rounded-3xl border border-gray-800 bg-[#161922] p-6">

  <div className="mb-6 flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold text-white">
        Recent Batches
      </h2>

      <p className="mt-1 text-gray-400">
        Latest manufacturing batches.
      </p>
    </div>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr className="border-b border-gray-700 text-left text-gray-400">

          <th className="pb-4">Batch</th>

          <th className="pb-4">Quantity</th>

          <th className="pb-4">Manufactured</th>

        </tr>

      </thead>

      <tbody>

        {stats.recent_batches.length === 0 ? (

          <tr>

            <td
              colSpan="3"
              className="py-8 text-center text-gray-500"
            >
              No batches available.
            </td>

          </tr>

        ) : (

          stats.recent_batches.map((batch) => (

            <tr
              key={batch.id}
              className="border-b border-gray-800 transition hover:bg-[#1F2330]"
            >

              <td className="py-4 font-semibold text-white">
                {batch.batch_number}
              </td>

              <td className="py-4 text-gray-300">
                {batch.quantity}
              </td>

              <td className="py-4 text-gray-300">
                {batch.manufacture_date}
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>  
{/* ================= RECENT BOTTLES ================= */}

<div className="rounded-3xl border border-gray-800 bg-[#161922] p-6">

  <div className="mb-6">
    <h2 className="text-2xl font-bold text-white">
      Recent Bottles
    </h2>

    <p className="mt-1 text-gray-400">
      Latest NFC bottles registered.
    </p>
  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr className="border-b border-gray-700 text-left text-gray-400">

          <th className="pb-4">Bottle</th>

          <th className="pb-4">Batch</th>

          <th className="pb-4">NFC UID</th>

        </tr>

      </thead>

      <tbody>

        {stats.recent_bottles.length === 0 ? (

          <tr>

            <td
              colSpan="3"
              className="py-8 text-center text-gray-500"
            >
              No bottles available.
            </td>

          </tr>

        ) : (

          stats.recent_bottles.map((bottle) => (

            <tr
              key={bottle.id}
              className="border-b border-gray-800 transition hover:bg-[#1F2330]"
            >

              <td className="py-4 font-semibold text-white">
                {bottle.bottle_name}
              </td>

              <td className="py-4 text-gray-300">
                {bottle.batch_number}
              </td>

              <td className="py-4 text-cyan-400 font-mono text-sm">
                {bottle.nfc_uid}
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>
</div>

</main>

</div>

  );
}

export default Dashboard;