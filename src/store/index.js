import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedRecipeIndex: 0,
    recipes: []
  },
  mutations: {
    loadData(state, payload) {
      state.recipes = payload
    },
    addRecipe(state, payload) {
      state.recipes = [...state.recipes,payload]
    },

    editRecipe(state, {index, data}) {
      // state.recipes[index] = data
      Vue.set(state.recipes, index, data);
    },
    setRecipeIndex(state, payload) {
      state.selectedRecipeIndex = payload;
    },
    deleteRecipe(state, payload) {
      if(payload > 0) {
        state.selectedRecipeIndex = state.selectedRecipeIndex -1
      }
     
      state.recipes.splice(payload, 1);

    }
  },
  actions: {
    async loadData(state, payload) {
      try {
        state.commit("loadData", payload);
      } catch (err) {
        console.log("request error : " + err.message);
        
      }
    },
    async addRecipe(state, payload) {
      try {
        state.commit("addRecipe", payload);
      } catch (err) {
        console.log("request error : " + err.message);
        
      }
    },
    async editRecipe(state, payload) {
      try {
        state.commit("editRecipe", payload);
      } catch (err) {
        console.log("request error : " + err.message);
        
      }
    },
    async setRecipeIndex(state, payload) {
      try {
        state.commit("setRecipeIndex", payload);
      } catch (err) {
        console.log("request error : " + err.message);
        
      }
    },
    async deleteRecipe(state, payload) {
      try {
        state.commit("deleteRecipe", payload);
      } catch (err) {
        console.log("request error : " + err.message);
        
      }
    },
  },
  modules: {
  },
  getters: {
    getRecipes: (state) => state.recipes,
    getRecipeIndex: (state) => state.selectedRecipeIndex
  }
})
