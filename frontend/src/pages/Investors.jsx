import { useEffect, useState } from "react";
import api from "../services/api";

function Investors() {
  const [search, setSearch] = useState("");
  const [investors, setInvestors] = useState([]);
  const [startups, setStartups] = useState([]);
  const [interests, setInterests] = useState({});

  useEffect(() => {
    api
      .get("/investor/all")
      .then((res) => {
        setInvestors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("/startup/all")
      .then((res) => {
        setStartups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredInvestors = investors.filter((investor) =>
    (investor.firm_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const aiInvestors = investors.filter(
    (i) =>
      i.preferred_sector?.toLowerCase().includes("ai") ||
      i.preferred_sector?.toLowerCase().includes("artificial")
  ).length;

  const fintechInvestors = investors.filter(
    (i) =>
      i.preferred_sector?.toLowerCase().includes("fin")
  ).length;

  const climateInvestors = investors.filter(
    (i) =>
      i.preferred_sector?.toLowerCase().includes("climate")
  ).length;

  const markInterested = (startupId) => {
    setInterests({
      ...interests,
      [startupId]: "Interested",
    });
  };

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        💰 Investor Network
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
            <h6>Total Investors</h6>
            <h2>{investors.length}</h2>
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
            <h6>AI Investors</h6>
            <h2>{aiInvestors}</h2>
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
            <h6>FinTech Focus</h6>
            <h2>{fintechInvestors}</h2>
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
            <h6>Climate Focus</h6>
            <h2>{climateInvestors}</h2>
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
        <h5 className="mb-3" style={{ color: "#f7f3f3" }}>
          Search Investors
        </h5>

        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search investor by firm name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* INVESTORS TABLE */}

      <div
        className="card border-0 shadow mb-4"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-header border-0 bg-transparent">
          <h4 style={{ color: "#f7f3f3" }}>Investor Directory</h4>
        </div>

        <div className="card-body">
          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Firm Name</th>
                <th>Preferred Sector</th>
                <th>Min Investment</th>
                <th>Max Investment</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>

              {filteredInvestors.length > 0 ? (
                filteredInvestors.map((investor) => (
                  <tr key={investor.id}>
                    <td>{investor.firm_name}</td>
                    <td>{investor.preferred_sector}</td>
                    <td>{investor.min_investment}</td>
                    <td>{investor.max_investment}</td>
                    <td>{investor.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No investors found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </div>

      {/* STARTUPS SEEKING FUNDING */}

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-header border-0 bg-transparent">
          <h4 style={{ color: "#f7f3f3" }}>🚀 Startups Seeking Funding</h4>
        </div>

        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>Funding Required</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {startups.length > 0 ? (
                startups.map((startup) => (
                  <tr key={startup.id}>

                    <td>{startup.company_name}</td>

                    <td>{startup.industry}</td>

                    <td>
                      {startup.funding_required}
                    </td>

                    <td>{startup.location}</td>

                    <td>

                      {interests[startup.id] ? (
                        <span className="badge bg-success">
                          Funding Interest Sent
                        </span>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            markInterested(startup.id)
                          }
                        >
                          Interested
                        </button>
                      )}

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No startups available
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

export default Investors;