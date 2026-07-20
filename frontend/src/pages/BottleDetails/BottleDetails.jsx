import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBottleById } from "../../services/bottleService";
import QRCodeCard from "../../components/QRCodeCard";
function BottleDetails() {

    const { id } = useParams();

    const [bottle, setBottle] = useState(null);

    useEffect(() => {
        fetchBottle();
    }, []);

    const fetchBottle = async () => {

        try {

            const data = await getBottleById(id);

            setBottle(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!bottle) {

        return (
            <div className="min-h-screen bg-[#0F1117] text-white flex items-center justify-center">
                <h2 className="text-2xl">Loading...</h2>
            </div>
        );

    }

    return (

    <div className="min-h-screen bg-[#0F1117] text-white p-10">

        <h1 className="text-4xl font-bold mb-8 text-[#D6B25E]">
            Bottle Details
        </h1>

        {/* Bottle Details Card */}
        <div className="bg-[#1E2530] rounded-xl p-8 shadow-lg max-w-3xl">

            ...
            ...
            ...

        </div>

        {/* 👇 WRITE IT HERE */}
        <div className="mt-8 flex justify-center">
            <QRCodeCard uid={bottle.nfc_uid} />
        </div>

    </div>

);

}

export default BottleDetails;