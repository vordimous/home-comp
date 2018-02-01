<template>
  <div class="chart">
    <cost-chart
      :chartData="dataCollection"
      :options="options"
      :height="500" />
  </div>
</template>

<script lang="ts">
import { PMT, ISPMT, PPMT } from 'formulajs';
import CostChart from '@/components/CostChart';

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
      years: 20,
      monthyInc: 1500,
      dataCollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0, // general animation time
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: value => `$${value}`,
            },
          }],
          xAxes: [{
            ticks: {
              callback: value => `${value} yrs`,
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
    };
  },
  computed: {
    labels() {
      const labels = [];
      for (let month = 0; month <= this.years * 12; month += 6) {
        labels.push((month / 12).toFixed(1));
      }
      return labels;
    },
  },
  watch: {
    inputSets(sets) {
      let datasets = [];
      sets.forEach((element, i) => {
        datasets = datasets.concat(this.calcDataSets(element, i + 1));
      });
      this.dataCollection = { labels: this.labels, datasets };
    },
  },
  methods: {
    calcDataSets(inputs, i) {
      const propTax = (inputs.tax * inputs.pp) / 12;
      const insur = ((inputs.homeIns * inputs.pp) / 12) + inputs.pmi;
      const morgPmt = -PMT(inputs.morgRt / 12, inputs.lenMorg * 12, inputs.pp - inputs.dp);
      const monPmt = morgPmt
      + propTax
      + insur
      + (inputs.main / 12)
      + (inputs.improv / 12);
      const rate = inputs.morgRt / 12;
      const periods = inputs.lenMorg * 12;
      let sellVal;
      let interest = 0;
      let principle = 0;
      let loan = -(inputs.pp - inputs.dp);
      let upkeep;
      let sellCost;
      let sellProfit;
      let loss;
      let gain;
      let totalInv = 0;
      let totalLeft = 0;
      const invSet = {
        label: `Invested ${i}`,
        fill: false,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: [],
      };
      const costSet = {
        label: `Cost ${i}`,
        fill: false,
        showLine: false,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: [],
      };
      const leftSet = {
        label: `Leftover ${i}`,
        fill: false,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: [],
      };
      const roiSet = {
        label: `ROI ${i}`,
        fill: false,
        showLine: false,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: [],
      };

      const rnd = num => Math.round(num * 100) / 100;

      for (let month = 0; month <= this.years * 12; month += 6) {
        principle += PPMT(rate, month, periods, loan);
        interest += ISPMT(rate, month, periods, loan);
        loan += morgPmt;
        sellVal = inputs.pp * (1.02 ** (month / 12));
        upkeep = ((inputs.main + inputs.improv) / 12) * month;
        sellCost = (sellVal * 0.06) + 3500;
        sellProfit = (sellVal - sellCost) - (inputs.pp - inputs.dp) - inputs.dp;
        loss = interest + upkeep;
        gain = principle + sellProfit;
        totalInv += monPmt;
        totalLeft += this.monthyInc - monPmt;

        costSet.data.push({
          x: month,
          y: rnd(gain - loss),
          // sv: rnd(sellVal),
          // a: '|',
          // in: rnd(interest),
          // up: rnd(upkeep),
          // ls: rnd(loss),
          // z: '|',
          // pr: rnd(principle),
          // sp: rnd(sellProfit),
          // gn: rnd(gain),
        });
        invSet.data.push({
          x: month,
          y: rnd(totalInv),
        });
        roiSet.data.push({
          x: month,
          y: rnd(gain - loss) - rnd(totalInv),
        });
        leftSet.data.push({
          x: month,
          y: totalLeft,
        });
      }
      // return [costSet, invSet, roiSet, leftSet];
      return [roiSet, leftSet];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chart {
  /* height: 500px; */
}
</style>
