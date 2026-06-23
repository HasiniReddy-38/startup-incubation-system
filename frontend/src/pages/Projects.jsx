function Projects() {
  const projects = [
    {
      name: "AI Healthcare Assistant",
      startup: "HealthVision",
      status: "Active",
      progress: "75%",
    },
    {
      name: "Smart Agriculture Platform",
      startup: "GreenFuture",
      status: "Completed",
      progress: "100%",
    },
    {
      name: "Fraud Detection Engine",
      startup: "FinPilot",
      status: "In Review",
      progress: "60%",
    },
  ];

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        🚀 POCs & Projects
      </h2>

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Project</th>
                <th>Startup</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.startup}</td>
                  <td>{project.status}</td>
                  <td>{project.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects;