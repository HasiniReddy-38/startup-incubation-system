import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CorporateProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    organization_name: "",
    industry: "",
    problem_domain: "",
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
        "/corporate/profile",
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

          <h2 className="mb-4">🏢 Corporate Profile Setup</h2>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Organization Name</label>
              <input
                type="text"
                name="organization_name"
                className="form-control bg-dark text-white border-secondary"
                value={formData.organization_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                className="form-control bg-dark text-white border-secondary"
                value={formData.industry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Problem Domain</label>
              <input
                type="text"
                name="problem_domain"
                className="form-control bg-dark text-white border-secondary"
                value={formData.problem_domain}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
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

            <button
              type="submit"
              className="btn text-white"
              style={{
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)",
              }}
            >
              Save Corporate Profile
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CorporateProfile;