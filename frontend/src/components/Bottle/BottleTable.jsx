import { useNavigate } from "react-router-dom";

function BottleTable({ bottles }) {

    const navigate = useNavigate();

    return (

        <table className="w-full text-white mt-8 border-collapse">

            <thead>

                <tr className="bg-[#1A1F2B]">

                    <th className="p-4 text-left">Bottle</th>
                    <th className="p-4 text-left">Brand</th>
                    <th className="p-4 text-left">Batch</th>
                    <th className="p-4 text-left">NFC UID</th>

                </tr>

            </thead>

            <tbody>

                {bottles.map((bottle) => (

                    <tr
                        key={bottle.id}
                        onClick={() => navigate(`/bottles/${bottle.id}`)}
                        className="border-b border-slate-700 cursor-pointer hover:bg-[#1E2530] transition"
                    >

                        <td className="p-4">
                            {bottle.bottle_name}
                        </td>

                        <td className="p-4">
                            {bottle.brand}
                        </td>

                        <td className="p-4">
                            {bottle.batch_number}
                        </td>

                        <td className="p-4">
                            {bottle.nfc_uid}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default BottleTable;