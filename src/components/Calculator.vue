<template>
<v-container fluid p1 grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12 class="pb-0">
      <v-container fluid class="pa-0">
        <v-layout row wrap>
          <v-flex xs12 class="pa-0">
            <cost-chart
              :chartData="dataCollection"
              :options="chartOptions"
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
              :label="`Monthly Budget: $${monthlyInc}`"
              :value="monthlyInc"
              @input="changeCriteria({ monthlyInc: $event })"
              :min="minMonthlyInc"
              max="5000"
              step="50"></v-slider>
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
          :pagination.sync="pagination">
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg3>
            <inputs-card
              :item="props.item"
              :index="props.index">
            </inputs-card>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CostChart from '@/components/CostChart'
import InputsCard from '@/components/inputs/Card'

export default {
  components: { CostChart, InputsCard },
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
      chartOptions: {
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
      'inputSets',
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
      'addInput',
      'removeInput',
      'calcDataset',
    ]),
  },
  mounted() {
    this.calcDataset()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
