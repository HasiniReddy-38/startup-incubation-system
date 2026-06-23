import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      const user = response.data.user;

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "role",
        user.role
      );

      if (user.role === "startup") {
        navigate("/startup-profile");
      }

      else if (user.role === "investor") {
        navigate("/investor-profile");
      }

      else if (user.role === "corporate") {
        navigate("/corporate-profile");
      }

      else if (user.role === "jury") {
        navigate("/jury-profile");
      }

      else {
        navigate("/");
      }

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Login failed"
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
          width: "420px",
          background: "#151518",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h2 className="text-center mb-2">
          🚀 InnovationOS
        </h2>

        <p className="text-center text-secondary mb-4">
          Sign in to continue
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <div className="mb-4">
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

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-secondary">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ms-2 text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;