import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api from '@/api.config.js';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'https://api.edamam.com/search',
    recipes: [],
    user: null,
    userRecipes: {},
    isAuthenticated: false,
    error: false
  },
  getters: {
    apiUrl: state => {
      return state.apiUrl;
    },
    recipes: state => {
      return state.recipes;
    },
    isAuthenticated: state => {
      return state.user !== null && state.user !== undefined;
    },
    userRecipes: state => {
      return state.userRecipes;
    },
    error: state => {
      return state.error;
    }
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserRecipes(state, payload) {
      state.userRecipes = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    async getRecipes({ getters, commit }, payload) {
      try {
        let response = await axios.get(getters.apiUrl, {
          params: {
            q: payload,
            app_id: api.appId,
            app_key: api.appKey,
            from: 0,
            to: 9
          }
        });
        commit('setRecipes', response.data.hits);
      } catch {
        commit('setRecipes', []);
      }
    },
    userJoin({ commit }, { email, password }) {
      commit('setError', '');
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user.user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch(error => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          commit('setError', error);
        });
    },
    userLogin({ commit }, { email, password }) {
      commit('setError', '');
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user.user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch(error => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          commit('setError', error);
        });
    },
    userSignOut({ commit }) {
      commit('setError', '');
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setUserRecipes', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setUserRecipes', null);
          commit('setIsAuthenticated', false);
        });
    },
    addRecipe({ state }, payload) {
      firebase
        .database()
        .ref('users')
        .child(state.user.uid)
        .push({
          name: payload.recipe.label,
          calories: payload.recipe.calories,
          imageUrl: payload.recipe.image,
          healthLabels: payload.recipe.healthLabels,
          cautions: payload.recipe.cautions,
          uri: payload.recipe.uri
        });
    },
    getUserRecipes({ state, commit }) {
      return firebase
        .database()
        .ref('users/' + state.user.uid)
        .once('value', snapshot => {
          commit('setUserRecipes', snapshot.val() || {});
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', payload);
    },

    deleteUserRecipe({ state }, payload) {
      firebase
        .database()
        .ref('users/' + state.user.uid)
        .child(payload.id)
        .set(null);
    }
  }
});
