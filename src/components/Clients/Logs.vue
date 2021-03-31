<template>
    <div class="bg-gray-50 h-full w-full shadow-lg flex flex-col">
        <div class="flex-grow pt-6 flex flex-col items-center px-4 text-center overflow-y-auto" ref="logsList">
            <template v-for="(day, idx) in logs">
                <div class="w-full h-px bg-gray-200 relative" :key="idx">
                    <span class="text-sm bg-white border rounded-xl px-4 text-gray-500 absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2">
                        {{idx}}
                    </span>
                </div>
                <transition-group tag="div" name="list" class="grid mt-6 mb-6 space-y-4 w-full">

                    <div v-for="(log, id) in formatDay(day)" :key="log.id" :class="log.logType === 'system' || log.logType === 'catch' ? 'systemMsg' : 'noteWrapper'">
                        <span v-if="log.logType === 'note'" class="text-xs italic text-gray-300 truncate">{{takeAgentInfo(log.agent)}} • {{log.time}}</span>
                        <div v-if="log.logType === 'note'" class="noteMsg break-words">
                            {{log.text}}
                        </div>

                        <div  v-if="log.logType === 'system'">
                            {{log.time + ' ' + takeAgentInfo(log.agent) + '. ' + log.msgType + ':'}}
                            <span class="border rounded-xl px-4 py-0.5 text-white ml-1 shadow" 
                            :class="[
                                `bg-${log.categoriesColor}`,
                                `border-${log.categoriesColor}`
                            ]">{{log.categories}}</span>
                        </div>

                        <div  v-if="log.logType === 'catch'">
                            <span class="font-medium underline">{{takeAgentInfo(log.agent)}}</span> взял в работу
                        </div>

                    </div>
                    
                </transition-group>
            </template>
        </div>
        <div class="w-full h-36 px-4 py-6 relative">
            <div class="absolute bottom-full transform translate-y-4 translate-x-1/2 right-1/2">
                <transition name="opacitySlideUp">
                    <p v-if="timer !== 0" class="text-sm flex rounded border shadow px-3 py-1 text-gray-400 bg-white">
                        Осталось
                        {{timer}}
                        <template v-if="timer === 1 || timer === 21 ">секунда</template>
                        <template v-else-if="timer === 2 || timer === 3 || timer === 22 || timer === 23">секунды</template>
                        <template v-else>секунд</template>
                    </p>
                </transition>
            </div>
            <textarea 
                v-model="note"
                rows="3" 
                class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:border-blue-300 flex" 
                placeholder="Примечание, введите текст..."
                @keydown.enter.exact.prevent
                :disabled="timer !== 0"
                @keydown.enter.exact="saveNote"
                @keydown.enter.shift.exact="newline"></textarea>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
export default {
    props: ['logs'],
    data: () => ({
        note: '',
        agents: [],
        timer: 0,
    }),

    mounted() {
        this.agentsInfo()
        this.$refs.logsList.scrollTop = this.$refs.logsList.scrollHeight
    },

    methods: {
        pushLog(log) {
            const id = log.logId
            const today = log.dateId
            if(this.logs[today]) {
                Vue.set(this.logs[today], id, log)
            } else {
                Vue.set(this.logs, today, {})
                Vue.set(this.logs[today], id, log)
            }
            
            this.$refs.logsList.scrollTop = this.$refs.logsList.scrollHeight
        },

        async saveNote() {
            if(this.timer !== 0) {
                this.$toasts.push({
                    type: 'error',
                    message: 'Примечание можно оставлять раз в 30 секунд'
                }) 
                return
            }
            if(this.note !== '') {
                const date = new Date()
                const today = this.$options.filters.date(new Date(), 'fullmonthDay').toString()
                const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                const time = hours + ':' + minutes
                const uid = await this.$store.dispatch('getUid')
                const noteId = hours.toString() + minutes.toString() + seconds.toString()
                this.pushNote(today, time, uid, noteId)
                this.$emit('saveNote', {today, text: this.note, time, noteId, uid})
                this.startTimer()
            }

            this.note = ''
        },

        startTimer() {
            this.timer = 30
            const interval = setInterval( () => {
                this.timer -= 1
                if(this.timer === 0 ) clearInterval(interval)
            }, 1000)
        },

        pushNote(today, time, uid, noteId) {
            const id = noteId
            const note = {
                time,
                text: this.note,
                logType: 'note',
                agent: uid
            }


            if(this.logs[today]) {
                Vue.set(this.logs[today], id, note)
            } else {
                Vue.set(this.logs, today, {})
                Vue.set(this.logs[today], id, note)
            }
        },

        newline() {
            this.value = `${this.value}\n`;
        },

        async agentsInfo() {
            this.agents = await this.$store.dispatch('fetchAgents')
        },

        takeAgentInfo(id) {
            const agent = this.agents.filter(agent => agent.id === id)
            if(agent[0]) return agent[0].fio
        },

        formatDay(day) {
            const arr = []
            Object.keys(day).forEach(key => arr.push({...day[key], id: key}))
            return arr.sort( (a, b) => {
                return a.id - b.id
            })
        }
    },
}
</script>

<style scoped>
.systemMsg {
    @apply text-sm text-gray-500 justify-self-center;
}

.noteWrapper {
    @apply flex items-center space-x-2 justify-end;
}

.noteMsg {
    @apply justify-self-end text-sm text-left bg-white border rounded px-3 py-2 max-w-md;
}

textarea {
  resize: none;
}

.opacitySlideUp-enter-active,
.opacitySlideUp-leave-active {
  transition: .3s ease;
}
.opacitySlideUp-enter,
.opacitySlideUp-leave-to {
    opacity: 0;
    transform: translateY(100%);
}
</style>