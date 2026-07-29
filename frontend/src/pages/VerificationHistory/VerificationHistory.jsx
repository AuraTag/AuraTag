import { useEffect, useState } from "react";
import { getVerificationLogs } from "../../services/verificationLogService";

function VerificationHistory() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
    try {
        const data = await getVerificationLogs();

console.log("API Response:", data);
console.log("Type:", typeof data);
console.log("Is Array:", Array.isArray(data));

setLogs(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};

    if (loading) {
        return (
            <h2 className="text-center text-2xl mt-10">
                Loading...
            </h2>
        );
    }

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Verification History
            </h1>

            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="border p-3">Bottle</th>

                        <th className="border p-3">Brand</th>

                        <th className="border p-3">Batch</th>

                        <th className="border p-3">Status</th>

                        <th className="border p-3">Verified At</th>

                    </tr>

                </thead>

                <tbody>

                    {logs.map((log) => (

                        <tr key={log.id}>

                            <td className="border p-2">
                                {log.bottle_name}
                            </td>

                            <td className="border p-2">
                                {log.brand}
                            </td>

                            <td className="border p-2">
                                {log.batch_number}
                            </td>

                            <td className="border p-2">

                                {log.status === "Opened"
                                    ? "🟠 Opened"
                                    : "🟢 Sealed"}

                            </td>

                            <td className="border p-2">
                                {log.verified_at}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default VerificationHistory;