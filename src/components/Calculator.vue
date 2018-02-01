<template>
<div>
  <div class="chart">
    <calc-chart :inputSets="inputSets"/>
  </div>
  <div v-for="inputs in inputSets" :key="inputs.id" class="inputs">
    <input v-model="inputs.pp"/>
  </div>
</div>
</template>

<script lang="ts">
import CalcChart from '@/components/CalcChart';
import Inputs from '../models/inputs';

export default {
  name: 'calculator',
  components: { CalcChart },
  data() {
    return {
      inputSets: [],
    };
  },
  mounted() {
    this.inputSets = [new Inputs({
      pp: 25000,
      lenMorg: 15,
      tax: 0,
      pmi: 0,
      main: 300,
      improv: 800,
    }), new Inputs({
      pp: 400000,
    }), new Inputs({
      pp: 150000,
    })];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chart {
  /* height: 500px; */
}
</style>
