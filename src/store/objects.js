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
			await firebase.database().ref(`/reserves/`).push({
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

		async fetchClientObjects({dispatch}, clientId){
			const response = (await firebase.database().ref(`/clients/${clientId}/proposedObjects`).once('value')).val()
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
			return result;
		},

		async fetchReserves({dispatch}){
			const response = (await firebase.database().ref(`/reserves`).once('value')).val()
			if (!response) return false;
			const result = Object.keys(response).map((key) => ({ ...response[key], id: key }));
			return response;
		},

		async pushResult({dispatch}, {reverse, result}) {
			await firebase.database().ref(`reserves/${reverse.id}`).update({
				resultAt: new Date().toISOString(),
				result,
			}) 

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
