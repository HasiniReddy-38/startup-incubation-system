import { useEffect, useState } from "react";
import api from "../services/api";

function Challenges() {
  const [search, setSearch] = useState("");
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api
      .get("/challenge/")
      .then((res) => {
        setChallenges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredChallenges = challenges.filter((challenge) =>
    (challenge.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const uniqueDomains = new Set(
    challenges.map((c) => c.domain)
  ).size;

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      
      <div className="d-flex justify-content-between align-items-center mb-4">
  <h2 className="fw-bold" style={{ color: "#fff" }}>
    📋 Innovation Challenges Marketplace
  </h2>

  <a
    href="/create-challenge"
    className="btn btn-primary"
  >
    + Post Challenge
  </a>
  <a
  href="/create-proposal"
  className="btn btn-success ms-2"
>
  Submit Proposal
</a>
</div>

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
            <h6>Total Challenges</h6>
            <h2>{challenges.length}</h2>
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
            <h6>Domains</h6>
            <h2>{uniqueDomains}</h2>
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
            <h6>Rewards Offered</h6>
            <h2>{challenges.length}</h2>
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
            <h6>Corporate Sponsors</h6>
            <h2>
              {
                new Set(
                  challenges.map(
                    (c) => c.corporate_id
                  )
                ).size
              }
            </h2>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div
        className="card border-0 shadow p-4 mb-4"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <h5 className="mb-3" style={{ color: "#fff" }}>
          Search Challenges
        </h5>

        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search challenge title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-header border-0 bg-transparent">
          <h4 style={{ color: "#fff" }}> Innovation Challenges Directory</h4>
        </div>

        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Title</th>
                <th>Domain</th>
                <th>Reward</th>
                <th>Corporate ID</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>

              {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => (
                  <tr key={challenge.id}>
                    <td>{challenge.title}</td>

                    <td>
                      <span className="badge bg-info">
                        {challenge.domain}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-success">
                        ₹ {challenge.reward}
                      </span>
                    </td>

                    <td>{challenge.corporate_id}</td>

                    <td
                      style={{
                        maxWidth: "400px",
                      }}
                    >
                      {challenge.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-secondary"
                  >
                    No challenges found
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

export default Challenges;