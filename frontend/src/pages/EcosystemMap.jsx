function EcosystemMap() {
  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        🌍 Ecosystem Map
      </h2>

      <div
        className="card border-0 shadow p-5 text-center"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <h3 style={{color:"white"}}>Innovation Ecosystem Network</h3>

        <p className="text-secondary mt-3">
          Startups ↔ Investors ↔ Corporates ↔ Mentors ↔ Jury
        </p>

        <div className="mt-4">
          <h1>🚀 ↔ 💰 ↔ 🏢 ↔ 👨‍🏫 ↔ ⚖️</h1>
        </div>

        <p className="text-secondary mt-4">
          Interactive ecosystem visualization coming soon.
        </p>
      </div>
    </div>
  );
}

export default EcosystemMap;