import { useEffect, useState } from "react";
import api from "../services/api";

function Jury() {
  const [search, setSearch] = useState("");
  const [juryMembers, setJuryMembers] = useState([]);

  useEffect(() => {
    api
      .get("/jury/all")
      .then((res) => {
        setJuryMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredJury = juryMembers.filter((member) =>
    (member.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const avgExperience =
    juryMembers.length > 0
      ? (
          juryMembers.reduce(
            (sum, member) =>
              sum + (member.experience_years || 0),
            0
          ) / juryMembers.length
        ).toFixed(1)
      : 0;

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        ⚖️ Jury Evaluation Center
      </h2>

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
            <h6>Total Jury Members</h6>
            <h2>{juryMembers.length}</h2>
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
            <h6>Organizations</h6>
            <h2>
              {
                new Set(
                  juryMembers.map(
                    (member) => member.organization
                  )
                ).size
              }
            </h2>
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
            <h6>Expertise Areas</h6>
            <h2>
              {
                new Set(
                  juryMembers.map(
                    (member) => member.expertise
                  )
                ).size
              }
            </h2>
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
            <h6>Avg Experience</h6>
            <h2>{avgExperience} yrs</h2>
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
          Search Jury Members
        </h5>

        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search jury member..."
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
          <h4 style={{ color: "#fff" }}>Jury Directory</h4>
        </div>

        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Name</th>
                <th>Organization</th>
                <th>Expertise</th>
                <th>Experience</th>
              </tr>
            </thead>

            <tbody>

              {filteredJury.length > 0 ? (
                filteredJury.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.organization}</td>
                    <td>{member.expertise}</td>
                    <td>
                      <span className="badge bg-primary">
                        {member.experience_years} Years
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-secondary"
                  >
                    No jury members found
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

export default Jury;