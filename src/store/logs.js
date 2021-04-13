import firebase from 'firebase/app'

export default {
    actions: { 

        async saveNote({dispatch}, {text, today, time, clientId, agent}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            const noteId = hours.toString() + minutes.toString() + seconds.toString()
            await firebase.database().ref(`/clients/${clientId}/logs/${dateId}/${noteId}`).update({
                text,
                time,
                agent,
                logType: 'note'
            })
        },

        async addCatchLog({dispatch}, {itemId, uid}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            const logId = hours.toString() + minutes.toString() + seconds.toString()
            await firebase.database().ref(`/clients/${itemId}/logs/${dateId}/${logId}`).update({
                logType: 'catch',
                agent: uid
            })
        },

        async saveCategory({dispatch}, {categories, categoriesColor, msgType, logType, clientId}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            const time = hours + ':' + minutes
            const logId = hours.toString() + minutes.toString() + seconds.toString()
            const uid = await dispatch('getUid')

            await firebase.database().ref(`/clients/${clientId}/`).update({
                status: categories
            })
            const log = {
                categories,
                categoriesColor,
                msgType,
                logType,
                agent: uid,
                time,
                dateId,
                logId
            }
            await firebase.database().ref(`/clients/${clientId}/logs/${dateId}/${logId}`).update(log)
            return log
        }

    },
}