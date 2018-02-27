<template>
  <v-app dark>
     <v-navigation-drawer
      clipped
      fixed
      :mini-variant="mini"
      app
      hidden-xs-only>
        <v-list class="pa-0">
          <v-list-tile>
            <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
          </v-list-tile>
          <v-list-tile  to="/">
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
      <v-list dense class="pt-0">
        <v-tooltip right :disabled="!mini" v-for="item in items" :key="item.title">
          <v-list-tile :to="item.path" slot="activator">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>

    <router-view/>
    <v-bottom-nav
      app
      fixed
      :value="showBotNav"
      hidden-md-only>
      <v-btn flat color="primary" to="/">
        <span>Landing</span>
        <v-icon>fas fa-mobile-alt</v-icon>
      </v-btn>
      <v-btn flat color="primary" v-for="item in items" :key="item.title" :to="item.path">
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Home Cost', icon: 'fas fa-home', path: '/home' },
        { title: 'Discussion', icon: 'question_answer', path: '/discuss' },
      ],
      mini: true,
      right: null,
    }
  },
  computed: {
    showBotNav () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return true
        default: return false
      }
    }
  },
  name: 'App',
}
</script>

<style scoped>
.list__tile__action, .list__tile__avatar, .list__tile__action .input-group--selection-controls{
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-width: 48px;
}
</style>
