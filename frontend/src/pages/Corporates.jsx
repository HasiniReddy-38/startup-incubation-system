import { useEffect, useState } from "react";
import api from "../services/api";

function Corporates() {
  const [search, setSearch] = useState("");
  const [corporates, setCorporates] = useState([]);

  useEffect(() => {
    api
      .get("/corporate/all")
      .then((res) => {
        setCorporates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredCorporates = corporates.filter((corporate) =>
    (corporate.organization_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const techCount = corporates.filter(
    (c) =>
      c.industry?.toLowerCase().includes("tech")
  ).length;

  const financeCount = corporates.filter(
    (c) =>
      c.industry?.toLowerCase().includes("fin")
  ).length;

  const healthcareCount = corporates.filter(
    (c) =>
      c.industry?.toLowerCase().includes("health")
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
        🏢 Corporate Innovation Hub
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
            <h6>Total Corporates</h6>
            <h2>{corporates.length}</h2>
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
            <h6>Technology</h6>
            <h2>{techCount}</h2>
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
            <h6>Finance</h6>
            <h2>{financeCount}</h2>
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
            <h6>Healthcare</h6>
            <h2>{healthcareCount}</h2>
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
          Search Corporates
        </h5>

        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search corporate by organization name..."
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
          <h4 style={{ color: "#fff" }}>Corporate Directory</h4>
        </div>

        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Organization</th>
                <th>Industry</th>
                <th>Problem Domain</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>

              {filteredCorporates.length > 0 ? (
                filteredCorporates.map((corporate) => (
                  <tr key={corporate.id}>
                    <td>{corporate.organization_name}</td>
                    <td>{corporate.industry}</td>
                    <td>{corporate.problem_domain}</td>
                    <td>{corporate.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-secondary"
                  >
                    No corporates found
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

export default Corporates;