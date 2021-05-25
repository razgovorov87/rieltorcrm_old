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

            dispatch('switchAgentLog', {clientId, newAgent})
        },

        async deleteUser({dispatch}, agent) {
            const uid = await dispatch('getUid');
            await firebase.database().ref(`/users/${agent.id}`).update({status: 'deleted'})
            await dispatch('login', {login: agent.login, password: agent.password})
            const user = firebase.auth().currentUser
            try {
                user.delete()
                await dispatch('logout')
                const reAuthUser = (await firebase.database().ref(`/users/${uid}`).once('value')).val()
                await dispatch('login', {login: reAuthUser.login, password: reAuthUser.password})
            } catch (e) {throw e}
        }

    },

    getters: {
        agents: s => s.agents
    }
}