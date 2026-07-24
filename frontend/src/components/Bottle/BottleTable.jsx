function BottleTable({ bottles }) {
    return (
        <table className="w-full text-white mt-8 border-collapse">

            <thead>

                <tr className="bg-[#1A1F2B]">

                    <th className="p-3">Bottle</th>
                    <th className="p-3">Brand</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">UID</th>

                </tr>

            </thead>

            <tbody>

                {bottles.map((bottle) => (

                    <tr
                        key={bottle.id}
                        className="border-b border-slate-700"
                    >

                        <td className="p-3">
                            {bottle.bottle_name}
                        </td>

                        <td className="p-3">
                            {bottle.brand}
                        </td>

                        <td className="p-3">
                            {bottle.batch_number}
                        </td>

                        <td className="p-3">
                            {bottle.nfc_uid}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default BottleTable;