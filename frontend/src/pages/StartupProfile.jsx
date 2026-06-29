import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StartupProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    company_name: "",
    industry: "",
    stage: "",
    funding_required: "",
    description: "",
    location: "",
    website: "",
    pitch_deck_url: "",
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
        "/startup/profile",
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
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <div
        className="card border-0 shadow mx-auto"
        style={{
          maxWidth: "900px",
          background: "#151518",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-4">

          <h2 className="mb-4" style={{ color: "#fef8f8" }}>
            🚀 Startup Profile Setup
          </h2>

          {message && (
            <div className="alert alert-success">
              {message}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label style={{ color: "#ded5d5" }}>Company Name</label>

                <input
                  type="text"
                  name="company_name"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label style={{ color: "#f6f4f4" }}>Industry</label>

                <input
                  type="text"
                  name="industry"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label style={{ color: "#faf8f8" }}>Stage</label>

                <input
                  type="text"
                  name="stage"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.stage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label style={{ color: "#f8f0f0" }}> Funding Required</label>

                <input
                  type="text"
                  name="funding_required"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.funding_required}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-3">
                <label style={{ color: "#f3f1f1" }}>Description</label>

                <textarea
                  name="description"
                  rows="4"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label style={{ color: "#f6ecec" }}>Location</label>

                <input
                  type="text"
                  name="location"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label style={{ color: "#f4f2f2" }}>Website</label>

                <input
                  type="text"
                  name="website"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-4">
                <label style={{ color: "#f7f3f3" }}>Pitch Deck URL</label>

                <input
                  type="text"
                  name="pitch_deck_url"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.pitch_deck_url}
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
              Save Startup Profile
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default StartupProfile;