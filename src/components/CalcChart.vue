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
        <v-btn small p1 color="success" @click="$emit('add')">Add</v-btn>
      </v-flex>
      <v-flex xs3 class="pa-0">
        <v-slider
          :label="`Years: ${years}`"
          :value="years"
          @input="updateState({ years: $event })"
          max="50"></v-slider>
      </v-flex>
      <v-flex xs5 class="pa-0">
        <v-slider
          :label="`Monthly Budget: ${monthlyInc}`"
          :value="monthlyInc"
          @input="test({ monthlyInc: $event })"
          max="10000"
          step="100"></v-slider>
      </v-flex>
      <v-flex xs3 class="pa-0">
        <v-slider
          :label="`Annual Value Icrease: ${(valIncrease * 100).toFixed(1).toString()}%`"
          :value="valIncrease"
          @input="updateState({ valIncrease: $event })"
          max="0.2"
          min="-0.2"
          step="0.005"></v-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ISPMT, PPMT } from 'formulajs'
import CostChart from '@/components/CostChart'
import DataSet from '../models/dataSet'

export default {
  name: 'CalcChart',
  components: { CostChart },
  props: {
    inputSets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dataCollection: null,
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
      'years',
      'monthlyInc',
      'valIncrease',
    ]),
    labels() {
      const labels = []
      for (let month = 0; month <= this.years * 12; month += 6) {
        labels.push((month / 12).toFixed(1))
      }
      return labels
    },
  },
  watch: {
    inputSets(sets) {
      sets.forEach((set) => {
        if (set.monPmt > this.monthlyInc) {
          this.monthlyInc = set.monPmt
        }
      })
      this.updateGraph()
    },
    // years() {
    //   this.updateGraph()
    // },
    // monthlyInc() {
    //   this.updateGraph()
    // },
    // valIncrease() {
    //   this.updateGraph()
    // },
  },
  methods: {
    ...mapActions(['updateState']),
    test() {
      console.log(arguments)
    },
    updateGraph() {
      let datasets = []
      this.inputSets.forEach((element, i) => {
        datasets = datasets.concat(this.calcDataSets(element, i + 1))
      })
      this.dataCollection = { labels: this.labels, datasets }
      // if (datasets.length > 0) {
      // } else {
      //   this.dataCollection = {}
      // }
    },
    calcDataSets(inputs, i) {
      let sellVal
      let interest = 0
      let principle = 0
      let loan = -(inputs.pp - inputs.dp)
      let upkeep
      let sellCost
      let sellProfit
      let loss
      let gain
      let totalInv = 0
      let totalLeft = 0

      const invSet = new DataSet({
        label: `Invested ${i}`,
        color: this.colorLuminance(inputs.color, -0.2),
      })
      const costSet = new DataSet({
        label: `Value ${i}`,
        color: this.colorLuminance(inputs.color, -0.4),
      })
      const leftSet = new DataSet({
        label: `Leftover ${i}`,
      })
      const roiSet = new DataSet({
        label: `Adjusted ${i}`,
        color: this.colorLuminance(inputs.color, 0.2),
      })

      const rnd = num => Math.round(num * 100) / 100

      for (let month = 0; month <= this.years * 12; month += 6) {
        if (loan + inputs.morgPmt > 0) {
          principle += PPMT(inputs.rate, month, inputs.periods, loan)
          interest += ISPMT(inputs.rate, month, inputs.periods, loan)
          loan += inputs.morgPmt
        } else {
          interest = 0
          loan = 0
        }
        sellVal = inputs.pp * ((1 + this.valIncrease) ** (month / 12))
        upkeep = ((inputs.main + inputs.improv) / 12) * month
        sellCost = (sellVal * 0.06) + 3500
        sellProfit = (sellVal - sellCost) - (inputs.pp - inputs.dp) - inputs.dp
        loss = interest + upkeep
        gain = principle + sellProfit
        totalInv += inputs.monPmt
        totalLeft += this.monthlyInc - inputs.monPmt

        costSet.data.push({
          x: month,
          y: rnd(gain - loss),
        })
        invSet.data.push({
          x: month,
          y: rnd(totalInv),
        })
        leftSet.data.push({
          x: month,
          y: totalLeft,
        })
        roiSet.data.push({
          x: month,
          y: (rnd(gain - loss) - rnd(totalInv)) + totalLeft,
        })
      }
      return [costSet, roiSet]
    },
    colorLuminance(h, l) {
      const lum = l || 0
      let hex = h || ''
      let rgb = '#'
      let c
      let i

      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '')
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }

      // convert to decimal and change luminosity
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16)
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
        rgb += (`00${c}`).substr(c.length)
      }

      return rgb
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
