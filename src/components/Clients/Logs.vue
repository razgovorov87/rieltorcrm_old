<template>
    <div class="bg-gray-50 h-full w-full shadow-lg flex flex-col">
        <div class="flex-grow pt-6 flex flex-col items-center px-4 text-center overflow-y-auto">
            <div class="w-full h-px bg-gray-200 relative">
                <span class="text-sm bg-white border rounded-xl px-4 text-gray-500 absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2">
                    Сегодня
                </span>
            </div>
            <transition-group tag="div" name="list" class="grid mt-4 space-y-3 w-full">

                <div v-for="log in logList.slice()" :key="log.id" :class="log.logType === 'system' ? 'systemMsg' : 'noteWrapper'">
                    <span v-if="log.logType === 'note'" class="text-xs italic text-gray-300">{{log.time}}</span>
                    <div v-if="log.logType === 'note'" class="noteMsg">{{log.text}}</div>

                    <p  v-if="log.logType === 'system'">
                        {{ log.date + ', ' + log.time + ' ' + log.user + '. ' + log.msgType + ':'}}
                        <span class="border rounded-xl px-4 py-0.5 text-gray-700 ml-1" :class="log.categoriesColor">{{log.categories}}</span>
                    </p>

                </div>
                
            </transition-group>
        
        </div>
        <div class="w-full h-36 px-4 py-6">
            <textarea 
            v-model="note"
            rows="3" 
            class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:border-blue-300 flex" 
            placeholder="Примечание, введите текст..."
            @keydown.enter.exact.prevent
            @keydown.enter.exact="saveNote"
            @keydown.enter.shift.exact="newline"></textarea>
        </div>
    </div>
</template>


<script>
export default {

    data: () => ({
        note: '',
        logList: [
            {id: 0, date: 'Сегодня', time: '12:14', user: 'Константин Кузнецов', msgType: 'Новый этап', categories: 'Переговоры', categoriesColor: 'bg-yellow-300', logType: 'system'},
            {id: 1, time: '12:15', logType: 'note', text: 'Lorem ipasdbuqwbipbajsdasdr.'},
            {id: 2, time: '12:24', logType: 'note', text: 'Lorem ipsum dolor sit amet consectetur.asdasdn kao[sd'},
            {id: 3, time: '12:32', logType: 'note', text: 'Lorem ipsum dolor sit amet consecteturasdasndiao[sndikas].'},
            {id: 4, time: '12:34', logType: 'note', text: 'Lorem ipsum dolor sit amet consectetur. sit amet consectetursit amet consectetur'},

        ]
    }),

    methods: {
        saveNote() {
            if(this.note !== '') {
                this.logList.push({
                    id: this.logList.length + 1,
                    text: this.note,
                    time: '13:00',
                    logType: 'note'
                })
            }

            this.note = ''
        },
        newline() {
            this.value = `${this.value}\n`;
        },
    }
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
    @apply justify-self-end text-sm text-left bg-white border rounded px-3 py-2 max-w-lg;
}

textarea {
  resize: none;
}
</style>