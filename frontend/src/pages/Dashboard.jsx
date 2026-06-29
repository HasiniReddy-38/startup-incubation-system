import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AnalyticsCharts from "../components/AnalyticsCharts";
import WorkflowTracker from "../components/WorkflowTracker";

function Dashboard() {
  const [rankings, setRankings] = useState([]);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    startups: 0,
    investors: 0,
    challenges: 0,
    proposals: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rankRes, matchRes, summaryRes] =
          await Promise.all([
            api.get("/rankings/startups"),
            api.get("/matchmaking/"),
            api.get("/dashboard/summary"),
          ]);

        setRankings(rankRes.data || []);
        setMatches(matchRes.data || []);
        setSummary(summaryRes.data || {});
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const kpiCards = [
    {
      title: "Startups",
      value: summary.startups,
      gradient:
        "linear-gradient(135deg,#667eea,#764ba2)",
    },
    {
      title: "Investors",
      value: summary.investors,
      gradient:
        "linear-gradient(135deg,#11998e,#38ef7d)",
    },
    {
      title: "Challenges",
      value: summary.challenges,
      gradient:
        "linear-gradient(135deg,#f7971e,#ffd200)",
    },
    {
      title: "Proposals",
      value: summary.proposals,
      gradient:
        "linear-gradient(135deg,#ff416c,#ff4b2b)",
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
      <h1 className="fw-bold mb-1">
        Executive Dashboard
      </h1>

      <p className="text-secondary mb-4">
        Complete Overview of Innovation Ecosystem
      </p>

      {loading && (
        <div className="text-secondary mb-3">
          Loading dashboard...
        </div>
      )}

      {/* KPI Cards */}

      <div className="row g-4">

        {kpiCards.map((card, index) => (
          <div
            className="col-lg-3 col-md-6"
            key={index}
          >
            <div
              className="card border-0 shadow text-white p-4"
              style={{
                background: card.gradient,
                borderRadius: "18px",
              }}
            >
              <h6>{card.title}</h6>

              <h2 className="fw-bold">
                {card.value}
              </h2>

              <small>
                Live from backend
              </small>
            </div>
          </div>
        ))}

      </div>

      {/* Rankings + Matches */}

      <div className="row mt-4 g-4">

        <div className="col-lg-6">
          <div
            className="card border-0 shadow"
            style={{
              background: "#151518",
              borderRadius: "18px",
            }}
          >
            <div
              className="card-header border-0"
              style={{
                background: "#151518",
              }}
            >
              <h5 style={{ color: "#fff" }}>
                🏆 Top Ranked Startups
              </h5>
            </div>

            <div className="card-body">

              <table className="table table-dark table-hover">

                <thead>
                  <tr>
                    <th>Startup</th>
                    <th>Score</th>
                  </tr>
                </thead>

                <tbody>

                  {rankings.length > 0 ? (
                    rankings.map(
                      (startup, index) => (
                        <tr key={index}>
                          <td>
                            {startup.company_name}
                          </td>

                          <td>
                            <span className="badge bg-success">
                              {
                                startup.average_score
                              }
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center text-secondary"
                      >
                        No data available
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div
            className="card border-0 shadow"
            style={{
              background: "#151518",
              borderRadius: "18px",
            }}
          >
            <div
              className="card-header border-0"
              style={{
                background: "#151518",
              }}
            >
              <h5 style={{ color: "#fff" }}>
                🤖 Top AI Matches
              </h5>
            </div>

            <div className="card-body">

              <table className="table table-dark table-hover">

                <thead>
                  <tr>
                    <th>Startup</th>
                    <th>Investor</th>
                    <th>Match</th>
                  </tr>
                </thead>

                <tbody>

                  {matches.length > 0 ? (
                    matches
                      .slice(0, 5)
                      .map((m, index) => (
                        <tr key={index}>
                          <td>
                            {m.startup}
                          </td>

                          <td>
                            {m.investor}
                          </td>

                          <td>
                            <div
                              className="progress"
                              style={{
                                height: "20px",
                              }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width:
                                    `${m.match_score}%`,
                                }}
                              >
                                {
                                  m.match_score
                                }
                                %
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-secondary"
                      >
                        No match data available
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          </div>
        </div>

      </div>

      {/* Analytics */}

      <div className="mt-4">
        <AnalyticsCharts />
      </div>
      <WorkflowTracker
  startups={summary.startups}
  challenges={summary.challenges}
  proposals={summary.proposals}
  matches={matches.length}
  funding={summary.investors}
/>

      {/* Quick Actions */}

      <div className="row mt-4">

        <div className="col-lg-12">

          <div
            className="card border-0 shadow"
            style={{
              background: "#151518",
              borderRadius: "18px",
            }}
          >
            <div className="card-body">

              <h5 className="mb-3"  style={{ color: "#fff" }} >
                ⚡ Quick Actions
              </h5>

              <div className="d-flex gap-3 flex-wrap">

  <button
    className="btn btn-primary"
    onClick={() => navigate("/startup-profile")}
  >
    Add Startup
  </button>

  <button
    className="btn btn-success"
    onClick={() => navigate("/investor-profile")}
  >
    Add Investor
  </button>

  <button
    className="btn btn-warning"
    onClick={() => navigate("/create-challenge")}
  >
    Add Challenge
  </button>

  <button
    className="btn btn-info"
    onClick={() => navigate("/review-proposals")}
  >
    Review Proposals
  </button>

</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;