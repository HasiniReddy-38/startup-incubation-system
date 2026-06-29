import { useEffect, useState } from "react";
import api from "../services/api";

function Funding() {
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    fetchFunding();
  }, []);

  const fetchFunding = async () => {
    try {
      const res = await api.get("/funding/");
      setFundings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyFunding = async (fundingId) => {
    try {
      await api.post("/funding-application/", {
        funding_id: fundingId,
        startup_id: 1,
      });

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Application failed");
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
        💰 Funding Opportunities
      </h2>

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Sector</th>
                <th>Stage</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {fundings.length > 0 ? (
                fundings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.sector}</td>
                    <td>{item.stage}</td>
                    <td>{item.amount}</td>

                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          applyFunding(item.id)
                        }
                      >
                        Apply
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
                    No funding opportunities available
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

export default Funding;