<template>
<v-content>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12 class="pa-0">
        <disqus shortname="realcostcalc"
          url="https://www.realcosctcalc.com/#/discuss"></disqus>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</template>

<script>
import Disqus from 'vue-disqus/VueDisqus'

export default {
  components: {
    Disqus,
  },
}
</script>
