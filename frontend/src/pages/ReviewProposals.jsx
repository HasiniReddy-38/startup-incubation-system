import { useEffect, useState } from "react";
import api from "../services/api";

function ReviewProposals() {
  const [proposals, setProposals] = useState([]);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    api
      .get("/proposal/")
      .then((res) => {
        setProposals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateStatus = (id, status) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const approvedCount = Object.values(statuses).filter(
    (s) => s === "Approved"
  ).length;

  const reviewCount = Object.values(statuses).filter(
    (s) => s === "Under Review"
  ).length;

  const rejectedCount = Object.values(statuses).filter(
    (s) => s === "Rejected"
  ).length;

  const pendingCount =
    proposals.length -
    approvedCount -
    reviewCount -
    rejectedCount;

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-2">
        ⚖️ Jury Review Center
      </h2>

      <p className="text-secondary mb-4">
        Evaluate startup proposals and track approval decisions
      </p>

      {/* KPI CARDS */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div
            className="card border-0 p-3 text-white"
            style={{
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
              borderRadius: "18px",
            }}
          >
            <h6>Total Proposals</h6>
            <h2>{proposals.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 p-3 text-white"
            style={{
              background:
                "linear-gradient(135deg,#11998e,#38ef7d)",
              borderRadius: "18px",
            }}
          >
            <h6>Approved</h6>
            <h2>{approvedCount}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 p-3 text-white"
            style={{
              background:
                "linear-gradient(135deg,#f7971e,#ffd200)",
              borderRadius: "18px",
            }}
          >
            <h6>Under Review</h6>
            <h2>{reviewCount}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 p-3 text-white"
            style={{
              background:
                "linear-gradient(135deg,#ff416c,#ff4b2b)",
              borderRadius: "18px",
            }}
          >
            <h6>Pending</h6>
            <h2>{pendingCount}</h2>
          </div>
        </div>

      </div>

      {/* REVIEW SUMMARY */}

      <div
        className="card border-0 shadow mb-4"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">

          <h5 style={{ color: "#fff" }}>
            📊 Review Progress
          </h5>

          <div
            className="progress mt-3"
            style={{ height: "25px" }}
          >
            <div
              className="progress-bar bg-success"
              style={{
                width: `${
                  proposals.length
                    ? (approvedCount /
                        proposals.length) *
                      100
                    : 0
                }%`,
              }}
            >
              Approved
            </div>

            <div
              className="progress-bar bg-warning"
              style={{
                width: `${
                  proposals.length
                    ? (reviewCount /
                        proposals.length) *
                      100
                    : 0
                }%`,
              }}
            >
              Review
            </div>

            <div
              className="progress-bar bg-danger"
              style={{
                width: `${
                  proposals.length
                    ? (rejectedCount /
                        proposals.length) *
                      100
                    : 0
                }%`,
              }}
            >
              Rejected
            </div>
          </div>

        </div>
      </div>

      {/* PROPOSALS TABLE */}

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-header border-0 bg-transparent">
          <h4 style={{ color: "#fff" }}>
            Submitted Proposals
          </h4>
        </div>

        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>ID</th>
                <th>Challenge</th>
                <th>Startup</th>
                <th>GitHub</th>
                <th>Pitch Deck</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {proposals.length > 0 ? (
                proposals.map((proposal) => (
                  <tr key={proposal.id}>

                    <td>{proposal.id}</td>

                    <td>{proposal.challenge_id}</td>

                    <td>{proposal.startup_id}</td>

                    <td>
                      <a
                        href={proposal.github_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </td>

                    <td>
                      <a
                        href={proposal.pitch_deck_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Deck
                      </a>
                    </td>

                    <td>

                      {statuses[proposal.id] ? (
                        <span
                          className={`badge ${
                            statuses[proposal.id] ===
                            "Approved"
                              ? "bg-success"
                              : statuses[proposal.id] ===
                                "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {statuses[proposal.id]}
                        </span>
                      ) : (
                        <span className="badge bg-secondary">
                          Pending
                        </span>
                      )}

                    </td>

                    <td>

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          updateStatus(
                            proposal.id,
                            "Approved"
                          )
                        }
                      >
                        ✓
                      </button>

                      <button
                        className="btn btn-warning btn-sm ms-2"
                        onClick={() =>
                          updateStatus(
                            proposal.id,
                            "Under Review"
                          )
                        }
                      >
                        👀
                      </button>

                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() =>
                          updateStatus(
                            proposal.id,
                            "Rejected"
                          )
                        }
                      >
                        ✕
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-secondary"
                  >
                    No proposals submitted yet
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

export default ReviewProposals;