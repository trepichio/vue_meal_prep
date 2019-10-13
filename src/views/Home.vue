<template>
  <span>
    <home-hero></home-hero>
    <home-details id="home-details-container"></home-details>
    <home-plans></home-plans>
  </span>
</template>

<script>
import HomeHero from '@/components/HomeHero.vue';
import HomeDetails from '@/components/HomeDetails.vue';
import HomePlans from '@/components/HomePlans.vue';

export default {
  name: 'Home',
  components: {
    HomeHero,
    HomeDetails,
    HomePlans
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
