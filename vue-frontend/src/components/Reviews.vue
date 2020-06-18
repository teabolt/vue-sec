<template>
  <div id="reviews">
    <span>All Reviews:</span>
    <ul v-if="reviews && reviews.length" class="review-items">
      <li v-for="({title, description}, index) in reviews" :key="`review-${index}`" class="review-item">
        <Review :title="title" :description="description"/>
      </li>
    </ul>
    <p v-else>No reviews for now...</p>
  </div>
</template>

<script>
import { getReviews } from '../api';
import Review from './Review';

export default {
  components: {
    Review,
  },
  data: () => {
    return {
      reviews: null,
      networkError: "",
    };
  },
  async mounted () {
    try {
      this.reviews = await getReviews();
    } catch (error) {
      this.setNetworkError(String(error));
    }
  },
  name: 'Reviews',
  props: {
    setNetworkError: Function,
  },
}
</script>

<style scoped>
#reviews .review-items {
  display: flex;
  flex-flow: row wrap;
}

.review-item {
  list-style-type: none;
}
</style>
