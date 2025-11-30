import React, { useState } from "react";
import "./App.css";

function App() {
  // ---------- Global States ----------
  const [page, setPage] = useState("home"); // home, register, login, dashboard
  const [users, setUsers] = useState([]); // store registered users
  const [loggedUser, setLoggedUser] = useState(null);
  const [projects, setProjects] = useState([]);

  // ---------- Registration States ----------
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regRole, setRegRole] = useState("student");

  // ---------- Login States ----------
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // ---------- Project Submission ----------
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  // ---------- Register ----------
  const handleRegister = (e) => {
    e.preventDefault();
    if (!regEmail || !regPass) {
      alert("Enter all fields");
      return;
    }

    const existing = users.find((u) => u.email === regEmail);
    if (existing) {
      alert("Email already registered");
      return;
    }

    const newUser = { email: regEmail, password: regPass, role: regRole };
    setUsers([...users, newUser]);
    alert("Registered successfully! You can now log in.");
    setPage("login");
  };

  // ---------- Login ----------
  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.email === loginEmail && u.password === loginPass
    );
    if (found) {
      setLoggedUser(found);
      setPage("dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  // ---------- Logout ----------
  const handleLogout = () => {
    setLoggedUser(null);
    setPage("home");
  };

  // ---------- Student: Submit Project ----------
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectTitle || !projectDesc) return;
    const newProject = {
      title: projectTitle,
      description: projectDesc,
      submittedBy: loggedUser.email,
      feedback: "",
    };
    setProjects([...projects, newProject]);
    setProjectTitle("");
    setProjectDesc("");
  };

  // ---------- Teacher: Add Feedback ----------
  const handleFeedback = (index) => {
    if (!feedbackText.trim()) return;
    const updated = [...projects];
    updated[index].feedback = `${feedbackText} (By: ${loggedUser.email})`;
    setProjects(updated);
    setFeedbackText("");
  };

  // ---------- UI Rendering ----------
  return (
    <div className="App">
      <header>
        <h1>Peer Review & Collaboration Platform</h1>
        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          {!loggedUser && (
            <>
              <button onClick={() => setPage("register")}>Register</button>
              <button onClick={() => setPage("login")}>Login</button>
            </>
          )}
          {loggedUser && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </header>

      <hr />

      {/* HOME PAGE */}
      {page === "home" && (
        <div>
          <h2>Welcome to the Peer Review Platform</h2>
          <p>
            Students can submit projects for review, and Teachers can provide
            feedback — all in one place!
          </p>
        </div>
      )}

      {/* REGISTER PAGE */}
      {page === "register" && (
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
            />

            <div className="role-select">
              <label>
                <input
                  type="radio"
                  value="student"
                  checked={regRole === "student"}
                  onChange={(e) => setRegRole(e.target.value)}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  value="teacher"
                  checked={regRole === "teacher"}
                  onChange={(e) => setRegRole(e.target.value)}
                />
                Teacher
              </label>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      )}

      {/* LOGIN PAGE */}
      {page === "login" && (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* DASHBOARD PAGE */}
      {page === "dashboard" && loggedUser && (
        <div className="dashboard">
          <h2>
            Welcome, {loggedUser.email} ({loggedUser.role})
          </h2>
          <hr />

          {loggedUser.role === "student" ? (
            <div className="student-section">
              <h3>Submit Your Project</h3>
              <form onSubmit={handleProjectSubmit}>
                <input
                  type="text"
                  placeholder="Project title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
                <textarea
                  placeholder="Project description"
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                />
                <button type="submit">Submit Project</button>
              </form>

              <h3>Your Submissions</h3>
              {projects
                .filter((p) => p.submittedBy === loggedUser.email)
                .map((p, i) => (
                  <div key={i} className="project-card">
                    <strong>{p.title}</strong>
                    <p>{p.description}</p>
                    <p>
                      <b>Feedback:</b>{" "}
                      {p.feedback ? p.feedback : "No feedback yet"}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="teacher-section">
              <h3>Student Submissions</h3>
              {projects.length === 0 ? (
                <p>No projects yet.</p>
              ) : (
                projects.map((p, i) => (
                  <div key={i} className="project-card">
                    <strong>{p.title}</strong>
                    <p>{p.description}</p>
                    <p>
                      <b>Submitted by:</b> {p.submittedBy}
                    </p>
                    <p>
                      <b>Feedback:</b>{" "}
                      {p.feedback ? p.feedback : "No feedback yet"}
                    </p>

                    <textarea
                      placeholder="Write feedback..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                    <button onClick={() => handleFeedback(i)}>
                      Submit Feedback
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
