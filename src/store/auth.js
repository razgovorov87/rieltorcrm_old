import firebase from 'firebase/app'

export default {
    actions: {
        async login({dispatch, commit}, {login, password}) {
            try {
                const email = login + "@median24.ru"
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {throw e}
        },

        async fetchInfo({ dispatch, commit }) {
            try {
              const uid = await dispatch('getUid')
              const info = (await firebase
                .database()
                .ref(`/users/${uid}`)
                .once('value')).val()
              return info ? info : null
            } catch (e) {
              throw e
            }
        },

        async register({dispatch, commit}, {login, password, fio, phone}) {
            try {
                const email = login + "@median24.ru"
                await firebase.auth().createUserWithEmailAndPassword(
                    email,
                    password
                )
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}`).set({
                    login,
                    fio, 
                    phone,
                    createdAt: new Date().toString(),
                    isAdmin: false 
                })

            } catch (e) {throw e}
        },

        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },


        async checkLogin({dispatch}, login) {
            const users = await (await firebase.database().ref(`/users/`).once('value')).val()
            // const idx = Object.keys(users).map(key => users[key].login === login)
            // return idx ? true : false
            return false
        },

        async logout({dispatch, commit}) {
            await firebase.auth().signOut()
        }

        

    }
}