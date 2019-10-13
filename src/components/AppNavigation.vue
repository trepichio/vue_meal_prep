<template>
  <span>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      dark
      disable-resize-watcher
      class="brown ligthen-2"
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item v-if='!isAuthenticated || item.visibleAuthenticated' link :key="index" :to='item.url'>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
        <v-list-item v-if='isAuthenticated' @click='logout'>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="brown darken-4" dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="flex-grow-1 hidden-md-and-up"></div>
      <router-link to="/">
        <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      </router-link>
      <v-btn to="/menu" text class="hidden-sm-and-down">Menu</v-btn>
      <div class="flex-grow-1 hidden-sm-and-down"></div>

      <div v-if='!isAuthenticated' class="hidden-sm-and-down">
        <v-btn to="/sign-in" text>SIGN IN</v-btn>
        <v-btn to="/join" color="brown ligthen-3">JOIN</v-btn>
      </div>
      <div v-else class="hidden-sm-and-down">
        <v-btn to='/about' text>PROFILE</v-btn>
        <v-btn @click="logout" text outlined color='white'>Logout</v-btn>
      </div>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  name: 'appNavigation',

  data() {
    return {
      items: [
        { title: 'Menu'    , url: '/menu'    , visibleAuthenticated: true },
        { title: 'Profile' , url: '/about'   , visibleAuthenticated: true },
        { title: 'Sign In' , url: '/sign-in' , visibleAuthenticated: false },
        { title: 'Join'    , url: '/join'    , visibleAuthenticated: false },
      ],
      drawer: null,
      appTitle: 'Meal Prep'
    };
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('userSignOut')
    }
  }
};
</script>

<style scoped>
  a, a:visited {
    color: white;
    text-decoration: none;
  }
</style>
