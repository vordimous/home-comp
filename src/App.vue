<template>
  <v-app dark>
     <v-navigation-drawer
      clipped
      fixed
      :mini-variant.sync="mini"
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="static/img/icons/apple-touch-icon.png" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Real Cost Calculators</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <router-view/>
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home Cost', icon: 'home' },
        { title: 'About', icon: 'question_answer' },
      ],
      mini: true,
      right: null,
    }
  },
  name: 'App',
}
</script>
