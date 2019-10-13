<template>
  <v-container>
    <v-row>
      <v-col xs12 class="text-xs-center display-1 font-weight-black my-5">
        Available Meal Plans
      </v-col>
    </v-row>
    <v-row class="flex-wrap">
      <v-col cols="12" md="4">
        <v-card fill-height>
          <v-responsive>
            <v-img
              src="http://source.unsplash.com/hjCA3ecCXAQ"
              style="height: 500px"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <span class="headline white--text">KETO</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-responsive>
          <v-card-text class="text--primary">
            <div>
              <h3 class="headline mb-0">Keto</h3>
              <div>
                The Keto diet is a high-fat, adequate-protein, low-carbohydrate
                diet. The diet forces the body to burn fats rather than
                carbohydrates by putting the body into ketosis.
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="['menu'].includes($route.name)"
              outlined
              block
              color="green"
              @click="ShowRecipes('keto')"
            >
              Select This Plan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card style="height: 100%">
          <v-responsive>
            <v-img
              src="http://source.unsplash.com/6S27S6pZ6o0"
              style="height: 500px"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <span class="headline white--text">PALEO</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-responsive>
          <v-card-text class="text--primary">
            <div>
              <h3 class="headline mb-0">Paleo</h3>
              <div>
                The Paleo diet requires the predominant consumption of foods
                presumed to have been the only foods available to or consumed by
                humans during the Paleolithic era.
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="['menu'].includes($route.name)"
              outlined
              block
              color="green"
              @click="ShowRecipes('paleo')"
            >
              Select This Plan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card style="height: 100%">
          <v-responsive>
            <v-img
              src="http://source.unsplash.com/1SPu0KT-Ejg"
              style="height: 500px"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <span class="headline white--text">VEGAN</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-responsive>
          <v-card-text class="text--primary">
            <div>
              <h3 class="headline mb-0">Vegan</h3>
              <div>
                The vegan diet abstains from the use of animal products. The
                vegan diet does not consume meat, diary products, eggs or any
                all other animal-derived ingredients.
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="['menu'].includes($route.name)"
              outlined
              block
              color="green"
              @click="ShowRecipes('vegan')"
            >
              Select This Plan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomePlans',

  data() {
    return {};
  },
  methods: {
    ShowRecipes(plan) {
      this.$store.dispatch('getRecipes', plan);
      this.$vuetify.goTo('#meal-recipes-container', {
        easing: 'easeInOutQuint',
        duration: 989,
        offset: 0
      });
    }
  }
};
</script>

<style scoped></style>
