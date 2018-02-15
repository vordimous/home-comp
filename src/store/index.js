
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// initial state
// shape: [{ id, quantity }]
const state = {
  years: 10,
  monthlyInc: 1000,
  valIncrease: 0.02,
}

// getters
const getters = {
  years: state => state.years,
  monthlyInc: state => state.monthlyInc,
  valIncrease: state => state.valIncrease,
}

// actions
const actions = {
  updateState({ commit }, updates) {
    console.log(updates)
    commit('state', updates)
  },
}

// mutations
const mutations = {
  state (state, updates) {
    Object.assign(state, updates)
    console.log(state)
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
