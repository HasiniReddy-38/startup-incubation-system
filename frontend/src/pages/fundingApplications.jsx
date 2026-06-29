import { useEffect, useState } from "react";
import api from "../services/api";

function FundingApplications() {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const res = await api.get("/funding-application/");
      setApplications(res.data);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/funding-application/${id}`, {
        status,
      });

      loadApplications();
    } catch (err) {
      console.error("Error updating application:", err);
    }
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
        💰 Funding Applications
      </h2>

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>ID</th>
                <th>Funding Opportunity</th>
                <th>Startup</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>

                    <td>{app.id}</td>

                    <td>{app.funding_title}</td>

                    <td>{app.startup_name}</td>

                    <td>
                      <span
                        className={
                          app.status === "Approved"
                            ? "badge bg-success"
                            : app.status === "Rejected"
                            ? "badge bg-danger"
                            : "badge bg-warning text-dark"
                        }
                      >
                        {app.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn btn-success btn-sm me-2"
                        disabled={app.status === "Approved"}
                        onClick={() =>
                          updateStatus(app.id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        disabled={app.status === "Rejected"}
                        onClick={() =>
                          updateStatus(app.id, "Rejected")
                        }
                      >
                        Reject
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-secondary"
                  >
                    No funding applications found.
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

export default FundingApplications;