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
	},
};