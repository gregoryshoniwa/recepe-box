<template>
  <div>
    <v-row class="text-center">
      <v-col>
        <v-card max-width="900" class="mx-auto">
          <v-toolbar color="blue" dark>
            <v-toolbar-title
              >{{ recipesList[selectedItem].recipe }} : Recipe
              Selected</v-toolbar-title
            >

            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="addRecipe">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Add Recipe</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="editRecipe">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit Recipe</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="deleteRecipe">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete Recipe</span>
            </v-tooltip>
          </v-toolbar>
          <div class="recipe-body">
            <br />
            <h3>Ingredients</h3>
            <br />
            <ul>
              <li
                v-for="(item, i) in recipesList[selectedItem].ingredients"
                :key="`ing${i}`"
              >
                {{ item }}
              </li>
            </ul>
            <br />
            <h3>Directions</h3>
            <br />
            <ul>
              <li
                v-for="(item, i) in recipesList[selectedItem].directions"
                :key="`dir${i}`"
              >
                {{ i + 1 }}. {{ item }}
              </li>
            </ul>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ dialogType }} Recipe
        </v-card-title>

        <v-card-text>
          <v-text-field
            class="mt-6"
            label="Recipe Name"
            outlined
            v-model="recipe"
          ></v-text-field>
          <v-textarea
            outlined
            class="mt-2"
            label="Enter Ingredients"
            v-model="ingredients"
          ></v-textarea>
          <v-textarea
            outlined
            class="mt-2"
            label="Enter Directions"
            v-model="directions"
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false"> Save </v-btn>
          <v-btn color="error" @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogType: "",
    recipe: "",
    ingredients: "",
    directions: "",
  }),
  computed: {
    selectedItem() {
      return this.$store.getters.getRecipeIndex;
    },
    recipesList() {
      return this.$store.getters.getRecipes;
    },
  },

  methods: {
    addRecipe() {},
    editRecipe() {},
    deleteRecipe() {
      this.$store.dispatch("deleteRecipe", this.selectedItem);
      
    },
  },
};
</script>

<style scoped>
.recipe-body {
  height: 300px;
  overflow: auto;
  text-align: left;
}
li {
  margin-left: 30px;
}
h3 {
  margin-left: 10px;
}
</style>
