import { useState } from "react";

function ReviewForm({ addReview }) {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(review);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default ReviewForm;
