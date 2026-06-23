import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChallenge() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    corporate_id: "",
    title: "",
    description: "",
    domain: "",
    reward: "",
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
        "/challenge/",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/challenges");
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Failed to create challenge"
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

          <h2 className="mb-4">
            🚀 Create Challenge
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

            <div className="mb-3">
              <label>Corporate ID</label>
              <input
                type="number"
                name="corporate_id"
                className="form-control"
                value={formData.corporate_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Domain</label>
              <input
                type="text"
                name="domain"
                className="form-control"
                value={formData.domain}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Reward</label>
              <input
                type="text"
                name="reward"
                className="form-control"
                value={formData.reward}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label>Description</label>
              <textarea
                rows="5"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Create Challenge
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default CreateChallenge;