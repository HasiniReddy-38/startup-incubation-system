import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function InvestorProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    firm_name: "",
    preferred_sector: "",
    min_investment: "",
    max_investment: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/investor/profile",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Profile creation failed"
      );
    }
  };

  return (
    <div className="container-fluid p-4 text-white" style={{ background:"#0f0f11", minHeight:"100vh" }}>
      <div className="card border-0 shadow mx-auto" style={{ maxWidth:"900px", background:"#151518", borderRadius:"20px" }}>
        <div className="card-body p-4">

          <h2 className="mb-4">💰 Investor Profile Setup</h2>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Firm Name</label>
                <input
                  type="text"
                  name="firm_name"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.firm_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Preferred Sector</label>
                <input
                  type="text"
                  name="preferred_sector"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.preferred_sector}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Min Investment</label>
                <input
                  type="text"
                  name="min_investment"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.min_investment}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Max Investment</label>
                <input
                  type="text"
                  name="max_investment"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.max_investment}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-4">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              className="btn text-white"
              style={{
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)",
              }}
            >
              Save Investor Profile
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default InvestorProfile;