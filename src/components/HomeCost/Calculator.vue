<template>
<v-content>
  <v-container fluid class="pa-0">
    <v-card color="blue-grey darken-4" class="white--text">
      <v-card-title primary-title class="pb-0">
        <div class="headline">Real Home Cost and Comparison</div>
        <span class="grey--text pl-3 pt-1">Finding out what actually goes into owning a home is a hard number to come up with. So many factors cause large changes in if or when property will pay off. This tool helps you take a budgeted amount of money and shows you how far that investment gets you. Most importantly it shows you what happens to the money you don't invest and keep in the bank. That is money that can be used in any way you can imagine. </span>
      </v-card-title>
      <v-card-actions>
        <v-layout row wrap align-center>
          <v-flex xs12 sm6 md5 class="pa-0">
            <v-slider
              :label="`Monthly Budget: $${monthlyInc}`"
              :value="monthlyInc"
              @input="changeCriteria({ monthlyInc: $event })"
              :min="minMonthlyInc"
              hide-details
              class="pt-1 px-1"
              max="5000"
              step="50"></v-slider>
          </v-flex>
          <v-flex xs12 sm6 md3 class="pa-0">
            <v-slider
              :label="`Annual Value Icrease: ${valIncreasePerc}%`"
              :value="valIncrease"
              @input="changeCriteria({ valIncrease: $event })"
              hide-details
              class="pt-1 px-1"
              max="0.1"
              min="-0.1"
              step="0.001"></v-slider>
          </v-flex>
          <v-flex xs8 sm10 md3 class="pa-0">
            <v-slider
              :label="`Years: ${years}`"
              :value="years"
              @input="changeCriteria({ years: $event })"
              hide-details
              class="pt-1 px-1"
              max="50"></v-slider>
          </v-flex>
          <v-flex xs4 sm2 md1 class="ma-0 pa-0">
            <v-btn small color="success" @click="addInput">Add</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>

    <v-layout row wrap>
      <v-flex md6 xs12 class="pa-0">
        <chart
          :chartData="dataCollection"
          :options="chartOptions"
          :height="700" />
      </v-flex>
      <v-flex md6 xs12 class="pa-0">
        <v-container fluid grid-list-md>
          <v-data-iterator
            content-tag="v-layout"
            row
            wrap
            :items="inputSets"
            :pagination.sync="pagination">
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md6
              lg6>
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
</v-content>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Chart from '@/components/HomeCost/Chart'
import InputsCard from '@/components/HomeCost/Card'

export default {
  components: { Chart, InputsCard },
  data() {
    return {
      pagination: {
        rowsPerPage: 2,
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
          duration: 0,
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
            label: (item, data) => this.dataCollection.datasets[item.datasetIndex].data[item.index].dataString,
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

<style scoped>
</style>
