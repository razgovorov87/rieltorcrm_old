<template>
    <div class="absolute inset-0 ml-divider h-screen z-50 flex items-center justify-center transition">
        <div class="w-5/12 h-full bg-white flex flex-col relative shadow-2xl z-20">
            <div class="bg-darkDivider px-8 pt-8 w-full">  
                <div class="-ml-7 flex items-center mb-4 cursor-pointer">
                    <button class="outline-none mt-1 mr-1" @click="closeDrawer">
                        <svg class="w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 class="text-white text-2xl font-bold truncate flex-grow" style="max-width: 100%;" @click="closeDrawer">Куплю квартиру в центре</h1>
                    <!-- <button class="focus:outline-none rounded-full hover:bg-gray-400 p-1 flex items-center justify-center transition relative" @click="infoMenu = true">
                        <svg class="w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                        <div v-if="infoMenu" class="absolute right-full mr-1 bg-white top-1/2 rounded flex flex-col">
                            <span class="text-gray-400 font-semibold px-4 py-1 text-sm hover:bg-gray-100 rounded">Освободить</span>
                            <span class="text-red-600 font-semibold border-t px-4 py-1 text-sm hover:bg-gray-100 rounded">Удалить</span>
                        </div>
                    </button> -->
                </div>
                <div class="text-gray-600 text-lg flex items-center mb-4">
                    <span class="mr-2">#11396378</span>
                    <span class="uppercase text-sm py-1 px-2 border rounded border-gray-600 hover:border-gray-400 hover:text-gray-400 cursor-pointer">Скопировать</span>
                </div>
                <div class="w-full flex flex-col mb-5">
                    <span class="text-gray-600 text-sm">Клиенты</span>
                    <div class="w-full rounded text-white text-lg font-bold relative pb-2 flex justify-between items-center pr-2 cursor-pointer" @click="categoriesMenu = true">
                        <span>{{categoryName}}</span>
                        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <transition name="opacity">
                            <div v-if="categoriesMenu" class="absolute top-0 left-0 w-full bg-white z-20 rounded">
                                <div v-for="category in categories" :key="category.id" class="py-2 px-4 bg-gray-400 text-base font-normal text-gray-800" :class="'bg-' + category.color" @click.stop="selectCategories(category)">{{category.title}}</div>
                            </div>
                        </transition>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-gray-900 rounded-xl flex z-10">
                            <div class="w-1/4 bg-blue-500 rounded-l-xl" :class="categoriesId < 1 ? 'hidden' : ''"></div>
                            <div class="w-1/4 bg-yellow-300" :class="categoriesId < 2 ? 'hidden' : ''"></div>
                            <div class="w-1/4 bg-yellow-600" :class="categoriesId < 3 ? 'hidden' : ''"></div>
                            <div class="w-1/4 bg-green-500" :class="categoriesId < 4 ? 'hidden' : ''"></div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-nowrap space-x-3">
                    <span v-for="(tab, idx) in tabs" :key="tab.id" class="font-bold pb-2 cursor-pointer transition" :class="idx === selectableTab ? 'text-white border-b-4' : 'text-gray-600' " @click="selectableTab = idx">{{tab.name}}</span>
                </div>
            </div>

            
            <div class="flex-grow">
                <HouseTab v-if="selectableTab === 0" />
                <div v-if="selectableTab === 1">
                    1
                </div>
            </div>

            <transition name="slideUp">
                <div v-if="saveItem" class="flex-shrink-0 w-full h-divider border-t flex items-center px-8 absolute bottom-0">
                    <button class="bg-blue-600 text-white font-semibold focus:outline-none py-2 px-4 transition hover:bg-blue-500 focus:ring-2 rounded">Сохранить</button>
                    <button class="text-gray-500 font-semibold focus:outline-none ml-4">Отменить</button>
                </div>
            </transition>

        </div>
        <div class="w-4/12 h-full bg-gray-200 relative px-1.5">
            <Logs />
        </div>
        <div class="w-3/12 h-full bg-gray-300">
            <Info />
        </div>
    </div>
</template>


<script>
import HouseTab from '@/components/Clients/Tab/HouseTab'
import Info from '@/components/Clients/Info'
import Logs from '@/components/Clients/Logs'
export default {
    data: () => ({
        infoMenu: true,
        categoriesMenu: false,
        startId: 0,
        categoriesId: 0,
        categories: [
          {id: 0, title: 'Не обработано', color: 'gray-500'},
          {id: 1, title: 'Обработано', color: 'blue-500'},
          {id: 2, title: 'Переговоры', color: 'yellow-300'},
          {id: 3, title: 'Просмотр квартир', color: 'yellow-600'},
          {id: 4, title: 'Успешно', color: 'green-500'},
        ],
        selectableTab: 0,
        tabs: [
            {id: 0, name: 'Объекты'},
            {id: 1, name: 'Договор'},
        ],
    }),

    methods: {
        closeDrawer() {
            this.$emit('closeDrawer')
        },

        selectCategories(category) {
            this.categoriesId = category.id
            this.categoriesMenu = false
        }
    },

    computed: {
        categoryName() {
            const category = this.categories.filter( category => category.id === this.categoriesId)
            return category[0].title
        },

        saveItem() {
            return this.startId !== this.categoriesId ? true : false
        }
    },


    components: {
        HouseTab,
        Info,
        Logs
    }
}
</script>

<style>
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity .3s ease;
}
.opacity-enter,
.opacity-leave-to {
    opacity: 0;
}

.slideUp-enter-active,
.slideUp-leave-active {
  transition: transform .3s ease;
}
.slideUp-enter,
.slideUp-leave-to {
    transform: translateY(100%);
}
</style>