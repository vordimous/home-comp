<template>
<v-container
  fluid
  p1
  grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12>
      <calc-chart :inputSets="inputSets"/>
    </v-flex>
  </v-layout>
  <v-layout row wrap
    v-for="(inputs, i) in inputSets" :key="inputs.id">
    <v-flex xs12>
      <v-card tile>
        <v-card-title primary-title>
          <v-btn @click="remove(i)"
            small
            color="error">
              <v-icon>delete</v-icon>
            </v-btn>
          <h3 v-bind:style="{color: inputs.color}">Calculation</h3>
        </v-card-title>
        <v-container fluid class="pb-1">
          <v-layout row>
            <v-flex xs6 class="pa-1">
              <v-text-field
                label="Purchase Price (Value)"
                :value="inputs.pp"
                @blur="recalc(i, $data)"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pa-1">
              <v-text-field
                label="Down Paymet"
                :value="inputs.dp"
                @blur="recalc(i, $data)"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs4>
      <v-btn color="success" @click="add">Add</v-btn>
    </v-flex>
  </v-layout>
</v-container>
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
      dp: 0,
      lenMorg: 15,
      tax: 0,
      pmi: 0,
      main: 300,
      improv: 800,
    // }), new Inputs({
    //   pp: 400000,
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
    recalc(i, data) {
      this.inputSets.$set(i, data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  /* height: 500px; */
}
</style>
