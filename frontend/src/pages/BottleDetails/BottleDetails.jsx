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
        <div className="grid grid-cols-2 gap-6">

    <div>
        <p className="text-slate-400">Bottle Name</p>
        <h2 className="text-2xl font-semibold">
            {bottle.bottle_name}
        </h2>
    </div>

    <div>
        <p className="text-slate-400">Brand</p>
        <h2 className="text-2xl font-semibold">
            {bottle.brand}
        </h2>
    </div>

    <div>
        <p className="text-slate-400">Batch Number</p>
        <h2 className="text-xl">
            {bottle.batch_number}
        </h2>
    </div>

    <div>
        <p className="text-slate-400">Manufacture Date</p>
        <h2 className="text-xl">
            {new Date(bottle.manufacture_date).toLocaleDateString()}
        </h2>
    </div>

    <div>
        <p className="text-slate-400">Expiry Date</p>
        <h2 className="text-xl">
            {new Date(bottle.expiry_date).toLocaleDateString()}
        </h2>
    </div>

    <div>
        <p className="text-slate-400">NFC UID</p>
        <h2 className="text-sm break-all text-green-400">
            {bottle.nfc_uid}
        </h2>
    </div>

</div>

        {/* 👇 WRITE IT HERE */}
        <div className="mt-8 flex justify-center">
            <QRCodeCard uid={bottle.nfc_uid} />
        </div>

    </div>

);

}

export default BottleDetails;