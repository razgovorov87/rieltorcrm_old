<template>
    <div class="py-4 px-6 flex flex-col">
        <div class="flex justify-between">
            <h3 class="text-xl font-semibold items-center flex-grow">Информация о клиенте</h3>
        </div>

        <div class="flex flex-col space-y-3 mt-4">
            <div class="flex text-sm">
                <div class="w-1/3 font-semibold text-gray-600 flex-shrink-0 leading-3">Мобильный телефон</div>
                <div class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed">81234567890</div>
            </div>


            <div class="flex text-sm items-center">
                <div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">ФИО</div>
                <div class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between relative cursor-pointer" @click="editName = true">
                    <span v-show="!editName">{{name}}</span>
                    <svg v-show="!editName" class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span v-if="editName" class="absolute inset-0">
                        <input class="focus:outline-none bg-transparent italic" type="text" :value="name" @input="name = $event.target.value" @keydown.enter="editName = false">
                    </span>
                </div>
            </div>

            <div class="flex text-sm items-center">
                <div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">Компания</div>
                <div class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between relative cursor-pointer" @click="editCompany = true">
                    <span v-show="!editCompany">{{company}}</span>
                    <svg v-show="!editCompany" class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span v-if="editCompany" class="absolute inset-0">
                        <input class="focus:outline-none bg-transparent italic" type="text" :value="company" @input="company = $event.target.value" @keydown.enter="editCompany = false">
                    </span>
                </div>
            </div>

            <div class="flex text-sm items-center">
                <div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">Бюджет</div>
                <div class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between relative cursor-pointer" @click="editBudget = true">
                    <span v-show="!editBudget">{{budget | currency}}</span>
                    <svg v-show="!editBudget" class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span v-if="editBudget" class="absolute inset-0">
                        <input class="focus:outline-none bg-transparent italic" type="text" :value="budget" @input="budget = $event.target.value" @keydown.enter="editBudget = false">
                    </span>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        name: 'Константин Кузнецов',
        editName: false,
        company: 'Сбербанк',
        editCompany: false,
        budget: 2000000,
        editBudget: false,
    }),
}
</script>