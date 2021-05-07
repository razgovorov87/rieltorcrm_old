import firebase from 'firebase/app';

export default {
	actions: {
		async fetchObjects({ dispatch }) {
			const response = (
				await firebase
					.database()
					.ref('/objects')
					.once('value')
			).val();
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
			return result;
		},

		async reserveObj({dispatch}, {data, clientId}) {
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/reserves/${data.date}`).push({
				...data,
				clientId,
				createdAt: new Date().toString(),
				author: uid
			})
			await firebase.database().ref(`/clients/${clientId}/reserves`).push(data)
		},

		async fetchClientReserves({dispatch}, clientId){
			const response = (await firebase.database().ref(`/clients/${clientId}/reserves`).once('value')).val()
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
			return result;
		},

		async addNewObject({ dispatch, commit }, object) {
			const uid = await dispatch('getUid');
			await firebase
				.database()
				.ref(`/objects`)
				.push({
					...object,
					createdAt: new Date().toString(),
					author: uid,
				});
		},

		async saveInterestingObj({ dispatch }, { client, obj }) {
			await firebase
				.database()
				.ref(`/clients/${client.id}/interestingObj/`)
				.set(obj);
		},

		async deleteObj({dispatch}, obj) {
			await firebase.database().ref(`/objects/${obj.id}`).remove()
		}
	},
};
