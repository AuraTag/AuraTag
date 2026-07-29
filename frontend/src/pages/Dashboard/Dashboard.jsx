import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import StatsCard from "../../components/Dashboard/StatsCard";
import { getDashboard } from "../../services/dashboardService";

import VerificationTrend from "../../components/charts/VerificationTrend";
import OpenedVsSealed from "../../components/charts/OpenedVsSealed";
import BrandDistribution from "../../components/charts/BrandDistribution";

function Dashboard() {

  const [company, setCompany] = useState("");

  const [stats, setStats] = useState({
    total_products: 0,
    total_batches: 0,
    total_bottles: 0,

    opened_bottles: 0,
    verified_bottles: 0,
    total_verifications: 0,

    total_scans: 0,
    genuine_scans: 0,
    counterfeit_scans: 0,

    verification_trend: {
      labels: [],
      data: [],
    },

    opened_vs_sealed: {
      labels: [],
      data: [],
    },

    brand_distribution: {
      labels: [],
      data: [],
    },

    recent_batches: [],
    recent_bottles: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const storedCompany = localStorage.getItem("company_name");

        if (storedCompany) {
          setCompany(storedCompany);
        }

        const data = await getDashboard();

        setStats(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

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
            Real-time product authentication and verification analytics.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

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
            title="✅ Verified Bottles"
            value={stats.verified_bottles.toString()}
          />

          <StatsCard
            title="🟠 Opened Bottles"
            value={stats.opened_bottles.toString()}
          />

          <StatsCard
            title="📱 Total Verifications"
            value={stats.total_verifications.toString()}
          />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

          <VerificationTrend
            data={stats.verification_trend}
          />

          <OpenedVsSealed
            data={stats.opened_vs_sealed}
          />

        </div>

        <div className="mt-8">

          <BrandDistribution
            data={stats.brand_distribution}
          />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
                    {/* Recent Batches */}
          <div className="bg-[#161922] border border-gray-800 rounded-xl p-6">

            <h2 className="text-xl font-semibold text-white mb-5">
              Recent Batches
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#1F2330] text-gray-300 uppercase">

                  <tr>

                    <th className="p-3 text-left">
                      Batch
                    </th>

                    <th className="p-3 text-left">
                      Quantity
                    </th>

                    <th className="p-3 text-left">
                      Manufactured
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {stats.recent_batches.length === 0 ? (

                    <tr>

                      <td
                        colSpan="3"
                        className="text-center text-gray-500 p-6"
                      >
                        No recent batches found.
                      </td>

                    </tr>

                  ) : (

                    stats.recent_batches.map((batch) => (

                      <tr
                        key={batch.id}
                        className="border-t border-gray-800 hover:bg-[#1F2330]"
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

          <div className="bg-[#161922] border border-gray-800 rounded-xl p-6">

            <h2 className="text-xl font-semibold text-white mb-5">
              Recent Bottles
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#1F2330] text-gray-300 uppercase">

                  <tr>

                    <th className="p-3 text-left">
                      Bottle
                    </th>

                    <th className="p-3 text-left">
                      Batch
                    </th>

                    <th className="p-3 text-left">
                      NFC UID
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {stats.recent_bottles.length === 0 ? (

                    <tr>

                      <td
                        colSpan="3"
                        className="text-center text-gray-500 p-6"
                      >
                        No recent bottles found.
                      </td>

                    </tr>

                  ) : (

                    stats.recent_bottles.map((bottle) => (

                      <tr
                        key={bottle.id}
                        className="border-t border-gray-800 hover:bg-[#1F2330]"
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
        