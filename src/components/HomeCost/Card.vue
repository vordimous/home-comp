<template>
<v-card class="inputs-card">
  <v-card-title class="pr-3 pl-1 pt-2 pb-2" p1 primary-title v-bind:style="{'border-color': item.color}">
    <v-btn @click="checkDel" small icon class="shadow"><v-icon>delete</v-icon></v-btn>
    <v-text-field
      label="Name"
      v-model="item.name"
      @change="calcDataset"
      hide-details></v-text-field>
  </v-card-title>
  <v-divider></v-divider>
  <v-container fluid class="pb-1 pt-1 results">
    <v-layout row>
      <v-flex xs11 class="pa-3">
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content><h3>Monthly Payment:</h3></v-list-tile-content>
            <v-list-tile-content class="align-end"><h3>${{ item.monPmt.toFixed(2) }}</h3></v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs1 class="pa-0">
        <v-container text-xs-center fill-height class="pa-0">
          <v-layout row wrap align-center class="pa-0">
            <v-flex xs12 class="pa-0">
              <v-tooltip right>
                <v-icon small slot="activator">fa-info</v-icon>
                <span>All expenses broken down per month:</span>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Mortgage Payment:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ item.morgPmt.toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Property Tax:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ item.propTax.toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="pr-1">Homeowners Insurace:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ item.insur.toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>PMI:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ item.pmi.toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-for="exp in item.yearlyExp" :key="exp.label">
                    <v-list-tile-content class="pr-1">{{ exp.label }}</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ ((exp.value) / 12).toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
  <input-data :item="item"/>
  <results :item="item"/>
</v-card>
</template>

<script>
import { mapActions } from 'vuex'
import InputData from '@/components/HomeCost/InputData'
import Results from '@/components/HomeCost/Results'

export default {
  components: { InputData, Results },
  props: ['item', 'index'],
  methods: {
    ...mapActions([
      'removeInput',
      'calcDataset',
    ]),
    checkDel() {
      this.removeInput(this.index)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.inputs-card .card__title {
  border-top-width: 5px;
  border-top-style: solid;
}
.inputs-card .shadow {
  text-shadow: 0 0 1px #303030
}
.inputs-card .tooltip--right i {
  color: #9e9e9e !important
}
</style>
