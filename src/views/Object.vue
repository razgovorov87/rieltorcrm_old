<template>
    <div class="flex flex-col h-full">
        <div id="objectWrapper" ref="objectWrapper" class="pt-10 py-4 relative">
            <div class="absolute inset-0 bg-white z-10 opacity-70"></div>
            <div class="mx-auto container z-50 relative">
                <div class="flex justify-center rounded bg-white items-center">
                    <input type="text" placeholder="Поиск по ID, названию или адресу..." class="py-2 px-4 border-r flex-grow focus:outline-none">

                    <div class="flex text-gray-800 items-center py-2 px-4 border-r relative cursor-pointer select-none flex-shrink-0 w-36 justify-between" @click="saleList = !saleList">
                        <span>{{sale}}</span>
                        <svg class="w-3 text-gray-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <div v-if="saleList" class="absolute top-full inset-x-0 bg-white border shadow">
                            <div class="flex flex-col w-full">
                                <span class="border-b pl-2 py-2 hover:bg-gray-100" @click="sale = $event.target.innerText">Продажа</span>
                                <span class="pl-2 py-2 hover:bg-gray-100" @click="sale = $event.target.innerText">Аренда</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex text-gray-800 items-center py-2 px-4 border-r relative cursor-pointer select-none flex-shrink-0 w-40 justify-between" @click="typeList = !typeList">
                        <span>{{type}}</span>
                        <svg class="w-3 text-gray-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <div v-if="typeList" class="absolute top-full inset-x-0 bg-white border shadow">
                            <div class="flex flex-col w-full">
                                <span class="border-b pl-2 py-2 hover:bg-gray-100" @click="type = $event.target.innerText">Все типы</span>
                                <span class="border-b pl-2 py-2 hover:bg-gray-100" @click="type = $event.target.innerText">Квартира</span>
                                <span class="border-b pl-2 py-2 hover:bg-gray-100" @click="type = $event.target.innerText">Дом</span>
                                <span class="pl-2 py-2 hover:bg-gray-100" @click="type = $event.target.innerText">Коттедж</span>
                            </div>
                        </div>
                    </div>
                    <input type="number" placeholder="Площадь, от" class="py-2 px-4 focus:outline-none w-36" :value="areaFrom">
                    <span class="text-gray-500 text-xl px-4">-</span>
                    <input type="number" placeholder="до" class="py-2 px-4 border-r focus:outline-none w-36" :value="areaTo">
                    <input type="number" placeholder="Цена, от" class="py-2 px-4 focus:outline-none w-36" :value="priceFrom">
                    <span class="text-gray-500 text-xl px-4">-</span>
                    <input type="number" placeholder="до" class="py-2 px-4 border-r focus:outline-none w-36" :value="priceTo">
                </div>
                <div class="flex justify-end mt-4">
                    <button class="text-gray-500 font-semibold focus:outline-none mr-6">Сбросить фильтры</button>
                    <button class="bg-blue-600 text-white font-semibold focus:outline-none py-2 px-4 transition hover:bg-blue-500 focus:ring-2">Показать 20 объектов</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col flex-grow" style="height: calc(100vh - 152px);">
            <div class="headerTable">
                <div class="headerTable-item borderNone"></div>
                <div class="headerTable-item textLeft">Название</div>
                <div class="headerTable-item">Этаж</div>
                <div class="headerTable-item">Площадь</div>
                <div class="headerTable-item">Стоимость</div>
                <div class="headerTable-item">Агент</div>
                <div class="headerTable-item">Статус</div>
                <div class="headerTable-item">Дата</div>
            </div>
            <div class="flex-grow overflow-y-auto">


                <div class="object bg-white border-b hover:bg-gray-100 cursor-pointer" v-for="i in 25" :key="i">
                    <div class="p-6 text-center">
                        <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80" alt="">
                    </div>
                    <div class="flex flex-col justify-center">
                        <h2 class="text-blue-500 font-semibold -mb-1">Продажа квартиры</h2>
                        <span class="text-sm text-gray-500">г. Москва, пр-кт Андропова</span>
                    </div>
                    <div class="flex items-center justify-center">6/12</div>
                    <div class="flex flex-col px-2 text-sm items-center justify-center">
                        <span>Общая: 135.00</span>
                        <span>Жилая: 95.00</span>
                        <span>Кухня: 20.00</span>
                        <span>Сан. узел: 19.00</span>
                    </div>
                    <div class="flex justify-center items-center">{{ 29000000 | currency }}</div>
                    <div class="flex items-center justify-center text-sm text-center">
                        Константин Кузнецов
                    </div>
                    <div class="flex items-center justify-center">
                        <span class="py-1 px-2 text-xs text-gray-800 bg-yellow-500 rounded">Опубликованы</span>
                    </div>
                    <div class="flex items-center justify-center">
                        29.09.2020
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        sale: 'Продажа',
        saleList: false,
        type: 'Все типы',
        typeList: false,
        areaFrom: null,
        areaTo: null,
        priceFrom: null,
        priceTo: null

    }),

    mounted() {
        this.getTableHeight
    },

    methods: {
        getTableHeight() {
            const obj = document.querySelector('#objectWrapper')
            const height = getComputedStyle(obj).height;
            console.log(height)
            return `height: calc(100vh - ${height})`
        }
    }
    
}
</script>

<style scoped>
.headerTable {
    display: grid;
    /* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
    grid-template-columns: 150px 500px 1fr 1fr 1fr 0.7fr 1fr 1fr;
    background-color: #fff;
    @apply border-b shadow;
}

.object {
    display: grid;
    /* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
    grid-template-columns: 150px 500px 1fr 1fr 1fr 0.7fr 1fr 1fr;
}

.headerTable-item {
    @apply text-center py-3 border-r text-gray-400 uppercase font-semibold text-sm tracking-widest;
}

.headerTable-item.borderNone {
    @apply border-transparent !important;
}

.headerTable-item.textLeft {
    @apply text-left !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
}
#objectWrapper {
    background: url('../assets/city.jpg') bottom no-repeat;
    background-size: cover;
}
</style>