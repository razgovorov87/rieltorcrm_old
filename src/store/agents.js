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
        },

        async switchAgent({dispatch}, {clientId, newAgent}) {
            await firebase.database().ref(`/clients/${clientId}`).update({
                agent: newAgent,
                status: 'Не обработано',
                notification: true
            })
        },

        async deleteUser({dispatch}, agent) {
            await firebase.database().ref(`/users/${agent.id}`).remove()
        }

    },

    getters: {
        agents: s => s.agents
    }
}