<template>
<div>
  <div class="chart">
    <calc-chart :inputSets="inputSets"/>
  </div>

  <v-container
    v-for="inputs in inputSets" :key="inputs.id"
    fluid
    p1
    style="min-height: 0;"
    grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card tile>
          <v-container fluid class="pb-1">
            <v-layout row>
              <v-flex xs6 class="pa-1">
                <v-text-field
                  label="Purchase Price (Value)"
                  :value="inputs.pp"></v-text-field>
              </v-flex>
              <v-flex xs6 class="pa-1">
                <v-text-field
                  label="Down Paymet"
                  :value="inputs.dp"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
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
<style scoped>
.chart {
  /* height: 500px; */
}
</style>
