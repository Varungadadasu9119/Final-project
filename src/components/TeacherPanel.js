import { useState } from "react";

export default function TeacherPanel({ projects, onFeedback }) {
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedback = (index) => {
    if (!feedbackText.trim()) return;
    onFeedback(index, feedbackText);
    setFeedbackText("");
  };

  return (
    <div className="teacher-panel">
      <h2>Teacher Dashboard</h2>
      {projects.length === 0 ? (
        <p>No student submissions yet.</p>
      ) : (
        projects.map((p, i) => (
          <div key={i} className="project-card">
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p><strong>Feedback:</strong> {p.feedback || "No feedback yet"}</p>

            <textarea
              placeholder="Write feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button onClick={() => handleFeedback(i)}>Submit Feedback</button>
          </div>
        ))
      )}
    </div>
  );
}
import { useState } from "react";

export default function TeacherPanel({ projects, onFeedback }) {
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedback = (index) => {
    if (!feedbackText.trim()) return;
    onFeedback(index, feedbackText);
    setFeedbackText("");
  };

  return (
    <div className="teacher-panel">
      <h2>Teacher Dashboard</h2>
      {projects.length === 0 ? (
        <p>No student submissions yet.</p>
      ) : (
        projects.map((p, i) => (
          <div key={i} className="project-card">
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p><strong>Feedback:</strong> {p.feedback || "No feedback yet"}</p>

            <textarea
              placeholder="Write feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button onClick={() => handleFeedback(i)}>Submit Feedback</button>
          </div>
        ))
      )}
    </div>
  );
}

