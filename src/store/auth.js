import axios from "axios";
import firebase from "firebase/app";
const SERVER_URL = "http://109.173.88.42:5000";

export default {
  actions: {
    async login({ dispatch, commit }, { login, password }) {
      try {
        const email = login + "@median24.ru";
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },

    async checkVerify({ dispatch }, { login, password }) {
      const email = login + "@median24.ru";
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const info = await dispatch("fetchInfo");
      await firebase.auth().signOut();
      return info.verify;
    },

    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const data = {
          userId: uid,
        };
        const info = await axios.post(`${SERVER_URL}/fetchInfo`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return info.data ? info.data : null;
      } catch (e) {
        throw e;
      }
    },

    async register(
      { dispatch, commit },
      { login, password, surname, name, secondName, phone }
    ) {
      try {
        const email = login + "@median24.ru";
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        print(uid);
        const data = {
          login,
          surname,
          name,
          secondName,
          password,
          phone,
          userId: uid,
        };
        const response = await axios.post(`${SERVER_URL}/register`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async verifyAgent({ dispatch }, id) {
      await firebase
        .database()
        .ref(`/users/${id}`)
        .update({
          verify: true,
        });
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async checkLogin({ dispatch }, login) {
      const data = {
        login,
      };
      const response = await axios.post(`${SERVER_URL}/checkLogin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.status;
    },

    async logout({ dispatch, commit }) {
      await firebase.auth().signOut();
    },
  },
};
