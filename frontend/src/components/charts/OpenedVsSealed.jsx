import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function OpenedVsSealed({ data }) {
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        data: data?.data || [],
        backgroundColor: [
          "#F59E0B",
          "#10B981",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="bg-[#161922] rounded-xl p-6 border border-gray-800">
      <h2 className="text-white text-xl font-semibold mb-5">
        Opened vs Sealed
      </h2>

      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default OpenedVsSealed;