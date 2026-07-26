import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { getBottles } from "../../services/bottleService";

function BottleList() {
  const [bottles, setBottles] = useState([]);
  const [filteredBottles, setFilteredBottles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBottles = async () => {
    try {
      const data = await getBottles();

      console.log("Bottles:", data);

      setBottles(Array.isArray(data) ? data : []);
      setFilteredBottles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Bottle Error:", error);
      setBottles([]);
      setFilteredBottles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBottles();
  }, []);

  useEffect(() => {
    const filtered = bottles.filter((bottle) => {
      const bottleName = bottle.bottle_name || "";
      const brand = bottle.brand || "";
      const batch = bottle.batch_number || "";
      const uid = bottle.nfc_uid || "";

      return (
        bottleName.toLowerCase().includes(search.toLowerCase()) ||
        brand.toLowerCase().includes(search.toLowerCase()) ||
        batch.toLowerCase().includes(search.toLowerCase()) ||
        uid.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredBottles(filtered);
  }, [search, bottles]);

  return (
    <div className="flex bg-[#0D1117] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-[#D6B25E] mb-8">
          Bottle List
        </h1>

        <input
          type="text"
          placeholder="Search bottles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#161B22] border border-gray-700 mb-6"
        />

        <div className="bg-[#161B22] rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#21262D]">
              <tr>
                <th className="p-4 text-left">Bottle</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Batch</th>
                <th className="p-4 text-left">NFC UID</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              ) : filteredBottles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6">
                    No bottles found
                  </td>
                </tr>
              ) : (
                filteredBottles.map((bottle) => (
                  <tr
                    key={bottle.id}
                    className="border-t border-gray-700 hover:bg-[#1E2530]"
                  >
                    <td className="p-4">{bottle.bottle_name}</td>
                    <td className="p-4">{bottle.brand}</td>
                    <td className="p-4">{bottle.batch_number}</td>
                    <td className="p-4 font-mono text-sm">
                      {bottle.nfc_uid}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default BottleList;