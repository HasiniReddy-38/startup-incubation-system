import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateProposal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    challenge_id: "",
    startup_id: "",
    solution_description: "",
    github_link: "",
    pitch_deck_url: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/proposal/", formData);

      alert("Proposal Submitted");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="container-fluid p-4 text-white">

      <div
        className="card p-4"
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#151518",
        }}
      >
        <h2>🚀 Submit Proposal</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Challenge ID"
            name="challenge_id"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Startup ID"
            name="startup_id"
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            rows="5"
            placeholder="Solution Description"
            name="solution_description"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Github Link"
            name="github_link"
            onChange={handleChange}
          />

          <input
            className="form-control mb-4"
            placeholder="Pitch Deck URL"
            name="pitch_deck_url"
            onChange={handleChange}
          />

          <button className="btn btn-success">
            Submit Proposal
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProposal;