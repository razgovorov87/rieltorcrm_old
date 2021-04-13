import firebase from 'firebase/app';
import Vue from 'vue';

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
		async addNewClient(
			{ dispatch, commit },
			{ phone, name, surname, company, budget, city, adress, interestingObj },
		) {
			const fio = name && surname ? name + ' ' + surname : '';
			await firebase
				.database()
				.ref(`/clients/`)
				.push({
					phone,
					fio,
					company,
					budget,
					city,
					adress,
					status: 'Не обработано',
					interestingObj,
					createdAt: new Date().toString(),
				});
		},

		async fetchClients({ dispatch, commit }) {
			const response = (
				await firebase
					.database()
					.ref('/clients')
					.once('value')
			).val();
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
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

		async saveClientInfo({ dispatch, commit }, { fio, company, budget, status, clientId }) {
			await firebase
				.database()
				.ref(`/clients/${clientId}`)
				.update({
					fio,
					company,
					status,
					budget,
				});
		},

		async saveClientLinks({ dispatch }, { clientId, arr }) {
			await firebase
				.database()
				.ref(`/clients/${clientId}/proposedObjects`)
				.set(arr);
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
			let item = arr.find((item) => !item.agent);
			if (!item) return 'empty_list';
			await firebase
				.database()
				.ref(`/clients/${item.id}`)
				.update({
					agent: uid,
					logs: {},
				});
			await dispatch('fetchClients');
			const itemId = item.id;
			await dispatch('addCatchLog', { itemId, uid });
			item = (
				await firebase
					.database()
					.ref(`/clients/${item.id}`)
					.once('value')
			).val();
			return { ...item, id: itemId };
		},
	},

	getters: {
		clients: (s) => s.clients,
	},
};
