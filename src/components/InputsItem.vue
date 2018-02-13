<template>
<v-card>
  <v-card-title class="pa-1" primary-title v-bind:style="{'background-color': item.color}">
    <v-btn @click="checkDel" small icon class="shadow"><v-icon>delete</v-icon></v-btn>
  </v-card-title>
   <v-container fluid class="pb-1">
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Monthly Payment"
          disabled
          :value="item.monPmt.toFixed(2)"
          prefix="$"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Mortgage Payment"
          disabled
          :value="item.morgPmt.toFixed(2)"
          prefix="$"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container fluid class="pb-1">
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Purchase Price (Value)"
          v-model="item.pp"
          prefix="$"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Down Paymet"
          v-model="item.dp"
          prefix="$"
          @blur="recalc"
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
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Improvements"
          v-model="item.improv"
          prefix="$"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Homeowners Insurance"
          v-model="item.homeIns"
          prefix="$"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Monthly (PMI)"
          v-model="item.pmi"
          prefix="$"
          @blur="recalc"
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
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Mortgage Interest Rate"
          v-model="item.morgRt"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Yearly Property Tax"
          v-model="item.tax"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Income Tax Rate"
          v-model="item.morgRt"
          @blur="recalc"
          hide-details
          type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <pre> {{JSON.stringify(item, null, 1)}}</pre>
  </v-container>
</v-card>
</template>

<script>

export default {
  name: 'inputs-item',
  props: ['item'],
  methods: {
    checkDel() {
      this.$emit('remove');
    },
    recalc() {
      this.$emit('updated');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shadow {
  text-shadow: 0 0 1px #303030
}
</style>
