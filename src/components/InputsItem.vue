<template>
<v-card>
  <v-card-title class="pa-1" primary-title v-bind:style="{'background-color': item.color}">
    <v-btn @click="checkDel" small icon class="shadow"><v-icon>delete</v-icon></v-btn>
  </v-card-title>
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
    <!-- <pre> {{JSON.stringify(item, null, 1)}}</pre> -->
  </v-container>
  <v-divider></v-divider>
  <v-container fluid class="pb-0 pl-2"><h4>Totals after {{item.lenMorg}} yrs:</h4></v-container>
  <v-container fluid class="pb-1">
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
          @change="recalc"
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
          @change="recalc"
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
      this.item.calcPmts();
      this.$emit('updated');
    },
    calcDp() {
      this.item.dp = (0.2 * this.item.pp).toFixed(2);
      this.recalc();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shadow {
  text-shadow: 0 0 1px #303030;
}
.tooltip--right i {
  color: #9e9e9e !important;
}
</style>
