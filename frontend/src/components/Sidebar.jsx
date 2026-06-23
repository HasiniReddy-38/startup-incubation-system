import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaRocket,
  FaMoneyBillWave,
  FaBuilding,
  FaBalanceScale,
  FaClipboardList,
  FaChartLine,
  FaHandshake,
  FaChartBar,
  FaCog,
  FaUserTie,
  FaBrain,
  FaMapMarkedAlt,
  FaProjectDiagram,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "12px",
    textDecoration: "none",
    transition: "all 0.2s ease",
    color: location.pathname === path ? "#fff" : "#cbd5e1",
    background:
      location.pathname === path
        ? "linear-gradient(135deg,#3b82f6,#6366f1)"
        : "transparent",
    fontWeight:
      location.pathname === path ? "600" : "500",
  });

  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        background: "#0f172a",
        borderRight: "1px solid #1e293b",
        color: "white",
        padding: "24px 16px",
      }}
    >
      <div className="mb-4">
        <h3 className="fw-bold">🚀 InnovationOS</h3>

        <small style={{ color: "#94a3b8" }}>
          Enterprise Innovation Ecosystem
        </small>
      </div>

      <div className="d-flex flex-column gap-2">

        <Link to="/" style={linkStyle("/")}>
          <FaHome />
          Overview
        </Link>

        <Link
          to="/startups"
          style={linkStyle("/startups")}
        >
          <FaRocket />
          Startups
        </Link>

        <Link
          to="/corporates"
          style={linkStyle("/corporates")}
        >
          <FaBuilding />
          Corporates
        </Link>

        <Link
          to="/investors"
          style={linkStyle("/investors")}
        >
          <FaMoneyBillWave />
          Investors
        </Link>

        <Link
          to="/mentors"
          style={linkStyle("/mentors")}
        >
          <FaUserTie />
          Mentors
        </Link>

        <Link to="/jury" style={linkStyle("/jury")}>
          <FaBalanceScale />
          Jury
        </Link>

        <Link
          to="/challenges"
          style={linkStyle("/challenges")}
        >
          <FaClipboardList />
          Challenges
        </Link>

        <Link
          to="/projects"
          style={linkStyle("/projects")}
        >
          <FaProjectDiagram />
          POCs & Projects
        </Link>

        <Link
          to="/funding"
          style={linkStyle("/funding")}
        >
          <FaMoneyBillWave />
          Funding
        </Link>

        <Link
          to="/analytics"
          style={linkStyle("/analytics")}
        >
          <FaChartBar />
          Reports & Analytics
        </Link>

        <Link
          to="/ai-insights"
          style={linkStyle("/ai-insights")}
        >
          <FaBrain />
          AI Insights
        </Link>

        <Link
          to="/ecosystem-map"
          style={linkStyle("/ecosystem-map")}
        >
          <FaMapMarkedAlt />
          Ecosystem Map
        </Link>

        <Link
          to="/rankings"
          style={linkStyle("/rankings")}
        >
          <FaChartLine />
          Rankings
        </Link>

        <Link
          to="/matchmaking"
          style={linkStyle("/matchmaking")}
        >
          <FaHandshake />
          AI Matchmaking
        </Link>

        <Link
          to="/settings"
          style={linkStyle("/settings")}
        >
          <FaCog />
          Settings
        </Link>

      </div>

      <div
        className="mt-4 p-3"
        style={{
          background: "#1e293b",
          borderRadius: "14px",
        }}
      >
        <h6>🤖 AI Assistant</h6>

        <small style={{ color: "#94a3b8" }}>
          Ask anything about your ecosystem
        </small>

        <button
          className="btn btn-primary w-100 mt-3"
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}

export default Sidebar;