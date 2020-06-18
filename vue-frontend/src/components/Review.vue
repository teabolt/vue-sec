<template>
  <div class="review">
    <div class="title">
      {{ title }}
    </div>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    title: String,
    description: String,
  }
}
</script>

<style scoped>
.review {
  margin-right: 3rem;
  margin-bottom: 3rem;
  padding: 1rem;

  border: 0.1rem solid black;
  box-shadow: 0.1rem 0.1rem;

  overflow-wrap: break-word;
}

.title {
  margin-bottom: 1rem;
  text-decoration: underline;
}
</style>
