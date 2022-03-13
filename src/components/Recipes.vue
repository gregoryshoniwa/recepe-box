<template>
  <v-row class="text-center">
    <v-col>
      <v-card max-width="900" class="mx-auto">
        <v-toolbar color="blue" dark>
          <v-toolbar-title>Recipe List</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-text-field
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
              <v-list-item v-for="(item, i) in recipes" :key="i" @click="getRecipeIndex(i)">
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
  </v-row>
</template>

<script>
export default {
  data: () => ({
    
  }),
  computed: {
    recipes() {
      return this.$store.getters.getRecipes;
    },
  },
  methods: {
      getRecipeIndex(index){
          this.$store.dispatch("setRecipeIndex", index);
          
      }
  }
};
</script>

<style scoped>
.recipes {
  height: 150px;
  overflow: auto;
  text-align: left;
}
</style>
