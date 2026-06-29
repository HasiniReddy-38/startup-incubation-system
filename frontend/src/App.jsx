import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Rankings from "./pages/Rankings";
import Matchmaking from "./pages/Matchmaking";
import Startups from "./pages/Startups";
import Investors from "./pages/Investors";
import Corporates from "./pages/Corporates";
import Jury from "./pages/Jury";
import Challenges from "./pages/Challenges";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StartupProfile from "./pages/StartupProfile";
import InvestorProfile from "./pages/InvestorProfile";
import CorporateProfile from "./pages/CorporateProfile";
import JuryProfile from "./pages/JuryProfile";

import Mentors from "./pages/Mentors";
import Funding from "./pages/Funding";
import AIInsights from "./pages/AIInsights";
import EcosystemMap from "./pages/EcosystemMap";

import CreateChallenge from "./pages/CreateChallenge";
import CreateProposal from "./pages/CreateProposal";
import ReviewProposals from "./pages/ReviewProposals";
import AIAssistant from "./pages/AIAssistance";
import FundingApplications from "./pages/FundingApplications";

function AppLayout() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  const authPages = [
    "/login",
    "/register",
  ];

  if (!token && !authPages.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  if (
    token &&
    authPages.includes(location.pathname)
  ) {
    return <Navigate to="/" replace />;
  }

  if (authPages.includes(location.pathname)) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Core Modules */}
          <Route
            path="/startups"
            element={<Startups />}
          />

          <Route
            path="/investors"
            element={<Investors />}
          />

          <Route
            path="/corporates"
            element={<Corporates />}
          />

          <Route
            path="/jury"
            element={<Jury />}
          />

          <Route
            path="/challenges"
            element={<Challenges />}
          />

          {/* Innovation Ecosystem */}
          <Route
            path="/mentors"
            element={<Mentors />}
          />

          <Route
            path="/funding"
            element={<Funding />}
          />

          <Route
            path="/ecosystem-map"
            element={<EcosystemMap />}
          />

          {/* AI Features */}
          <Route
            path="/matchmaking"
            element={<Matchmaking />}
          />

          <Route
            path="/ai-insights"
            element={<AIInsights />}
          />

          {/* Rankings */}
          <Route
            path="/rankings"
            element={<Rankings />}
          />

          {/* Profile Pages */}
          <Route
            path="/startup-profile"
            element={<StartupProfile />}
          />

          <Route
            path="/investor-profile"
            element={<InvestorProfile />}
          />

          <Route
            path="/corporate-profile"
            element={<CorporateProfile />}
          />

          <Route
            path="/jury-profile"
            element={<JuryProfile />}
          />

          {/* Workflow Pages */}
          <Route
            path="/create-challenge"
            element={<CreateChallenge />}
          />

          <Route
            path="/create-proposal"
            element={<CreateProposal />}
          />

          <Route
            path="/review-proposals"
            element={<ReviewProposals />}
          />

<Route
  path="/ai-assistant"
  element={<AIAssistant />}
/>
<Route
  path="/funding-applications"
  element={<FundingApplications />}
/>
          {/* Must be LAST */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />


        </Routes>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;