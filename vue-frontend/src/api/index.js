import { backendURL } from '../constants';

export async function getReviews() {
  const res = await fetch(backendURL);
  if (!res.ok) {
    return Promise.Reject(res.status);
  }
  return await res.json();
}

export async function newReview(review) {
  const res = await fetch(backendURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `title=${encodeURIComponent(review.title)}` +
        `&description=${encodeURIComponent(review.description)}`,
  });
  if (!res.ok) {
    return Promise.Reject(res.status);
  }
  return res;
}
