<template>
	<div class="text-center">
	    <v-dialog
	      v-model="dialog"
	      width="500"
	    >

	      <v-card>
	        <v-card-title
	          class="headline grey lighten-2"
	          primary-title
	        >
	          Something wrong happened!
	        </v-card-title>

	        <v-card-text class='mt-6'>
	          {{error.message}}
	        </v-card-text>

	        <v-divider></v-divider>

	        <v-card-actions>
	          <div class="flex-grow-1"></div>
	          <v-btn
	            color="primary"
	            text
	            @click="closeDialog"
	          >
	            OK
	          </v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>
	  </div>
</template>

<script>
export default {

  name: 'errorDialog',

  data () {
    return {
    	dialog: false
    }
  },
  computed: {
    error () {
		return this.dialog = this.$store.getters.error;
    }
  },
  methods: {
    closeDialog () {
      this.$store.commit('setError', '')
    }
  }
}
</script>

<style scoped>
</style>