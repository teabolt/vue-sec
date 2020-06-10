<template>
  <div id="app">
        <span v-if="networkError" class="error">{{ networkError }}</span>
    <div id="new-review">
      <span>New Review:</span>
      <form>
        <ul class="form-items">
          <li class="form-item">
            <label for="title">Title:</label>
            <input
              v-model="reviewTitle"
              type="text"
              id="review-title"
              name="title"
              required="true"
              maxlength="20"
            >    
          </li>
          <li class="form-item">
            <label for="description">Description:</label>
            <textarea
              v-model="reviewMessage"
              id="review-description"
              name="description"
              required="true"
              rows="6"
            >
            </textarea>
          </li>
          <li class="form-item">
            <button v-on:click.prevent="onSubmit">Add review</button>
            <span v-if="error" class="error">{{ error }}</span>
          </li>
        </ul>
      </form>
    </div>
    <div id="reviews">
      <span>All Reviews:</span>
      <ul v-if="reviews && reviews.length" class="review-items">
        <li v-for="(review, index) in reviews" :key="`review-${index}`" class="review-item">
          <div class="review">
            <div class="title">
              {{ review.title }}
            </div>
            <div class="description">
              {{ review.description }}
            </div>
          </div>
        </li>
      </ul>
      <p v-else>No reviews for now...</p>
    </div>
  </div>
</template>

<script>
const reviewsUrl = 'http://127.0.0.1:3000/';

async function getReviews() {
  const res = await fetch(reviewsUrl);
  if (!res.ok) {
      return Promise.Reject(res.status);
    }
  return await res.json();
}

async function newReview(review) {
  const res = await fetch(reviewsUrl, {
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

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data: () => {
    return {
      reviewTitle: "",
      reviewMessage: "",
      reviews: null,
      error: "",
      networkError: "",
    };
  },
  methods: {
    onSubmit: async function () {
      if (!this.reviewTitle) {
        this.error = "Missing value for title";
      } else if (!this.reviewMessage) {
        this.error = "Missing value for description";
      } else {
        this.error = "";
      }

      if (this.error) {
        return;
      }

      try {
        newReview({
          title: this.reviewTitle,
          description: this.reviewMessage,
        });
      } catch (error) {
        this.networkError = String(error);
      }

      try {
        this.reviews = await getReviews();
      } catch (error) {
        this.networkError = String(error);
      }
    },
  },
  async mounted () {
    try {
      this.reviews = await getReviews();
    } catch (error) {
      this.networkError = String(error);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  width: 90%;
  margin: auto;
  margin-top: 1rem;
}

.error {
  color: red;
}

#new-review {
  margin-top: 3rem;
  margin-bottom: 5rem;
}

#new-review .form-item {
  list-style-type: none;

  max-width: 25%;
  margin-bottom: 1.5rem;

  display: flex;
  flex-flow: column wrap;
}

#new-review .form-item label {
  margin-bottom: 0.2rem;
}

#new-review textarea {
  resize: none;
}

#new-review .error {
  margin-top: 0.75rem;
}

#reviews .review-items {
  display: flex;
  flex-flow: row wrap;
}

#reviews .review-item {
  list-style-type: none;

  margin-right: 3rem;
  margin-bottom: 3rem;
  padding: 1rem;

  border: 0.1rem solid black;
  box-shadow: 0.1rem 0.1rem;

  overflow-wrap: break-word;
}

#reviews .title {
  margin-bottom: 1rem;
  text-decoration: underline;
}
</style>
