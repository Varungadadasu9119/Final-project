import ReviewForm from "./ReviewForm";

function ProjectList({ projects, addReview }) {
  return (
    <div style={{ margin: "1rem" }}>
      {projects.map((project, index) => (
        <div key={index} style={{ border: "1px solid gray", padding: "1rem", margin: "1rem 0" }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <h4>Reviews:</h4>
          {project.reviews.length > 0 ? (
            project.reviews.map((r, i) => <p key={i}>💬 {r}</p>)
          ) : (
            <p>No reviews yet.</p>
          )}

          <ReviewForm addReview={(review) => addReview(index, review)} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
