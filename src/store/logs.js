import firebase from 'firebase/app'

export default {
    actions: { 

        async saveNote({dispatch}, {text, today, time, clientId, agent}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
            const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
            const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()
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
            const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
            const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
            const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()
            const logId = hours.toString() + minutes.toString() + seconds.toString()
            await firebase.database().ref(`/clients/${itemId}/logs/${dateId}/${logId}`).update({
                logType: 'catch',
                agent: uid
            })
        },

        async addOfferObjectLog({dispatch}, {itemId, link, pdfNumber}) {
            const date = new Date()
            const uid = await dispatch('getUid')
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
            const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
            const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()
            const logId = hours.toString() + minutes.toString() + seconds.toString()
            const time = hours + ':' + minutes

            const log = {
                logType: 'offerObject',
                link,
                pdfNumber,
                agent: uid,
                time,
                dateId,
                logId
            }
            await firebase.database().ref(`/clients/${itemId}/logs/${dateId}/${logId}`).update(log)
            return log
        },

        async saveCategory({dispatch}, {categories, categoriesColor, msgType, logType, clientId}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
            const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
            const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()
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
        },

        async refuseLog({dispatch}, {clientId, cause, otherCause}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
            const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
            const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()
            const time = hours + ':' + minutes
            const logId = hours.toString() + minutes.toString() + seconds.toString()
            const uid = await dispatch('getUid')

            const log = {
                logType: 'refuseClient',
                agent: uid,
                time,
                cause,
                otherCause
            }

            await firebase.database().ref(`/clients/${clientId}/logs/${dateId}/${logId}`).update(log)
        },

        async reserveObjLog({dispatch}, {data, clientId}) {
            const date = new Date()
            const dateId = date.toISOString().slice(0, -14)
            const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
            const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
            const seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()
            const time = hours + ':' + minutes
            const logId = hours.toString() + minutes.toString() + seconds.toString()
            const uid = await dispatch('getUid')

            let log = {
                logType: 'reserveObj',
                agent: uid,
                time,
                obj: data
            }

            await firebase.database().ref(`/clients/${clientId}/logs/${dateId}/${logId}`).update(log)
            log = {
                logType: 'reserveObj',
                agent: uid,
                time,
                obj: data,
                dateId,
                logId
            }
            return log
        }

    },
}