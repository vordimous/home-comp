<template>
 <v-container fluid>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Purchase Price (Value)"
          v-model="item.pp"
          prefix="$"
          @change="calcDp"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Down Paymet"
          v-model="item.dp"
          prefix="$"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Maintenance"
          v-model="item.main"
          prefix="$"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Improvements"
          v-model="item.improv"
          prefix="$"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Homeowners Insurance"
          v-model="item.homeIns"
          suffix="%"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Monthly (PMI)"
          v-model="item.pmi"
          prefix="$"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Mortgage Lenth"
          v-model="item.lenMorg"
          suffix="yr(s)"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Mortgage Interest Rate"
          v-model="item.morgRt"
          suffix="%"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Property Tax"
          v-model="item.tax"
          suffix="%"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Income Tax Rate"
          v-model="item.morgRt"
          suffix="%"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Realtor Commission"
          v-model="item.saleComm"
          suffix="%"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Closing Costs"
          v-model="item.saleCost"
          prefix="$"
          @change="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['item'],
  methods: {
    ...mapActions([
      'calcDataset',
    ]),
    recalc() {
      this.item.calcPmts()
      this.calcDataset()
    },
    calcDp() {
      this.item.dp = (0.2 * this.item.pp).toFixed(2)
      this.recalc()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
