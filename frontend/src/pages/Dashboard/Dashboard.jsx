cimport { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";
import BottleTable from "../../components/Bottle/BottleTable";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboard();

            setDashboard(data);

        } catch (err) {

            console.error(err);

        }

    };

    if (!dashboard) {

        return (
            <div className="text-white p-10">
                Loading Dashboard...
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-[#0F1117] text-white p-10">

            <h1 className="text-4xl font-bold mb-10">
                AuraTag Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6 mb-10">

                <div className="bg-[#1A1F2B] rounded-xl p-6">

                    <h2>Total Bottles</h2>

                    <p className="text-5xl font-bold mt-4">
                        {dashboard.total_bottles}
                    </p>

                </div>

                <div className="bg-[#1A1F2B] rounded-xl p-6">

                    <h2>Total Scans</h2>

                    <p className="text-5xl font-bold mt-4">
                        {dashboard.total_scans}
                    </p>

                </div>

                <div className="bg-[#1A1F2B] rounded-xl p-6">

                    <h2>Genuine Scans</h2>

                    <p className="text-5xl font-bold mt-4 text-green-400">
                        {dashboard.genuine_scans}
                    </p>

                </div>

                <div className="bg-[#1A1F2B] rounded-xl p-6">

                    <h2>Counterfeit</h2>

                    <p className="text-5xl font-bold mt-4 text-red-400">
                        {dashboard.counterfeit_scans}
                    </p>

                </div>

            </div>

            <BottleTable bottles={dashboard.recent_bottles} />

        </div>

    );

}

export default Dashboard;