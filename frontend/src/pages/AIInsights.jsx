function AIInsights() {
  const insights = [
    "AI startups are attracting the most investment this quarter.",
    "FinTech solutions show highest corporate demand.",
    "HealthTech sector has increased by 28% this month.",
    "12 startups are investment-ready.",
  ];

  return (
    <div className="container-fluid p-4 text-white">
      <h2 className="fw-bold mb-4" style={{ color: "#181616" }}>🤖 AI Insights</h2>

      <div className="card bg-dark p-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="border-bottom py-3"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIInsights;