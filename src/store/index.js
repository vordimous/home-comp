import Vue from 'vue'
import Vuex from 'vuex'
import { ISPMT, PPMT } from 'formulajs'

import Inputs from '../models/inputs'
import DataSet from '../models/dataSet'

Vue.use(Vuex)

const state = {
  years: 10,
  monthlyInc: 1800,
  minMonthlyInc: 0,
  valIncrease: 0.02,
  inputSets: [new Inputs({
    name: 'Tiny',
    pp: 25000,
    dp: 0,
    lenMorg: 15,
    tax: 0,
    pmi: 0,
    main: 300,
    improv: 800,
    saleComm: 0.02,
    saleCost: 1500,
  }), new Inputs({
    name: 'Traditional',
    pp: 200000,
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

function calcDataSets(inputs, state) {
  const costSet = new DataSet({
    label: `Value ${inputs.name}`,
    color: colorLuminance(inputs.color, -0.4),
  })
  const roiSet = new DataSet({
    label: `In the Bank ${inputs.name}`,
    color: colorLuminance(inputs.color, 0.2),
  })

  const rnd = num => Math.round(num * 100) / 100
  const orgLoan = inputs.pp - inputs.dp
  let loan = orgLoan
  let totalInv = 0
  let totalLeft = 0
  let sellProfit = 0

  for (let month = 6; month <= state.years * 12; month += 6) {
    const principle = -PPMT(inputs.rate, month, inputs.periods, orgLoan)
    const interest = -ISPMT(inputs.rate, month, inputs.periods, orgLoan)
    loan -= principle

    const sellVal = inputs.pp * ((1 + state.valIncrease) ** (month / 12))
    const sellCost = (sellVal * inputs.saleComm) + inputs.saleCost
    sellProfit = (sellVal - sellCost) - loan - inputs.dp

    totalInv += inputs.monPmt
    totalLeft += state.monthlyInc - inputs.monPmt

    const dataString = JSON.stringify({
      principle: principle.toFixed(0),
      interest: interest.toFixed(0),
      loan: loan.toFixed(0),
      sellProfit: sellProfit.toFixed(0),
      totalLeft: totalLeft.toFixed(0),
    }, null, 2)
    costSet.data.push({
      x: month,
      y: rnd(sellProfit - totalInv),
      dataString,
    })
    roiSet.data.push({
      x: month,
      y: rnd(sellProfit - totalInv) + totalLeft,
      dataString,
    })
  }
  inputs.totalInv = totalInv
  inputs.totalLeft = totalLeft
  inputs.sellProfit = sellProfit
  return [costSet, roiSet]
}

const getters = {
  inputSets: state => state.inputSets,
  dataCollection: state => state.dataCollection,
  years: state => state.years,
  yearLabels: state => {
    const labels = []
    for (let month = 6; month <= state.years * 12; month += 6) {
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
    const inputSets = state.inputSets.concat(new Inputs({ name: `Home ${state.inputSets.length + 1}` }))
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
    state.inputSets.forEach(element => {
      datasets = datasets.concat(calcDataSets(element, state))
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
