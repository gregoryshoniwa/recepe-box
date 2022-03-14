<template>
  <v-app>
    <v-main>
      <Heading/>
      <Recipes/>
      <RecipeBody/>
    </v-main>
  </v-app>
</template>

<script>


import Recipes from './components/Recipes';
import RecipeBody from './components/RecipeBody';
import Heading from './components/Heading';

export default {
  name: 'App',

  components: {
    Heading,Recipes,RecipeBody
  },
  mounted(){
    
    
    this.$store.dispatch("loadData");
    
  },
  data: () => ({
    
  }),
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
