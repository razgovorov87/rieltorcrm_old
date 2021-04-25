<template>
    <div class="px-8 py-4 flex flex-col">

        <div>
            <h3 class="font-medium text-gray-500">Как вы отвели клиента от интересующей квартиры?</h3>
            <textarea 
                v-model="exceptions"
                rows="4" 
                class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex mt-2" 
                placeholder="Какие Вы привели аргументы, чтобы клиент отказался от интересующей квартиры"
                @keydown.enter.exact.prevent
                @input="$emit('openSave', true)"
                @keydown.enter.shift.exact="newline">
            </textarea>
        </div>

        <div class="flex mt-6 items-center">
            <span class="font-medium text-gray-500 w-36">Район города:</span>
            <input
                v-model="area"
                type="text"
                class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg"
                placeholder=""
                @input="$emit('openSave', true)"
            />
        </div>

        <div class="flex mt-6 items-center">
            <span class="font-medium text-gray-500 w-72">До какого числа нужно переехать:</span>
            <input
                v-model="date"
                type="date"
                class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg"
                placeholder=""
                @input="$emit('openSave', true)"
            />
        </div>

        <div class="flex mt-6 items-center">
            <span class="font-medium text-gray-500 w-44">Причина переезда:</span>
            <input
                v-model="cause"
                type="text"
                class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg"
                placeholder=""
                @input="$emit('openSave', true)"
            />
        </div>

        <h3 class="font-medium text-gray-500 mt-10 mb-3">Критерии поиска</h3>
        <div class="flex flex-wrap">
            <label v-for="(item, idx) in criterions" :key="item.name" :for="'item' + idx" class="mr-4 inline-flex items-center cursor-pointer">
                <span class="relative">
                <span class="block w-10 h-6 bg-gray-300 rounded-full shadow-inner"></span>
                <span 
                class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out transform"
                :class="[{
                    'translate-x-full bg-dividerBg': item.checked,
                    'bg-white': !item.checked,
                }]">
                    <input @change="item.checked = !item.checked" :id="'item' + idx" type="checkbox" class="absolute opacity-0 w-0 h-0" />
                </span>
                </span>
                <span class="ml-3 text-sm select-none">{{item.title}}</span>
            </label>
        </div>

        
        <h3 class="font-medium text-gray-500 mt-10 mb-3">Доступность от места работы</h3>
        <div class="flex">
            <input
                v-model="adressWork"
                type="text"
                class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg mb-2 flex-grow mr-2"
                placeholder="Адрес работы"
                @input="$emit('openSave', true)"
            />

            <input
                v-model="timeToWork"
                type="number"
                class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg mb-2 w-52"
                placeholder="Сколько добираться"
                @input="$emit('openSave', true)"
            />
        </div>

        <div class="mt-4">
            <h3 class="font-medium text-gray-500">Пожелания по квартире</h3>
            <textarea 
                v-model="wishes"
                rows="4" 
                class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex mt-2 mb-10" 
                placeholder="Перечислите пожелания клиента по будующей квартире"
                @keydown.enter.exact.prevent
                @input="$emit('openSave', true)"
                @keydown.enter.shift.exact="newline">
            </textarea>
        </div>

    </div>
</template>


<script>
export default {
    props: ['client'],
    data: () => ({
        exceptions: null,
        criterions: [
            {title: 'Проживание с детьми', checked: false},
            {title: 'Метро', checked: false},
            {title: 'Фитнес', checked: false},
            {title: 'Школа', checked: false},
        ],
        adressWork: null,
        timeToWork: null,
        area: null,
        wishes: null,
        date: null,
        cause: null
    }),

    mounted() {
        this.checkInfo()
    },

    methods: {
        checkInfo() {
            if(!this.client.criterion) return

            const criterionRef = this.client.criterion

            this.exceptions = criterionRef.exceptions
            this.criterions = criterionRef.criterion
            this.adressWork = criterionRef.adressWork
            this.timeToWork = criterionRef.timeToWork
            this.area = criterionRef.area
            this.wishes = criterionRef.wishes
            this.date = criterionRef.date
            this.cause = criterionRef.cause

        },

        async saveCriterion() {
            try {
                const data = {
                    exceptions: this.exceptions ? this.exceptions : null,
                    criterion: this.criterions ? this.criterions : null,
                    adressWork: this.adressWork ? this.adressWork : null,
                    timeToWork: this.timeToWork ? this.timeToWork : null,
                    area: this.area ? this.area : null,
                    wishes: this.wishes ? this.wishes : null,
                    date: this.date ? this.date : null,
                    cause: this.cause ? this.cause : null
                }
                await this.$store.dispatch('saveCriterion', {data, clientId: this.client.id})
            } catch (e) {throw e}
        },

        newline() {
            this.value = `${this.value}\n`;
        },
    }
}
</script>