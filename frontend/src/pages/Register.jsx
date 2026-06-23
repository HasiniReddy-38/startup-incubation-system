import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "startup",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration failed"
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#0f0f11",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "500px",
          background: "#151518",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h2 className="text-center mb-2">
          🚀 InnovationOS
        </h2>

        <p className="text-center text-secondary mb-4">
          Create your account
        </p>

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

        <form onSubmit={handleRegister}>
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
            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control bg-dark text-white border-secondary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control bg-dark text-white border-secondary"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Role</label>

            <select
              name="role"
              className="form-select bg-dark text-white border-secondary"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="startup">Startup</option>
              <option value="investor">Investor</option>
              <option value="corporate">Corporate</option>
              <option value="jury">Jury</option>
            </select>
          </div>

          <button
            className="btn w-100 text-white"
            style={{
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
            }}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-secondary">
            Already have an account?
          </span>

          <Link
            to="/login"
            className="ms-2 text-decoration-none"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;