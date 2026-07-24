import { useEffect, useState } from "react";
import { getAllBottles } from "../../services/bottleService";
import BottleTable from "../../components/Bottle/BottleTable";

function Dashboard() {

    const [bottles, setBottles] = useState([]);

    useEffect(() => {

        fetchBottles();

    }, []);

    const fetchBottles = async () => {

        try {

            const data = await getAllBottles();

            setBottles(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="min-h-screen bg-[#0F1117] text-white p-10">

            <h1 className="text-4xl font-bold mb-8">
                Manufacturer Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-[#1A1F2B] p-6 rounded-xl">

                    <h2 className="text-xl font-semibold">
                        Total Bottles
                    </h2>

                    <p className="text-4xl mt-4">
                        {bottles.length}
                    </p>

                </div>

                <div className="bg-[#1A1F2B] p-6 rounded-xl">

                    <h2 className="text-xl font-semibold">
                        Verified Bottles
                    </h2>

                    <p className="text-4xl mt-4">
                        {bottles.length}
                    </p>

                </div>

                <div className="bg-[#1A1F2B] p-6 rounded-xl">

                    <h2 className="text-xl font-semibold">
                        Tampered Bottles
                    </h2>

                    <p className="text-4xl mt-4">
                        0
                    </p>

                </div>

            </div>

            <BottleTable bottles={bottles} />

        </div>

    );
}

export default Dashboard;