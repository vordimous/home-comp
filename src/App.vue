<template>
  <v-app dark>
    <v-navigation-drawer
      clipped
      fixed
      :mini-variant="true"
      app
      hidden-xs-only>
      <v-list>
        <v-list-tile  to="/">
          <v-list-tile-avatar>
            <img src="static/img/icons/apple-touch-icon.png" >
          </v-list-tile-avatar>
        </v-list-tile>
        <v-tooltip right v-for="item in items" :key="item.title">
          <v-list-tile :to="item.path" slot="activator">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
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
    },
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
