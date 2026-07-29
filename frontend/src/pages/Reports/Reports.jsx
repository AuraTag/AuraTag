import Sidebar from "../../components/Dashboard/Sidebar";
import { downloadInventoryPDF } from "../../services/reportService";

export default function Reports() {
  return (
    <div className="flex bg-[#0F1117] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl text-white font-bold mb-8">
          Reports
        </h1>

        <div className="bg-[#161922] border border-gray-800 rounded-xl p-8">

          <h2 className="text-2xl text-white mb-4">
            📦 Inventory Report
          </h2>

          <p className="text-gray-400 mb-6">
            Download the current bottle inventory as a PDF.
          </p>

          <button
            onClick={downloadInventoryPDF}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Download PDF
          </button>

        </div>

      </main>
    </div>
  );
}