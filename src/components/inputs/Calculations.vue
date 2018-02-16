<template>
<v-container fluid class="pb-1">
  <!-- <v-layout row><pre> {{JSON.stringify(item, null, 1)}}</pre></v-layout> -->
  <v-layout row><h4>Totals after {{years}} yrs:</h4></v-layout>
  <v-layout row>
    <v-flex xs5 class="pa-1">
      <v-text-field
        label="Total Intrest"
        disabled
        :value="item.monPmt.toFixed(2)"
        prefix="$"
        hide-details
        type="number"></v-text-field>
    </v-flex>
    <v-flex xs1 class="pa-0">
      <v-container text-xs-center fill-height class="pa-0">
        <v-layout row wrap align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <v-tooltip right>
              <v-icon small slot="activator">fa-info</v-icon>
              <span>All expenses broken down per month:</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs5 class="pa-1">
      <v-text-field
        label="Total Insurance/Upkeep"
        disabled
        :value="item.morgPmt.toFixed(2)"
        prefix="$"
        hide-details
        type="number"></v-text-field>
    </v-flex>
    <v-flex xs1 class="pa-0">
      <v-container text-xs-center fill-height class="pa-0">
        <v-layout row wrap align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <v-tooltip right>
              <v-icon small slot="activator">fa-info</v-icon>
              <span>All expenses broken down per month:</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs5 class="pa-1">
      <v-text-field
        label="Spent on income"
        disabled
        :value="item.monPmt.toFixed(2)"
        prefix="$"
        hide-details
        type="number"></v-text-field>
    </v-flex>
    <v-flex xs1 class="pa-0">
      <v-container text-xs-center fill-height class="pa-0">
        <v-layout row wrap align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <v-tooltip right>
              <v-icon small slot="activator">fa-info</v-icon>
              <span>All expenses broken down per month:</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs5 class="pa-1">
      <v-text-field
        label="Mortgage Payment"
        disabled
        :value="item.morgPmt.toFixed(2)"
        prefix="$"
        hide-details
        type="number"></v-text-field>
    </v-flex>
    <v-flex xs1 class="pa-0">
      <v-container text-xs-center fill-height class="pa-0">
        <v-layout row wrap align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <v-tooltip right>
              <v-icon small slot="activator">fa-info</v-icon>
              <span>All expenses broken down per month:</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['item'],
  computed: {
    ...mapGetters([
      'years',
    ]),
  },
}
</script>
