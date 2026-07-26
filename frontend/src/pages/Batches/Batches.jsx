import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { getBatches } from "../../services/batchService";
import BatchModal from "../../components/Batch/BatchModal";

function Batches() {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadBatches = async () => {
    try {
      const data = await getBatches();
      setBatches(data);
      setFilteredBatches(data);
    } catch (err) {
      console.error("Failed to load batches", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  useEffect(() => {
    const filtered = batches.filter((batch) =>
      batch.batch_number.toLowerCase().includes(search.toLowerCase()) ||
      batch.product_name.toLowerCase().includes(search.toLowerCase()) ||
      batch.brand.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredBatches(filtered);
  }, [search, batches]);

  return (
    <div className="flex bg-[#0D1117] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#D6B25E]">
            Batch Management
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#D6B25E] text-black px-5 py-2 rounded-lg hover:opacity-90"
          >
            + Generate Batch
          </button>
        </div>

        <input
          type="text"
          placeholder="Search batches..."
          className="w-full p-3 rounded-lg bg-[#161B22] border border-gray-700 mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-[#161B22] rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#21262D]">
              <tr>
                <th className="p-4 text-left">Batch</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Manufacture Date</th>
                <th className="p-4 text-left">Expiry Date</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredBatches.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6"
                  >
                    No batches found
                  </td>
                </tr>
              ) : (
                filteredBatches.map((batch) => (
                  <tr
                    key={batch.id}
                    className="border-t border-gray-700 hover:bg-[#1E2530]"
                  >
                    <td className="p-4">{batch.batch_number}</td>
                    <td className="p-4">{batch.product_name}</td>
                    <td className="p-4">{batch.brand}</td>
                    <td className="p-4">{batch.quantity}</td>
                    <td className="p-4">{batch.manufacture_date}</td>
                    <td className="p-4">{batch.expiry_date}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {showModal && (
          <BatchModal
            onClose={() => setShowModal(false)}
            onSuccess={loadBatches}
          />
        )}

      </div>
    </div>
  );
}

export default Batches;