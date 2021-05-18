import firebase from 'firebase/app';

export default {
  actions: {
    async login({ dispatch, commit }, { login, password }) {
      try {
        const email = login + '@median24.ru';
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },

    async checkVerify({dispatch}, {login, password}) {
        const email = login + '@median24.ru';
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}`).once('value')).val();
        await firebase.auth().signOut();
        return info.verify
    },

    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}`)
            .once('value')
        ).val();
        return info ? info : null;
      } catch (e) {
        throw e;
      }
    },

    async register({ dispatch, commit }, { login, password, surname, name, secondName, phone }) {
      try {
        const email = login + '@median24.ru';
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase
          .database()
          .ref(`/users/${uid}`)
          .set({
            login,
            surname,
            name,
            secondName,
            password,
            phone,
            createdAt: new Date().toString(),
            isAdmin: false,
            verify: false
          });
      } catch (e) {
        throw e;
      }
    },

    async verifyAgent({dispatch}, id) {
      await firebase.database().ref(`/users/${id}`).update({
        verify: true
      })
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async checkLogin({ dispatch }, login) {
      const users = await (
        await firebase
          .database()
          .ref(`/users/`)
          .once('value')
      ).val();
      if (users) {
        const idx = Object.keys(users).find((key) => users[key].login === login && users[key].status !== 'deleted');
        return idx ? true : false;
      } else return false;
    },

    async logout({ dispatch, commit }) {
      await firebase.auth().signOut();
    },
  },
};
