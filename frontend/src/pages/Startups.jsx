import { useEffect, useState } from "react";
import api from "../services/api";

function Startups() {
  const [search, setSearch] = useState("");
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    api
      .get("/startup/all")
      .then((res) => {
        setStartups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredStartups = startups.filter((startup) =>
    (startup.company_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const seedCount = startups.filter(
    (s) => s.stage?.toLowerCase() === "seed"
  ).length;

  const growthCount = startups.filter(
    (s) =>
      s.stage?.toLowerCase().includes("series")
  ).length;

  const aiCount = startups.filter(
    (s) =>
      s.industry?.toLowerCase().includes("ai") ||
      s.industry?.toLowerCase().includes("artificial")
  ).length;

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        🚀 Startup Management
      </h2>

      {/* KPI CARDS */}
      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div
            className="card border-0 text-white p-3"
            style={{
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
              borderRadius: "18px",
            }}
          >
            <h6>Total Startups</h6>
            <h2>{startups.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 text-white p-3"
            style={{
              background:
                "linear-gradient(135deg,#11998e,#38ef7d)",
              borderRadius: "18px",
            }}
          >
            <h6>AI Startups</h6>
            <h2>{aiCount}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 text-white p-3"
            style={{
              background:
                "linear-gradient(135deg,#f7971e,#ffd200)",
              borderRadius: "18px",
            }}
          >
            <h6>Seed Stage</h6>
            <h2>{seedCount}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 text-white p-3"
            style={{
              background:
                "linear-gradient(135deg,#ff416c,#ff4b2b)",
              borderRadius: "18px",
            }}
          >
            <h6>Growth Stage</h6>
            <h2>{growthCount}</h2>
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
          Search Startups
        </h5>

        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search startup by company name..."
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
          <h4 style={{ color: "#fff" }}>Startup Directory</h4>
        </div>

        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>Stage</th>
                <th>Funding Required</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>

              {filteredStartups.length > 0 ? (
                filteredStartups.map((startup) => (
                  <tr key={startup.id}>
                    <td>{startup.company_name}</td>
                    <td>{startup.industry}</td>
                    <td>{startup.stage}</td>
                    <td>{startup.funding_required}</td>
                    <td>{startup.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-secondary"
                  >
                    No startups found
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

export default Startups;