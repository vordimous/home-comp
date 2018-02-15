<template>
<v-container
  fluid
  p1
  grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12 class="pb-0">
      <calc-chart ref="chart" @add="add" :inputSets="inputSets"/>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 class="pa-0">
      <v-container fluid grid-list-md>
        <v-data-iterator
          content-tag="v-layout"
          row
          wrap
          :items="inputSets"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg3>
            <inputs-item
              :item="props.item"
              @remove="remove(props.index)"
              @updated="recalc">
            </inputs-item>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import CalcChart from '@/components/CalcChart';
import InputsItem from '@/components/InputsItem';
import Inputs from '../models/inputs';

export default {
  name: 'calculator',
  components: { CalcChart, InputsItem },
  data() {
    return {
      inputSets: [],
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
    };
  },
  mounted() {
    this.inputSets = [new Inputs({
      pp: 25000,
      dp: 0,
      lenMorg: 15,
      tax: 0,
      pmi: 0,
      main: 300,
      improv: 800,
    }), new Inputs({
      pp: 150000,
    })];
  },
  methods: {
    add() {
      this.inputSets.push(new Inputs());
    },
    remove(i) {
      this.inputSets.splice(i, 1);
    },
    recalc() {
      this.$refs.chart.updateGraph();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
