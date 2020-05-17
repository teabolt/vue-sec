const reviews = [
  {
    title: 'great product',
    message: 'an amazing thing. Thank you!',
  },
  {
    title: 'horrible user experience',
    message: 'an unintuitive and unproductive workflow'
  },
];

function getReviews() {
  return reviews;
}

function addReview(review) {
  reviews.push({
    title: review.title,
    message: review.message,
  });
}

exports.getReviews = getReviews;
exports.addReview = addReview;
