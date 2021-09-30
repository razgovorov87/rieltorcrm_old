import axios from "axios";
const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async fetchObjects({ dispatch }) {
      const response = await axios.get(`${SERVER_URL}/fetchObjects`);
      if (!response) return false;
      const result = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      return result;
    },

    async reserveObj({ dispatch }, { obj, clientId }) {
      const author = await dispatch("getUid");
      const data = {
        obj,
        clientId,
        author,
      };
      await axios.post(`${SERVER_URL}/reserveObj`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async fetchClientReserves({ dispatch }, clientId) {
      const data = {
        clientId,
      };
      const response = await axios.post(
        `${SERVER_URL}/fetchClientReserves`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response) return false;
      const result = Object.keys(response.data.message).map((key) => ({
        ...response.data.message[key],
        id: key,
      }));
      return result;
    },

    async fetchClientObjects({ dispatch }, clientId) {
      const data = {
        clientId,
      };
      const response = await axios.post(
        `${SERVER_URL}/fetchClientObjects`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response) return false;
      const result = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      return result;
    },

    async fetchReserves({ dispatch }) {
      const response = await axios.get(`${SERVER_URL}/fetchReserves`);
      if (!response) return false;
      const result = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      return result;
    },

    async pushResult({ dispatch }, { reverse, result }) {
      const data = {
        reverseId: reverse.id,
      };
      await axios.post(`${SERVER_URL}/pushResult`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async addNewObject({ dispatch, commit }, object) {
      const uid = await dispatch("getUid");
      const data = {
        ...object,
        authorId: uid,
      };
      await axios.post(`${SERVER_URL}/addNewObject`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async saveInterestingObj({ dispatch }, { client, obj }) {
      const data = {
        ...obj,
        clientId: client.id,
      };
      await axios.post(`${SERVER_URL}/saveInterestingObj`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async deleteObj({ dispatch }, obj) {
      const data = {
        objectId: obj.id,
      };
      await axios.post(`${SERVER_URL}/deleteObj`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};
