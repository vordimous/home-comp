<template>
<v-container fluid class="pb-1 results">
  <!-- <v-layout row><pre> {{JSON.stringify(item, null, 1)}}</pre></v-layout> -->
  <v-layout row>
    <v-flex xs11 class="pa-3">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content><h3>Money in the Bank:</h3></v-list-tile-content>
          <v-list-tile-content class="align-end"><h3>{{ bank | currency }}</h3></v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs1 class="pa-0">
      <v-container text-xs-center fill-height class="pa-0">
        <v-layout row wrap align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <v-tooltip right>
              <v-icon small slot="activator">fa-info</v-icon>
              <span>Totals after {{years}} yrs:</span>
               <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Total Invested:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ item.totalInv | currency }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content class="pr-1">Leftover Budget:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ item.totalLeft | currency }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Sale Profit:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ item.sellProfit | currency }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Net gane:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ net | currency }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
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
