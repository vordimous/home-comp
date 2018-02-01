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

<script>
import CalcChart from '@/components/CalcChart';

export default {
  name: 'calculator',
  components: { CalcChart },
  data() {
    return {
      inputSets: [],
    };
  },
  mounted() {
    this.inputSets = [{
      pp: 25000,
      dp: 0,
      lenMorg: 30,
      morgRt: 0.04,
      tax: 0,
      homeIns: 0.004,
      pmi: 0,
      main: 300,
      improv: 800,
    }, {
      pp: 400000,
      dp: 0,
      lenMorg: 30,
      morgRt: 0.04,
      tax: 0.012,
      homeIns: 0.004,
      pmi: 150,
      main: 600,
      improv: 1500,
    }, {
      pp: 150000,
      dp: 0,
      lenMorg: 30,
      morgRt: 0.04,
      tax: 0.012,
      homeIns: 0.004,
      pmi: 150,
      main: 600,
      improv: 1500,
    }];
  },
};
//  calculated: {

//     propTax: () => (this.tax * this.pp) / 12,
//     insur: () => ((this.homeIns * this.pp) / 12) + this.pmi,
//     monPmt: () => this.morgPmt + this.propTax + this.insur +
// (this.main / 12) + (this.improv / 12),
//     sellVal: () => this.pp * (1.04 ** this.yr),
//   },
//   mounted() {
//     let interest = 0;
//     let principle = 0;
//     let loan = -(this.pp - this.dp);
//     const morgPmt = -PMT(this.morgRt / 12, this.lenMorg * 12, this.pp - this.dp);
//     const rate = this.morgRt / 12;
//     const periods = this.lenMorg * 12;
//     let sellVal;
//     let upkeep;
//     let sellCost;
//     let sellProfit;
//     let loss;
//     let gain;
//     let totalInv = 0;
//     const invSet = {
//       label: 'Invested',
//       fill: false,
//       backgroundColor: 'orange',
//       data: [],
//     };
//     const costSet = {
//       label: 'Cost',
//       fill: false,
//       backgroundColor: 'blue',
//       data: [],
//     };
//     const roiSet = {
//       label: 'ROI',
//       fill: false,
//       backgroundColor: 'red',
//       data: [],
//     };
//     const labels = [];

//     const rnd = num => Math.round(num * 100) / 100;

//     for (let month = 0; month <= 30 * 12; month += 6) {
//       principle += PPMT(rate, month, periods, loan);
//       interest += ISPMT(rate, month, periods, loan);
//       loan += morgPmt;
//       sellVal = this.pp * (1.04 ** (month / 12));
//       upkeep = ((this.main + this.improv) / 12) * month;
//       sellCost = (sellVal * 0.06) + 3500;
//       sellProfit = (sellVal - sellCost) - (this.pp - this.dp) - this.dp;
//       loss = interest + upkeep;
//       gain = principle + sellProfit;
//       labels.push((month / 12).toFixed(1));
//       totalInv += (morgPmt + ((this.main + this.improv) / 12));

//       costSet.data.push({
//         x: month,
//         y: rnd(gain - loss),
//         sv: rnd(sellVal),
//         a: '|',
//         in: rnd(interest),
//         up: rnd(upkeep),
//         ls: rnd(loss),
//         z: '|',
//         pr: rnd(principle),
//         sp: rnd(sellProfit),
//         gn: rnd(gain),
//         totalInv,
//       });
//       invSet.data.push({
//         x: month,
//         y: rnd(totalInv),
//       });
//       roiSet.data.push({
//         x: month,
//         y: rnd(gain - loss) - rnd(totalInv),
//       });
//     }
//     this.dataCollection = {
//       labels,
//       datasets: [costSet, invSet, roiSet],
//     };
//   },
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chart {
  /* height: 500px; */
}
</style>
