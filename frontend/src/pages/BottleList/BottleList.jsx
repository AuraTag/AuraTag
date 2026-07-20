import { useEffect, useState } from "react";
import { getBottles } from "../../services/bottleService";
import { useNavigate } from "react-router-dom";
function BottleList() {

    const [bottles, setBottles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchBottles();

    }, []);

    const fetchBottles = async () => {

        try {

            const data = await getBottles();

            setBottles(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-[#0F1117] text-white p-10">

            <h1 className="text-4xl font-bold mb-8">

                Bottle List

            </h1>

            <table className="w-full border-collapse">

                <thead>
    <tr className="bg-[#1E2530]">

        <th className="p-4 text-left">Bottle Name</th>
        <th className="p-4 text-left">Brand</th>
        <th className="p-4 text-left">Batch</th>
        <th className="p-4 text-left">NFC UID</th>
        <th className="p-4 text-left">Actions</th>

    </tr>
</thead>

                <tbody>

                    {bottles.map((bottle) => (

                        <tr
    key={bottle.id}
    className="border-b border-gray-700"
>

    <td className="p-4">{bottle.bottle_name}</td>

    <td className="p-4">{bottle.brand}</td>

    <td className="p-4">{bottle.batch_number}</td>

    <td className="p-4">{bottle.nfc_uid}</td>

    <td className="p-4">
        <button
    onClick={() => navigate(`/bottles/${bottle.id}`)}
    className="bg-[#D6B25E] text-black px-4 py-2 rounded hover:bg-[#E5C97A]"
>
    View
</button>
    </td>

</tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default BottleList;