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
  <v-container fluid class="pb-1">
    <v-layout row>
      <v-flex xs5 class="pa-1">
        <v-text-field
          label="Monthly Payment"
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
                    <v-list-tile-content>Homeowners Insurace:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ item.insur.toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>PMI:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ item.pmi.toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="pr-1">Maintenance/Improvements:</v-list-tile-content>
                    <v-list-tile-content class="align-end">${{ ((item.main + item.improv) / 12).toFixed(2) }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Mortgage Payment"
          disabled
          :value="item.morgPmt.toFixed(2)"
          prefix="$"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
  <inputs-data :item="item"></inputs-data>
  <v-divider></v-divider>
  <inputs-calc :item="item"></inputs-calc>
</v-card>
</template>

<script>
import { mapActions } from 'vuex'
import InputsData from '@/components/inputs/Data'
import InputsCalc from '@/components/inputs/Calculations'

export default {
  components: { InputsData, InputsCalc },
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
