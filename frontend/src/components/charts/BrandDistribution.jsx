import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BrandDistribution({ data }) {
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: "Bottles",
        data: data?.data || [],
        backgroundColor: "#D4AF37",
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
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="bg-[#161922] rounded-xl p-6 border border-gray-800">
      <h2 className="text-white text-xl font-semibold mb-5">
        Brand Distribution
      </h2>

      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BrandDistribution;