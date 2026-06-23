import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function JuryProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    name: "",
    organization: "",
    expertise: "",
    experience_years: "",
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
        "/jury/profile",
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

          <h2 className="mb-4">⚖️ Jury Profile Setup</h2>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control bg-dark text-white border-secondary"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Organization</label>
              <input
                type="text"
                name="organization"
                className="form-control bg-dark text-white border-secondary"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Expertise</label>
              <input
                type="text"
                name="expertise"
                className="form-control bg-dark text-white border-secondary"
                value={formData.expertise}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label>Experience Years</label>
              <input
                type="number"
                name="experience_years"
                className="form-control bg-dark text-white border-secondary"
                value={formData.experience_years}
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
              Save Jury Profile
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default JuryProfile;