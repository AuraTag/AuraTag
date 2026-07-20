import Sidebar from "../../components/Dashboard/Sidebar";
import StatsCard from "../../components/Dashboard/StatsCard";

function Dashboard() {

  const company = localStorage.getItem("company_name");

  return (

    <div className="flex bg-[#0F1117] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-white">
          Welcome {company}
        </h1>

        <div className="grid grid-cols-3 gap-6 mt-10">

          <StatsCard
            title="Total Bottles"
            value="0"
          />

          <StatsCard
            title="Verified Today"
            value="0"
          />

          <StatsCard
            title="Counterfeit Alerts"
            value="0"
          />

        </div>

      </main>

    </div>

  );

}

export default Dashboard;