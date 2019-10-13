<template>
  <v-app>
    <appNavigation />

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue';

export default {
  name: 'App',
  components: {
    AppNavigation
  },
  data() {
    return {};
  }
};
</script>

<style></style>
