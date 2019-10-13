<template>
  <v-container fluid fill-height>
    <v-row align='center' justify='center'>
    	<v-col cols='12' xs='12' sm='8' md='4' >
				<v-card elevation='12'>
					<v-toolbar color='primary' dark>
						<v-toolbar-title>Login Form</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form ref='form' v-model='valid' lazy-validation @keyup.native.enter='valid && submit($event)'>
							<v-text-field
								prepend-icon='mdi-account'
								name='email'
								label='E-mail'
								type='email'
								v-model='email'
								:rules='emailRules'
								autocomplete='username'
								required
							>
								E-mail
							</v-text-field>
							<v-text-field
								prepend-icon='mdi-lock'
								name='password'
								label='Password'
								type='password'
								v-model='password'
								:rules='passwordRules'
								autocomplete='password'
								required
							>
								Password
							</v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
			      <v-btn
			      	color='primary'
			      	:disabled='!valid'
			      	@click='submit'
			      >
			    		Login
			    	</v-btn>
			    </v-card-actions>
	    	</v-card>
			</v-col>
    </v-row>
    <error-dialog></error-dialog>
  </v-container>
</template>

<script>
import errorDialog from '@/components/errorDialog.vue';

export default {
  name: 'SignIn',
  components: {
    errorDialog,
  },
  data() {
    return {
    	valid: false,
    	email: '',
    	password: '',
    	emailRules: [
    		v => !!v || 'E-mail is required!',
    		v => /.+@.+\..+/.test(v) || 'E-mail must be valid!'
    	],
    	passwordRules: [
    		v => !!v || 'Password is required!',
    		v => v.length >= 6 || 'Password must be greater than 6 characters.'
    	],
    };
  },
  methods: {
    submit () {
    	if (this.$refs.form.validate()) {
    		this.$store.dispatch('userLogin', {
    			email: this.email,
    			password: this.password
    		})
    	}
    }
  }
};
</script>

<style scoped></style>
