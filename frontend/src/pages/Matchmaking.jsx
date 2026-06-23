import { useEffect, useState } from "react";
import api from "../services/api";

function Matchmaking() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/matchmaking")
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredMatches = matches.filter(
    (match) =>
      match.startup.toLowerCase().includes(search.toLowerCase()) ||
      match.investor.toLowerCase().includes(search.toLowerCase())
  );

  const getBadge = (score) => {
    if (score >= 80)
      return (
        <span className="badge bg-success px-3 py-2">
          Excellent Match
        </span>
      );

    if (score >= 50)
      return (
        <span className="badge bg-warning text-dark px-3 py-2">
          Good Match
        </span>
      );

    return (
      <span className="badge bg-danger px-3 py-2">
        Weak Match
      </span>
    );
  };

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <style>
        {`
          .search-input {
            background: #0f172a !important;
            color: white !important;
            border: 1px solid #334155 !important;
          }

          .search-input::placeholder {
            color: #cbd5e1 !important;
            opacity: 1;
          }

          .search-input:focus {
            background: #0f172a !important;
            color: white !important;
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 0.2rem rgba(59,130,246,0.25) !important;
          }
        `}
      </style>

      <h1 className="fw-bold mb-4">
        🤖 AI Matchmaking Engine
      </h1>

      {/* SEARCH */}
      <div
        className="card border-0 shadow mb-4"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search Startup or Investor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
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
          <h4 className="mb-0"
           style={{
    color: "white",
    fontWeight: "600",
  }}>
            Investor ↔ Startup AI Recommendations
          </h4>
        </div>

        <div className="card-body">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Startup</th>
                <th>Investor</th>
                <th width="220">Match Score</th>
                <th>AI Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{match.startup}</strong>
                    </td>

                    <td>{match.investor}</td>

                    <td>
                      <div
                        className="progress"
                        style={{
                          height: "24px",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          className={`progress-bar ${
                            match.match_score >= 80
                              ? "bg-success"
                              : match.match_score >= 50
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                          style={{
                            width: `${match.match_score}%`,
                          }}
                        >
                          {match.match_score}%
                        </div>
                      </div>
                    </td>

                    <td>
                      <span style={{ color: "#cbd5e1" }}>
                        {match.reason}
                      </span>
                    </td>

                    <td>{getBadge(match.match_score)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-secondary"
                  >
                    No matchmaking results found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Matchmaking;