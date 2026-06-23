import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      className="px-4 py-3 shadow-sm"
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1f2937",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* LEFT */}
        <div>
          <h5
            style={{
              margin: 0,
              color: "white",
              fontWeight: "600",
              letterSpacing: "0.3px",
            }}
          >
            Innovation Ecosystem Platform
          </h5>

          <small style={{ color: "#94a3b8" }}>
            AI-powered startup intelligence system
          </small>
        </div>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-3">
          {/* USER NAME */}
          <span
            style={{
              color: "white",
              fontWeight: "600",
            }}
          >
            {user.name || "Guest"}
          </span>

          {/* ROLE */}
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              background: "linear-gradient(135deg,#3b82f6,#2563eb)",
              color: "white",
            }}
          >
            {(user.role || "USER").toUpperCase()}
          </span>

          {/* AI ENABLED */}
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "white",
            }}
          >
            ● AI ENABLED
          </span>

          {/* SYSTEM STATUS */}
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              background: "#111827",
              color: "#94a3b8",
              border: "1px solid #1f2937",
            }}
          >
            System Live
          </span>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-danger"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;