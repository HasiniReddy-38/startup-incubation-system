Startup Incubation System

An AI-powered Innovation Ecosystem Platform that connects **Startups, Corporates, Investors, Jury Members, and Administrators** into a unified innovation management ecosystem. The platform supports startup onboarding, challenge management, proposal evaluation, AI-powered matchmaking, funding workflows, ranking systems, analytics dashboards, and ecosystem insights.



## 🚀 Features

### Startup Management

* Startup registration and profile management
* Startup project showcase
* Innovation score tracking
* Proposal submission
* Funding opportunities

### Corporate Innovation Challenges

* Create and manage innovation challenges
* Review startup proposals
* AI-powered startup recommendations
* Challenge analytics

### Investor Portal

* Investor onboarding
* Startup discovery
* Investment opportunity tracking
* AI recommendation engine

### Jury & Evaluation

* Proposal review system
* Startup scoring and ranking
* Jury member management
* Evaluation workflow

### AI Services

* Startup-Corporate Matchmaking
* Recommendation Engine
* Innovation Scoring
* Proposal Summarization
* Gemini AI Integration

### Dashboard & Analytics

* Executive Dashboard
* Startup Pipeline Funnel
* Funding Analytics
* Ecosystem Analytics
* AI Insights



# 🏗️ Project Architecture


starup-incubation-system
│
├── backend
│   │
│   ├── app
│   │   │
│   │   ├── __pycache__
│   │   ├── core
│   │   │
│   │   ├── dependencies
│   │   │   ├── __pycache__
│   │   │   └── auth_dependency.py
│   │   │
│   │   ├── models
│   │   │   ├── __pycache__
│   │   │   ├── challenge.py
│   │   │   ├── corporate.py
│   │   │   ├── investor.py
│   │   │   ├── jury.py
│   │   │   ├── match.py
│   │   │   ├── message.py
│   │   │   ├── notification.py
│   │   │   ├── project.py
│   │   │   ├── proposal.py
│   │   │   ├── review.py
│   │   │   ├── startup.py
│   │   │   └── user.py
│   │   │
│   │   ├── routers
│   │   │   ├── __pycache__
│   │   │   ├── admin.py
│   │   │   ├── ai.py
│   │   │   ├── auth.py
│   │   │   ├── challenge.py
│   │   │   ├── corporate.py
│   │   │   ├── investor.py
│   │   │   ├── jury.py
│   │   │   ├── matchmaking.py
│   │   │   ├── proposal.py
│   │   │   ├── ranking.py
│   │   │   ├── review.py
│   │   │   └── startup.py
│   │   │
│   │   ├── schemas
│   │   │   ├── __pycache__
│   │   │   ├── challenge_schema.py
│   │   │   ├── corporate_schema.py
│   │   │   ├── investor_schema.py
│   │   │   ├── jury_schema.py
│   │   │   ├── match_schema.py
│   │   │   ├── proposal_schema.py
│   │   │   ├── review_schema.py
│   │   │   ├── startup_schema.py
│   │   │   └── user_schema.py
│   │   │
│   │   ├── services
│   │   │   ├── gemini_service.py
│   │   │   ├── matchmaking_service.py
│   │   │   ├── recommendation_service.py
│   │   │   ├── scoring_service.py
│   │   │   └── summary_service.py
│   │   │
│   │   ├── utils
│   │   │   ├── hash_password.py
│   │   │   └── jwt_handler.py
│   │   │
│   │   └── main.py
│   │
│   └── venv
│
├── frontend
│   │
│   ├── node_modules
│   ├── public
│   │
│   ├── src
│   │   │
│   │   ├── assets
│   │   │   └── hero.png
│   │   │
│   │   ├── components
│   │   │   ├── AnalyticsCharts.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── AIInsights.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Challenges.jsx
│   │   │   ├── CorporateProfile.jsx
│   │   │   ├── Corporates.jsx
│   │   │   ├── CreateChallenge.jsx
│   │   │   ├── CreateProposal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EcosystemMap.jsx
│   │   │   ├── Funding.jsx
│   │   │   ├── InvestorProfile.jsx
│   │   │   ├── Investors.jsx
│   │   │   ├── Jury.jsx
│   │   │   ├── JuryProfile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Matchmaking.jsx
│   │   │   ├── Mentors.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Rankings.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── StartupProfile.jsx
│   │   │   └── Startups.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md



## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* CSS3
* Axios
* React Router

### Backend

* FastAPI
* Python
* JWT Authentication
* Pydantic
* SQLAlchemy
* Gemini AI

### AI Components

* Gemini API
* Recommendation Engine
* Matchmaking Engine
* Scoring System
* AI Summarization



## ⚙️ Installation

### Backend Setup

bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload


Backend URL:

bash
http://localhost:8000


Swagger Documentation:

bash
http://localhost:8000/docs


### Frontend Setup

bash
cd frontend

npm install

npm run dev


Frontend URL:

bash
http://localhost:5173


## 🔑 Core Modules

| Module                | Description                                  |
| --------------------- | -------------------------------------------- |
| Authentication        | JWT-based user authentication                |
| Startup Management    | Startup registration and profile management  |
| Corporate Management  | Innovation challenge creation and management |
| Investor Management   | Startup discovery and funding                |
| Jury Management       | Startup evaluation and scoring               |
| Proposal System       | Proposal submission and review               |
| Matchmaking Engine    | AI startup-corporate matching                |
| Recommendation Engine | AI-powered suggestions                       |
| Scoring Engine        | Innovation scoring algorithm                 |
| Analytics Dashboard   | Ecosystem analytics and insights             |
| AI Insights           | Gemini-powered recommendations               |



## 📊 Dashboard Highlights

* Executive Innovation Dashboard
* Startup Pipeline Funnel
* Innovation Score Distribution
* Funding Analytics
* AI Matchmaking Metrics
* Ecosystem Sector Distribution
* Startup Rankings
* Corporate Challenge Tracking
* Mentor Impact Analysis
* AI Insights & Recommendations



## 🔒 Security

* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Access Control (RBAC)
* Secure API Communication



## 🔮 Future Enhancements

* Real-time Notifications
* WebSocket Integration
* Chat & Messaging Module
* Blockchain-based Innovation Tracking
* AI-powered Funding Prediction
* Cloud Deployment (AWS/Azure/GCP)
* Docker & Kubernetes Support
* Microservices Architecture



👨‍💻 Developed For



A centralized platform designed to accelerate innovation by connecting startups, corporates, investors, mentors, and jury members through AI-powered workflows, analytics, and intelligent matchmaking.
