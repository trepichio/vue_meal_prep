<template>
  <v-container fluid>
    <v-row class="flex-column">
      <v-col class="mt-4">
        <template v-slot:header>
          <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
            <v-toolbar-title>My Recipes</v-toolbar-title>
          </v-toolbar>
        </template>
        <v-data-iterator
          :items="userRecipes"
          :items-per-page.sync="itemsPerPage"
          :footer-props="{ itemsPerPageOptions }"
        >
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="(item, idx) in props.items"
                :key="idx"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card class="fill-height d-flex flex-column">
                  <v-responsive style="flex: none">
                    <v-img
                      :src="item.imageUrl"
                      maxHeight="100%"
                      aspectRatio="1"
                    ></v-img>
                  </v-responsive>
                  <v-card-title
                    ><h4>{{ item.name }}</h4></v-card-title
                  >
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Calories:</v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.calories
                      }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Health Labels:</v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.healthLabels.join(', ')
                      }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Cautions:</v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.cautions.join(', ')
                      }}</v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-card-actions class="mt-auto">
                    <v-btn color="error" @click="deleteItem(item)"
                      >Remove</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
        <v-btn color="primary" to="/menu">Go To Menu</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',

  data: () => ({
    itemsPerPageOptions: [4, 8, 12],
    itemsPerPage: 4
  }),
  computed: {
    userRecipes() {
      let obj = this.$store.getters.userRecipes || {};
      return Object.keys(obj).map(key => {
        return { ...obj[key], id: key };
      });
    }
  },
  methods: {
    getRecipes() {
      this.$store.dispatch('getUserRecipes');
    },
    deleteItem(item) {
      this.$store.dispatch('deleteUserRecipe', item);
      this.$store.dispatch('getUserRecipes');
    }
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch('getUserRecipes');
    }
  }
};
</script>

<style scoped></style>
