<template>
 <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12 class="pa-0">
        <cost-chart
          :chartData="dataCollection"
          :options="options"
          :height="500" />
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex xs1 class="pa-0">
        <v-btn small p1 color="success" @click="addInput">Add</v-btn>
      </v-flex>
      <v-flex xs3 class="pa-0">
        <v-slider
          :label="`Years: ${years}`"
          :value="years"
          @input="changeCriteria({ years: $event })"
          max="50"></v-slider>
      </v-flex>
      <v-flex xs5 class="pa-0">
        <v-slider
          :label="`Monthly Budget: ${monthlyInc}`"
          :value="monthlyInc"
          @input="changeCriteria({ monthlyInc: $event })"
          :min="minMonthlyInc"
          max="10000"
          step="100"></v-slider>
      </v-flex>
      <v-flex xs3 class="pa-0">
        <v-slider
          :label="`Annual Value Icrease: ${valIncreasePerc}%`"
          :value="valIncrease"
          @input="changeCriteria({ valIncrease: $event })"
          max="0.2"
          min="-0.2"
          step="0.005"></v-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CostChart from '@/components/CostChart'

export default {
  name: 'CalcChart',
  components: { CostChart },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'white',
          },
        },
        title: {
          display: true,
          text: 'Cost Analysis',
          fontColor: 'white',
        },
        animation: {
          duration: 0, // general animation time
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white',
              callback: value => `$${value}`,
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
            },
            gridLines: {
              display: false,
              color: 'rgba(255, 255, 255, 0.2)',
            },
          }],
        },
        tooltips: {
          callbacks: {
            label: (item, data) =>
              JSON.stringify(data.datasets[item.datasetIndex].data[item.index], null, 2),
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters([
      'dataCollection',
      'years',
      'monthlyInc',
      'minMonthlyInc',
      'valIncrease',
      'valIncreasePerc',
    ]),
  },
  methods: {
    ...mapActions([
      'changeCriteria',
      'updateMonthlyInc',
      'addInput',
    ]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
