<template>
  <div id="app">
    <span v-if="networkError" class="error">{{ networkError }}</span>
    <ReviewInput :setNetworkError="setNetworkError"/>
    <Reviews :setNetworkError="setNetworkError"/>
  </div>
</template>

<script>
import ReviewInput from './components/ReviewInput';
import Reviews from './components/Reviews';

export default {
  name: 'App',
  components: {
    ReviewInput,
    Reviews,
  },
  data: () => {
    return {
      networkError: "",
    };
  },
  methods: {
    setNetworkError: function (networkError) {
      this.networkError = networkError;
    },
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
</style>
