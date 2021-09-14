import firebase from 'firebase/app';
import axios from 'axios';

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
			const data = {
				phone,
				fio,
				comment,
				interestingObj,
				missedCall,
				author: uid,
			};

			const response = await axios.post(`${SERVER_URL}/addNewClient`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
		},

		async saveClientComposition({ dispatch }, [clientId, frontData, compositionType]) {
			const data = {
				clientId,
				data: frontData,
				compositionType,
			};
			const response = await axios.post(`${SERVER_URL}/saveClientComposition`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
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
			const response = (
				await firebase
					.database()
					.ref('/clients')
					.once('value')
			).val();
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
			return result.filter((client) => client.agent === uid);
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
			let arr = (
				await firebase
					.database()
					.ref('/clients')
					.once('value')
			).val();
			arr = Object.keys(arr).map((key) => ({ ...arr[key], id: key }));
			const today = new Date().toISOString().slice(0, -14);
			let item = arr.reverse().find((item) => {
				let checkOldAgents = false;
				if (item.oldAgents) {
					const oldAgents = Object.keys(item.oldAgents).map((key) => ({
						...item.oldAgents[key],
						id: key,
					}));
					checkOldAgents = oldAgents.find((agent) => agent.agent === uid);
				}

				if (!item.agent && (!item.lastCause || item.lastCause !== today) && !checkOldAgents) {
					return item;
				}
			});
			if (!item) return 'empty_list';
			await firebase
				.database()
				.ref(`/clients/${item.id}`)
				.update({
					agent: uid,
				});
			const itemId = item.id;
			await dispatch('addCatchLog', { itemId, uid });
			item = (
				await firebase
					.database()
					.ref(`/clients/${itemId}`)
					.once('value')
			).val();
			await firebase
				.database()
				.ref(`/clients/${itemId}`)
				.update({
					status: 'Не обработано',
				});
			return { ...item, id: itemId };
		},

		async refuseClient({ dispatch }, { cause, otherCause, comment, clientId }) {
			const uid = await dispatch('getUid');
			await firebase
				.database()
				.ref(`/clients/${clientId}`)
				.update({
					agent: '',
					status: 'Отказались',
					lastCause: new Date().toISOString().slice(0, -14),
				});
			await firebase
				.database()
				.ref(`/clients/${clientId}/oldAgents/`)
				.push({
					agent: uid,
				});
			await firebase
				.database()
				.ref(`/clients/${clientId}/causes`)
				.push({
					cause,
					agent: uid,
					date: new Date().toISOString(),
					otherCause,
					comment,
				});
			dispatch('refuseLog', { clientId, cause, otherCause });
		},

		async removeNewClients({ dispatch }, clients) {
			clients.forEach(async (client) => {
				await firebase
					.database()
					.ref(`/clients/${client.id}/`)
					.update({
						notification: null,
					});
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
