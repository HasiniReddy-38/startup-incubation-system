function Funding() {
  const funds = [
    {
      startup: "InnovAI Labs",
      stage: "Seed",
      amount: "$250K",
    },
    {
      startup: "HealthVision",
      stage: "Series A",
      amount: "$1M",
    },
    {
      startup: "GreenFuture",
      stage: "Seed",
      amount: "$500K",
    },
  ];

  return (
    <div className="container-fluid p-4 text-white">
      <h2 className="fw-bold mb-4" style={{ color: "#141313" }}>💰 Funding</h2>

      <div className="card bg-dark p-4">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Startup</th>
              <th>Stage</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {funds.map((f, i) => (
              <tr key={i}>
                <td>{f.startup}</td>
                <td>{f.stage}</td>
                <td>{f.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Funding;