<template>
<v-container fluid class="pb-1 results">
  <!-- <v-layout row><pre> {{JSON.stringify(item, null, 1)}}</pre></v-layout> -->
  <v-layout row><h4>Totals after {{years}} yrs:</h4></v-layout>
  <v-layout row>
    <v-flex xs6 class="pa-0">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Total Invested:</v-list-tile-content>
          <v-list-tile-content class="align-end">${{ item.totalInv.toFixed(2) }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Leftover Budget:</v-list-tile-content>
          <v-list-tile-content class="align-end">${{ item.totalLeft.toFixed(2) }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xst class="pa-0">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Sale Profit:</v-list-tile-content>
          <v-list-tile-content class="align-end">${{ item.sellProfit.toFixed(2) }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Net gane:</v-list-tile-content>
          <v-list-tile-content class="align-end">${{ net.toFixed(2) }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row>
    <v-flex xs12 class="pa-3">
      <v-list dense>
        <v-list-tile class="stuff">
          <v-list-tile-content><h3>Money in the Bank:</h3></v-list-tile-content>
          <v-list-tile-content class="align-end"><h3>${{ bank.toFixed(2) }}</h3></v-list-tile-content>
        </v-list-tile>
      </v-list>
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
    net() {
      return (this.item.sellProfit - this.item.totalInv)
    },
    bank() {
      return (this.net + this.item.totalLeft)
    },
  },
}
</script>

<style>
.results *.list__tile {
  padding: 0 5px !important;
}
</style>
