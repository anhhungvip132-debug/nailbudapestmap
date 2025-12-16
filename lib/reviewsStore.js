export function getAllReviews() {
  return JSON.parse(localStorage.getItem("reviews") || "[]");
}

export function updateReviewStatus(id, status) {
  const reviews = getAllReviews().map(r =>
    r.id === id ? { ...r, status } : r
  );
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

export function deleteReview(id) {
  const reviews = getAllReviews().filter(r => r.id !== id);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}
