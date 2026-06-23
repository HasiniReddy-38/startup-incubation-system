function Mentors() {
  const mentors = [
    {
      name: "Dr. Rajesh Kumar",
      expertise: "AI & ML",
      startups: 12,
      rating: 4.9,
    },
    {
      name: "Priya Sharma",
      expertise: "FinTech",
      startups: 8,
      rating: 4.8,
    },
    {
      name: "Arjun Mehta",
      expertise: "HealthTech",
      startups: 15,
      rating: 4.7,
    },
  ];

  return (
    <div className="container-fluid p-4 text-white">
      <h2 className="fw-bold mb-4" style={{ color: "#090909" }}>👨‍🏫 Mentors</h2>

      <div className="card bg-dark p-4">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Expertise</th>
              <th>Startups Mentored</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {mentors.map((m, i) => (
              <tr key={i}>
                <td>{m.name}</td>
                <td>{m.expertise}</td>
                <td>{m.startups}</td>
                <td>{m.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mentors;