<template>
	<v-container class='grid-list-lg' id='meal-recipes-container'>
		<v-row class='flex-wrap'>
			<v-col
				cols='12' xs='12' sm='6' md='6' lg='4'
				v-for='(item, index) in recipes'
				:key='index'
			>
				<v-card class='fill-height d-flex flex-column'>
					<v-responsive style='flex: none'>
						<v-img :src='item.recipe.image' maxHeight='100%' aspectRatio='1'></v-img>
					</v-responsive>
					<v-card-text>
						<div class="title my-3">{{ item.recipe.label }}</div>

						<div class="subheading">Ingredients</div>
						<ul>
							<li v-for='(ingredient, i) in item.recipe.ingredientLines'
								:key='i'
							>
								{{ ingredient }}
							</li>
						</ul>
					</v-card-text>

					<v-card-actions class='mt-auto'>
						<v-badge
						         bottom
						         color="primary"
						         overlap
						         class="align-self-center"
						       >
						         <template v-slot:badge>
						           <span v-if='userRecipes.includes(item.recipe.uri)'>✔</span>
						         </template>
								<v-btn @click="orderRecipe(item)" color='green' dark>Order</v-btn>
						       </v-badge>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {

  name: 'MealRecipes',

  data () {
    return {

    }
  },
  computed: {
    recipes () {
      return this.$store.getters.recipes;
    },
    isAuthenticated() {
    	return this.$store.getters.isAuthenticated;
    },
    userRecipes () {

     let obj = this.$store.getters.userRecipes || {}
     return Object.keys(obj)
     	.map(key => {
     		return obj[key].uri
     	});
     // return obj
    }
  },
  methods: {
    orderRecipe (item) {
    	if (this.isAuthenticated) {
    		if (!this.userRecipes.includes(item.recipe.uri)) {
		      this.$store.dispatch('addRecipe', item);
			  	this.$store.dispatch('getUserRecipes');
    		}
    	}
    	else {
    		this.$router.push('/sign-in')
    	}
    }
  },
  mounted() {
    	if (this.isAuthenticated)
		  	this.$store.dispatch('getUserRecipes')
  }
}
</script>

<style scoped>
</style>