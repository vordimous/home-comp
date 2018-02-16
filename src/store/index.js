import Vue from 'vue'
import Vuex from 'vuex'
import { ISPMT, PPMT } from 'formulajs'

import Inputs from '../models/inputs'
import DataSet from '../models/dataSet'

Vue.use(Vuex)

const state = {
  years: 10,
  monthlyInc: 1000,
  minMonthlyInc: 0,
  valIncrease: 0.02,
  inputSets: [new Inputs({
    pp: 25000,
    dp: 0,
    lenMorg: 15,
    tax: 0,
    pmi: 0,
    main: 300,
    improv: 800,
  }), new Inputs({
    pp: 150000,
  })],
  dataCollection: null,
}

function toPercent(value) {
  return (value * 100).toFixed(1).toString()
}

function colorLuminance(h, l) {
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
}

function calcDataSets(inputs, years, valIncrease, monthlyInc, i) {
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
    color: colorLuminance(inputs.color, -0.2),
  })
  const costSet = new DataSet({
    label: `Value ${i}`,
    color: colorLuminance(inputs.color, -0.4),
  })
  const leftSet = new DataSet({
    label: `Leftover ${i}`,
  })
  const roiSet = new DataSet({
    label: `Adjusted ${i}`,
    color: colorLuminance(inputs.color, 0.2),
  })

  const rnd = num => Math.round(num * 100) / 100

  for (let month = 0; month <= years * 12; month += 6) {
    if (loan + inputs.morgPmt > 0) {
      principle += PPMT(inputs.rate, month, inputs.periods, loan)
      interest += ISPMT(inputs.rate, month, inputs.periods, loan)
      loan += inputs.morgPmt
    } else {
      interest = 0
      loan = 0
    }
    sellVal = inputs.pp * ((1 + valIncrease) ** (month / 12))
    upkeep = ((inputs.main + inputs.improv) / 12) * month
    sellCost = (sellVal * 0.06) + 3500
    sellProfit = (sellVal - sellCost) - (inputs.pp - inputs.dp) - inputs.dp
    loss = interest + upkeep
    gain = principle + sellProfit
    totalInv += inputs.monPmt
    totalLeft += monthlyInc - inputs.monPmt

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
}

const getters = {
  inputSets: state => state.inputSets,
  dataCollection: state => state.dataCollection,
  years: state => state.years,
  yearLabels: state => {
    const labels = []
    for (let month = 0; month <= state.years * 12; month += 6) {
      labels.push((month / 12).toFixed(1))
    }
    return labels
  },
  monthlyInc: state => state.monthlyInc.toFixed(2),
  minMonthlyInc: state => state.minMonthlyInc.toFixed(2),
  valIncrease: state => state.valIncrease,
  valIncreasePerc: state => toPercent(state.valIncrease),
}

const actions = {
  changeCriteria({ commit, dispatch }, updates) {
    commit('changeCriteria', updates)
    dispatch('calcDataset')
  },
  addInput({ state, commit, dispatch }) {
    const inputSets = state.inputSets.concat(new Inputs())
    commit('changeCriteria', { inputSets })
    dispatch('calcDataset')
  },
  removeInput({ state, commit, dispatch }, i) {
    const inputSets = state.inputSets
    inputSets.splice(i, 1)
    commit('changeCriteria', { inputSets })
    dispatch('calcDataset')
  },
  calcDataset({ state, commit, getters }) {
    let datasets = []
    let monthlyInc = state.monthlyInc
    let minMonthlyInc = 0
    // set income max
    state.inputSets.forEach((set) => {
      if (set.monPmt > minMonthlyInc) {
        minMonthlyInc = set.monPmt
      }
    })
    if (minMonthlyInc > monthlyInc) {
      monthlyInc = parseFloat(minMonthlyInc)
    }
    commit('changeCriteria', { minMonthlyInc, monthlyInc })

    // calculate dataset
    state.inputSets.forEach((element, i) => {
      datasets = datasets.concat(calcDataSets(
        element,
        state.years,
        state.valIncrease,
        state.monthlyInc,
        i + 1))
    })
    commit('setData', { datasets, labels: getters.yearLabels })
  },
}

const mutations = {
  setData(state, data) {
    state.dataCollection = data
  },

  changeCriteria(state, updates) {
    Object.assign(state, updates)
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
