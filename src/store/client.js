import axios from 'axios';
import firebase from 'firebase/app';

const SERVER_URL = 'http://109.173.88.42:5000';

export default {
	state: {
		clients: {},
	},
	mutations: {
		setClients(state, clients) {
			state.clients = clients;
		},

		pushClients(state, client) {
			state.clients.push(client);
		},

		clearClients(state) {
			state.clients = {};
		},
	},
	actions: {
		async addNewClient({ dispatch, commit }, { phone, fio, comment, missedCall, interestingObj }) {
			const uid = await dispatch('getUid');
			const clients = (
				await firebase
					.database()
					.ref('/clients')
					.once('value')
			).val();

			if (clients) {
				const checkPhone = Object.keys(clients).find((key) => clients[key].phone === phone);
				if (checkPhone) return 'dublicatePhone';
			}

			await firebase
				.database()
				.ref(`/clients/`)
				.push({
					phone,
					fio,
					comment,
					status: 'Не обработано',
					interestingObj,
					missedCall,
					budget: 0,
					author: uid,
					createdAt: new Date().toString(),
				});
		},

		async saveClientComposition({ dispatch }, [clientId, data, compositionType]) {
			await firebase
				.database()
				.ref(`/clients/${clientId}/composition`)
				.set(data);
			await firebase
				.database()
				.ref(`/clients/${clientId}/`)
				.update({
					compositionType,
				});
		},

		async saveCriterion({ dispatch }, { data, clientId }) {
			await firebase
				.database()
				.ref(`/clients/${clientId}/criterion`)
				.set(data);
		},

		async fetchClients({ dispatch, commit }) {
			const response = await axios.get(`${SERVER_URL}/fetchClients`);
			if (!response.data) return false;
			const result = Object.keys(response.data).map((key) => ({ ...response.data[key], id: key }));
			commit('setClients', result);
			return result;
		},

		async fetchUserClients({ dispatch, commit }) {
			const uid = await dispatch('getUid');
			const data = {
				agentId: uid,
			}
			const response = await axios.get(`${SERVER_URL}/fetchUserClients`, {
				params: {
					agentId: uid,
				}
			});

			const result = Object.keys(response.data).map((key) => ({ ...response.data[key], id: key }));
			return result;
		},

		async saveClientInfo({ dispatch, commit }, { fio, budget, status, clientId }) {
			await firebase
				.database()
				.ref(`/clients/${clientId}`)
				.update({
					fio,
					status,
					budget,
				});
			return (
				await firebase
					.database()
					.ref(`/clients/${clientId}`)
					.once('value')
			).val();
		},

		async saveClientLinks({ dispatch }, { clientId, arr }) {
			await firebase
				.database()
				.ref(`/clients/${clientId}/proposedObjects`)
				.set(arr);
		},

		async saveExceptions({ dispatch }, { clientId, exceptions }) {
			await firebase
				.database()
				.ref(`/clients/${clientId}`)
				.update({
					exceptions,
				});
		},

		async catchNewClient({ dispatch, commit }) {
			const uid = await dispatch('getUid');
			const data = {
				agentId: uid,
			};
			const item = await axios.post(`${SERVER_URL}/catchNewClient`, data);
			return item.data;
		},

		async refuseClient({ dispatch }, { cause, otherCause, comment, clientId }) {
			const uid = await dispatch('getUid');
			const data = {
				agentId: uid,
				cause,
				otherCause,
				comment,
				clientId,
			}
			const response = await axios.post(`${SERVER_URL}/refuseClient`, data, {
				headers: {
					'Content-Type': 'application/json',
				}
			})
		},

		async removeNewClients({ dispatch }, clients) {
			const ids = [];
			clients.forEach(client => ids.push(client.id));
			const data = {
				clients: ids
			}
			const respose = await axios.post(`${SERVER_URL}/removeNewClients`, data, {
				headers: {
					'Content-Type': 'application/json',
				}
			});
		},

		async returnClientToStart({ dispatch }, client) {
			await firebase
				.database()
				.ref(`/clients/${client.id}/`)
				.update({
					status: 'Не обработано',
				});
		},

		async returnArchiveClientToStart({ dispatch }, client) {
			const response = (
				await firebase
					.database()
					.ref(`/archive/clients/${client.id}`)
					.once('value')
			).val();
			await firebase
				.database()
				.ref(`/archive/clients/${client.id}`)
				.remove();
			await firebase
				.database()
				.ref(`/clients/${client.id}`)
				.update(response);
			await firebase
				.database()
				.ref(`/clients/${client.id}/`)
				.update({
					status: 'Не обработано',
					archived: null,
				});
		},

		async deleteClient({ dispatch }, client) {
			const response = (
				await firebase
					.database()
					.ref(`/clients/${client.id}`)
					.once('value')
			).val();
			await firebase
				.database()
				.ref(`/archive/clients/${client.id}`)
				.update({ ...response, archived: true });
			await firebase
				.database()
				.ref(`/clients/${client.id}`)
				.remove();
		},

		async fetchArchiveClients({ dispatch }) {
			const uid = await dispatch('getUid');
			const response = (
				await firebase
					.database()
					.ref('/archive/clients/')
					.once('value')
			).val();
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
			return result;
		},
	},

	getters: {
		clients: (s) => s.clients,
	},
};
