import firebase from 'firebase/app'

export default {
    state: {
        agents: {}
    },
    mutations: {
        setAgents(state, agents) {
            state.agents = agents
        },

        clearClients(state) {
            state.agents = {}
        }
    },
    actions: { 

        async fetchAgents({dispatch, commit}) {
            const info = (await firebase
            .database()
            .ref(`/users/`)
            .once('value')).val()
            const arr = Object.keys(info).map(key => ({...info[key], id: key}))
            commit('setAgents', arr)
            return arr
        }

    },

    getters: {
        agents: s => s.agents
    }
}