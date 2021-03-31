import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import client from './client'
import agents from './agents'
import logs from './logs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    client,
    agents,
    logs
  }
})
