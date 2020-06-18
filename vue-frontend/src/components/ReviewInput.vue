<template>
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
</template>

<script>
import { newReview } from '../api';

export default {
  data: () => {
    return {
      reviewTitle: "",
      reviewMessage: "",
      error: "",
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
        this.setNetworkError(String(error));
      }
    }
  },
  name: 'ReviewInput',
  props: {
    setNetworkError: Function,
  },
}
</script>

<style scoped>
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
</style>
