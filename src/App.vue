<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Home Price Comparison',
    };
  },
  name: 'App',
};
</script>
