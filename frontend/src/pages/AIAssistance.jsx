import { useState } from "react";
import api from "../services/api";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/assistant/", {
        question,
      });

      setAnswer(res.data.answer);
    } catch (error) {
      console.error(error);

      setAnswer(
        "Unable to get response from AI Assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid p-4 text-white"
      style={{
        background: "#0f0f11",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        🤖 AI Ecosystem Assistant
      </h2>

      <div
        className="card border-0 shadow"
        style={{
          background: "#151518",
          borderRadius: "18px",
        }}
      >
        <div className="card-body">

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Ask about startups, investors, funding, proposals..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={askQuestion}
            disabled={loading}
          >
            {loading
              ? "Thinking..."
              : "Ask AI"}
          </button>

          {answer && (
            <div
              className="mt-4 p-3"
              style={{
                background: "#0f172a",
                borderRadius: "12px",
              }}
            >
              <h5>AI Response</h5>

              <p className="mb-0">
                {answer}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AIAssistant;