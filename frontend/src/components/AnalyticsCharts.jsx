import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#333",
        },
      },

      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#333",
        },
      },
    },
  };

  const fundingData = {
    labels: ["Seed", "Series A", "Series B", "Growth"],
    datasets: [
      {
        label: "Funding (Cr)",
        data: [150, 450, 350, 300],
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#f59e0b",
          "#a855f7",
        ],
      },
    ],
  };

  const sectorData = {
    labels: [
      "FinTech",
      "AI",
      "HealthTech",
      "CyberSecurity",
      "Others",
    ],
    datasets: [
      {
        data: [22, 18, 15, 12, 33],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  const mentorData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "Before Mentorship",
        data: [20, 30, 40, 55, 52, 58],
        borderColor: "#a855f7",
        backgroundColor: "#a855f7",
      },

      {
        label: "After Mentorship",
        data: [50, 65, 72, 95, 92, 88],
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
      },
    ],
  };

  const matchData = {
    labels: ["Successful", "Pending", "Rejected"],

    datasets: [
      {
        data: [65, 25, 10],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="row mt-4 g-4 align-items-stretch">

      {/* Funding Overview */}
      <div className="col-md-6">
        <div
          className="card border-0 h-100"
          style={{
            background: "#151518",
            borderRadius: "18px",
          }}
        >
          <div className="card-body">
            <h5 className="text-white mb-3">
              💰 Funding Overview
            </h5>

            <div style={{ height: "320px" }}>
              <Bar
                data={fundingData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Distribution */}
      <div className="col-md-6">
        <div
          className="card border-0 h-100"
          style={{
            background: "#151518",
            borderRadius: "18px",
          }}
        >
          <div className="card-body">
            <h5 className="text-white mb-3">
              🌍 Ecosystem Distribution
            </h5>

            <div style={{ height: "320px" }}>
              <Doughnut
                data={sectorData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: "white",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Impact */}
      <div className="col-md-6">
        <div
          className="card border-0 h-100"
          style={{
            background: "#151518",
            borderRadius: "18px",
          }}
        >
          <div className="card-body">
            <h5 className="text-white mb-3">
              🎓 Mentor Impact
            </h5>

            <div style={{ height: "320px" }}>
              <Line
                data={mentorData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Match Distribution */}
      <div className="col-md-6">
        <div
          className="card border-0 h-100"
          style={{
            background: "#151518",
            borderRadius: "18px",
          }}
        >
          <div className="card-body">
            <h5 className="text-white mb-3">
              🤖 AI Match Distribution
            </h5>

            <div style={{ height: "320px" }}>
              <Pie
                data={matchData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: "white",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AnalyticsCharts;