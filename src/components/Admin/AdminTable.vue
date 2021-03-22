<template>
    <div class="bg-white shadow-md rounded my-6">
        <table class="w-full">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full">
                    <th class="py-3 px-6 text-left w-1/4">Клиент</th>
                    <th class="py-3 px-6 text-left w-1/4">Агент</th>
                    <th class="py-3 px-6 text-center w-2/12">Телефон</th>
                    <th class="py-3 px-6 text-center w-2/12">Статус</th>
                    <th class="py-3 px-6 text-center w-2/12">Действия</th>
                </tr>
            </thead>
                <tbody class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full" style="max-height: 82vh;">
                    <transition-group tag="tr" name="list">
                        <tr v-for="i in 50" :key="i" class="border-b border-gray-200 hover:bg-gray-100 flex items-center">
                            <td class="w-1/4 py-3 px-6 text-left whitespace-nowrap">
                                <div class="flex items-center">
                                    <span class="font-medium">Имя Фамилия</span>
                                </div>
                            </td>
                            <td class="w-1/4 py-3 px-6 text-left">
                                <div class="flex items-center">
                                    <div class="mr-2">
                                        <img class="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/5.jpg"/>
                                    </div>
                                    <span>Иванов Иван</span>
                                </div>
                            </td>
                            <td class="w-2/12 py-3 px-6 text-center">
                                <div class="flex items-center justify-center">
                                    <div class="mr-2">
                                        <svg class="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg> 
                                    </div>
                                    <span class="font-medium border-b border-gray-400 truncate">+7 (900) 123 45 69</span>
                                </div>
                            </td>
                            <td class="w-2/12 py-3 px-6 text-center">
                                <span class="bg-gray-500 text-white py-1 px-3 rounded-full text-xs truncate">Не обработано</span>
                            </td>
                            <td class="w-2/12 py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </transition-group>
            </tbody>
        </table>
    </div>
</template>