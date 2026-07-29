import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function VerificationTrend({ data }) {
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: "Verifications",
        data: data?.data || [],
        borderColor: "#D4AF37",
        backgroundColor: "rgba(212,175,55,0.2)",
        tension: 0.4,
        fill: true,
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
        Verification Trend
      </h2>

      <Line data={chartData} options={options} />
    </div>
  );
}

export default VerificationTrend;