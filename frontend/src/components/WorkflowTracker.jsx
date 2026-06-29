function WorkflowTracker({
  startups,
  challenges,
  proposals,
  matches,
  funding,
}) {
  const workflowSteps = [
    {
      title: "Startup Registered",
      completed: startups > 0,
      count: startups,
    },
    {
      title: "Challenge Posted",
      completed: challenges > 0,
      count: challenges,
    },
    {
      title: "Proposal Submitted",
      completed: proposals > 0,
      count: proposals,
    },
    {
      title: "AI Match Generated",
      completed: matches > 0,
      count: matches,
    },
    {
      title: "Funding Opportunity Open",
      completed: funding > 0,
      count: funding,
    },
  ];

  return (
    <div
      className="card border-0 shadow mt-4"
      style={{
        background: "#151518",
        borderRadius: "18px",
      }}
    >
      <div className="card-header bg-transparent border-0">
        <h4 className="text-white">
          🚀 Innovation Workflow
        </h4>
      </div>

      <div className="card-body">
        {workflowSteps.map((step, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="d-flex align-items-center">

              <div
                className={
                  step.completed
                    ? "bg-success rounded-circle"
                    : "bg-secondary rounded-circle"
                }
                style={{
                  width: "14px",
                  height: "14px",
                }}
              />

              <span
                className="ms-3 text-white"
              >
                {step.title}
              </span>

            </div>

            <span className="badge bg-primary">
              {step.count}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkflowTracker;