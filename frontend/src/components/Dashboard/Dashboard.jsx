import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import StatsCard from "../../components/Dashboard/StatsCard";

function Dashboard() {
  const [company, setCompany] = useState("");
  const [stats, setStats] = useState({
    total_products: 0,
    total_batches: 0,
    total_bottles: 0,
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

    if (storedCompany) setCompany(storedCompany);

    fetch("http://127.0.0.1:5000/api/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
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
    <div className="flex bg-[#0F1117] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome {company || "Manufacturer"} 👋
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor your products, bottles and NFC verification statistics.
          </p>
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatsCard
            title="📦 Products"
            value={stats.total_products.toString()}
          />

          <StatsCard
            title="🏭 Batches"
            value={stats.total_batches.toString()}
          />

          <StatsCard
            title="🍾 Bottles"
            value={stats.total_bottles.toString()}
          />

          <StatsCard
            title="📱 Total Scans"
            value={stats.total_scans.toString()}
          />

          <StatsCard
            title="✅ Genuine Scans"
            value={stats.genuine_scans.toString()}
          />

          <StatsCard
            title="⚠️ Counterfeit Alerts"
            value={stats.counterfeit_scans.toString()}
          />

        </div>

        {/* Tables */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

          {/* Recent Batches */}

          <div className="bg-[#161922] rounded-xl border border-gray-800 p-6">

            <h2 className="text-white text-xl font-semibold mb-5">
              Recent Batches
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#1E2330] text-gray-300 uppercase">

                  <tr>

                    <th className="p-3 text-left">Batch</th>

                    <th className="p-3 text-left">Quantity</th>

                    <th className="p-3 text-left">Manufactured</th>

                  </tr>

                </thead>

                <tbody>

                  {stats.recent_batches.length === 0 ? (

                    <tr>

                      <td
                        colSpan="3"
                        className="text-center p-6 text-gray-500"
                      >
                        No batches available.
                      </td>

                    </tr>

                  ) : (

                    stats.recent_batches.map((batch) => (

                      <tr
                        key={batch.id}
                        className="border-t border-gray-800 hover:bg-[#1E2330]"
                      >

                        <td className="p-3 text-white">
                          {batch.batch_number}
                        </td>

                        <td className="p-3 text-gray-300">
                          {batch.quantity}
                        </td>

                        <td className="p-3 text-gray-300">
                          {batch.manufacture_date}
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Recent Bottles */}

          <div className="bg-[#161922] rounded-xl border border-gray-800 p-6">

            <h2 className="text-white text-xl font-semibold mb-5">
              Recent Bottles
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#1E2330] text-gray-300 uppercase">

                  <tr>

                    <th className="p-3 text-left">Bottle</th>

                    <th className="p-3 text-left">Batch</th>

                    <th className="p-3 text-left">NFC UID</th>

                  </tr>

                </thead>

                <tbody>

                  {stats.recent_bottles.length === 0 ? (

                    <tr>

                      <td
                        colSpan="3"
                        className="text-center p-6 text-gray-500"
                      >
                        No bottles available.
                      </td>

                    </tr>

                  ) : (

                    stats.recent_bottles.map((bottle) => (

                      <tr
                        key={bottle.id}
                        className="border-t border-gray-800 hover:bg-[#1E2330]"
                      >

                        <td className="p-3 text-white">
                          {bottle.bottle_name}
                        </td>

                        <td className="p-3 text-gray-300">
                          {bottle.batch_number}
                        </td>

                        <td className="p-3 text-cyan-400 font-mono text-xs">
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