<template>
  <v-row class="text-center">
    <v-col>
      <v-card max-width="900" class="mx-auto">
        <v-toolbar color="blue" dark>
          <v-toolbar-title v-if="recipes.length > 0"
            >Recipe List</v-toolbar-title
          >

          <v-spacer></v-spacer>

          <v-text-field
            v-if="recipes.length > 0"
            v-model="searchText"
            v-on:keyup.enter="onEnter"
            class="mt-8"
            outlined
            dense
            label="Search Ingredients"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-toolbar>
        <div class="recipes">
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in recipes"
                :key="i"
                @click="getRecipeIndex(i)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-silverware-fork-knife</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.recipe"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Search Results
        </v-card-title>

        <v-card-text>
          <div class="recipes">
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in results"
                :key="i"
                @click="getRecipeIndexSearch(item)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-silverware-fork-knife</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.recipe"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        </v-card-text>

        <v-divider></v-divider>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    results: [],
    searchText: "",
    status: false,
    dialog: false
    
  }),
  computed: {
    recipes() {
      return this.$store.getters.getRecipes;
    },
    filterData(){
      return this.searchText.split(",");
    }
  },
  watch: {},
  methods: {
   
   onEnter() {
    
    
    this.results = this.recipes.filter(item => item.ingredients.some(
        ingredient => this.filterData.every(f => ingredient.includes(f)))
      )
    
    this.dialog = true
    },
    getRecipeIndex(index) {
      this.$store.dispatch("setRecipeIndex", index);
    },
    getRecipeIndexSearch(data) {
    
      this.$store.dispatch("setRecipeIndex",this.recipes.indexOf(data));
    },
  },
};
</script>

<style scoped>
.recipes {
  max-height: 150px;
  overflow: auto;
  text-align: left;
}
</style>
