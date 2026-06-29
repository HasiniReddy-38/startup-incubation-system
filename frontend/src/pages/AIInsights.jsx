import { useEffect, useState } from "react";
import api from "../services/api";

function AIInsights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/ai-insights/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!data) {
    return (
      <div
        className="container-fluid p-4 text-white"
        style={{
          background: "#0f0f11",
          minHeight: "100vh",
        }}
      >
        Loading AI Insights...
      </div>
    );
  }

  const insights = [
    {
      title: "Top Funding Sector",
      value: data.top_funding_sector,
      icon: "💰",
    },
    {
      title: "Highest Investor Interest",
      value: data.highest_investor_interest,
      icon: "📈",
    },
    {
      title: "Fastest Growing Domain",
      value: data.fastest_growing_domain,
      icon: "🚀",
    },
    {
      title: "Recommended Challenge",
      value: data.recommended_challenge,
      icon: "🎯",
    },
  ];

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-2">
        🤖 AI Insights & Recommendations
      </h2>

      <p className="text-secondary mb-4">
        Live ecosystem intelligence powered by FastAPI
      </p>

      <div className="row g-4 mb-4">

        {insights.map((item, index) => (
          <div
            className="col-lg-3 col-md-6"
            key={index}
          >
            <div
              className="card border-0 shadow h-100"
              style={{
                background: "#151518",
                borderRadius: "18px",
              }}
            >
              <div className="card-body">

                <h2>{item.icon}</h2>

                <h6
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                  }}
                >
                  {item.title}
                </h6>

                <h5
                  style={{
                    color: "#38bdf8",
                    fontWeight: "700",
                  }}
                >
                  {item.value}
                </h5>

              </div>
            </div>
          </div>
        ))}

      </div>

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">

          <h4
            className="mb-3"
            style={{
              color: "#fff",
            }}
          >
            🌍 Ecosystem Health Score
          </h4>

          <div
            className="progress mb-3"
            style={{
              height: "30px",
            }}
          >
            <div
              className="progress-bar bg-success"
              style={{
                width: `${data.ecosystem_score}%`,
              }}
            >
              {data.ecosystem_score}%
            </div>
          </div>

          <p className="text-secondary">
            Overall ecosystem performance calculated from
            startups, investors, challenges and proposals.
          </p>

        </div>
      </div>

    </div>
  );
}

export default AIInsights;