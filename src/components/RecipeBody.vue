<template>
  <div>
    <v-row class="text-center">
      <v-col>
        <v-card max-width="900" class="mx-auto">
          <v-toolbar color="blue" dark>
            <v-toolbar-title
              ><span v-if="recipesList.length > 0">{{ recipesList[selectedItem].recipe }} : Recipe
              Selected</span><span v-else></span></v-toolbar-title
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
            <v-tooltip bottom v-if="recipesList.length > 0">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="editRecipe">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit Recipe</span>
            </v-tooltip>
            <v-tooltip bottom v-if="recipesList.length > 0">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="deleteRecipe">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete Recipe</span>
            </v-tooltip>
          </v-toolbar>
        
          <div class="recipe-body" v-if="recipesList.length > 0">
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
          <div class="recipe-body pa-4" v-else><h3>Sorry no data to display!</h3></div>
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
          <v-btn v-if="dialogType == 'Add'" color="primary" @click="save"> Save </v-btn>
          <v-btn v-if="dialogType == 'Edit'" color="primary" @click="update"> Update </v-btn>
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
 watch : {
   dialog(val){
     if(!val){
       this.recipe = ""
       this.ingredients = ""
       this.directions = ""
     }
   }
 },
  methods: {
    save() {
      if(this.recipe == "" && this.ingredients == "" && this.directions == ""){
        this.$swal.fire(
          'Recipe Box!',
          'Please enter a recipe, ingredient or directions before saving.',
          'warning'
        )
      }else{
        this.$store.dispatch("addRecipe", {recipe:this.recipe,ingredients:this.ingredients.split('\\'),directions:this.directions.split('\\')});
        this.dialog = false
        this.$swal.fire(
          'Recipe Box!',
          'You have successfully added a new recipe to your list.',
          'success'
        )
      }
      
    },
    update(){
      
      this.$store.dispatch("editRecipe", {index:this.selectedItem,data:{recipe:this.recipe,ingredients:this.ingredients.split('\\'),directions:this.directions.split('\\')}});
      this.dialog = false
        this.$swal.fire(
          'Recipe Box!',
          'You have successfully updated your recipe.',
          'success'
        )
    },
    addRecipe() {
      this.dialogType = "Add"
      this.dialog = true
    },
    editRecipe() {
      this.dialogType = "Edit"

      this.recipe = this.recipesList[this.selectedItem].recipe
      this.ingredients = this.recipesList[this.selectedItem].ingredients.join(' \\ ')
      this.directions = this.recipesList[this.selectedItem].directions.join(' \\\n\n')
      this.dialog = true
    },
    deleteRecipe() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: this,
      });

      swalWithBootstrapButtons
        .fire({
          title: `Are you sure you want to delete ${this.recipesList[this.selectedItem].recipe}?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your recipe has been deleted.",
              "success"
            );
            this.$store.dispatch("deleteRecipe", this.selectedItem);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your recipe is safe :)",
              "error"
            );
          }
        });
    },
  },
};
</script>

<style scoped>
.recipe-body {
  max-height: 300px;
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
