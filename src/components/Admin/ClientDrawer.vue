<template>
    <div class="absolute inset-0 z-50 flex justify-end overflow-hidden">
        <div class="flex flex-col w-2/4 h-screen bg-white shadow-2xl z-30">

            <div class="border-b p-5 flex justify-between items-center">
                <span class="text-xl font-medium select-none">Добавление клиента</span>

                <div class="flex items-center">
                    <div 
                        class="mr-4 border rounded font-medium px-2 py-1 border-gray-300 select-none transition"
                        :class="{
                            'border-blue-700 text-white bg-blue-700 hover:shadow-xl cursor-pointer': formVerify,
                            'text-gray-500': !formVerify
                        }"
                        @click="addNewUser"
                    >
                        Сохранить
                    </div>
                    <div class="cursor-pointer" @click="$emit('closeDrawer')">
                        <svg class="w-6 h-6 mt-0.5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>

            </div> 
            <!-- header -->

            <div class="overflow-y-auto flex flex-col">
                <v-collapse-group>
                    <v-collapse-wrapper class="flex flex-col" :active="true">
                        <div v-collapse-toggle class="px-5 py-2 bg-gray-200 font-medium text-gray-600 cursor-pointer flex justify-between items-center hover:bg-gray-300 transition mb-1">
                            <span class="select-none">Основная информация</span>
                            <span>
                                <svg 
                                class="w-6 h-6 transition transform -rotate-90"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <div v-collapse-content>
                            <div class="px-6 py-4 flex flex-col space-y-4">
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium required">Телефон</label>
                                    <masked-input v-model="phone" type="text" mask="\+\7 (111) 111 11-11" placeholder="+7 (XXX) XXX-XX-XX" class="flex-grow border-2 focus:outline-none py-1 px-3 rounded" />
                                </div>
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Имя</label>
                                    <input v-model="name" type="text" class="flex-grow border-2 focus:outline-none py-1 px-3 rounded" placeholder="Иван">
                                </div>
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Фамилия</label>
                                    <input v-model="surname" type="text" class="flex-grow border-2 focus:outline-none py-1 px-3 rounded" placeholder="Иванов">
                                </div>
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Место работы</label>
                                    <input v-model="company" type="text" class="flex-grow border-2 focus:outline-none py-1 px-3 rounded">
                                </div>
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Бюджет</label>
                                    <currency-input
                                        v-model="budget"
                                        currency="RUB"
                                        :precision="0"
                                        :distraction-free="false"
                                        class="flex-grow border-2 focus:outline-none py-1 px-3 rounded" 
                                    />
                                </div>
                            </div>
                        </div>
                    </v-collapse-wrapper>
                    <v-collapse-wrapper class="flex flex-col">
                        <div v-collapse-toggle class="px-5 py-2 bg-gray-200 font-medium text-gray-600 cursor-pointer flex justify-between items-center hover:bg-gray-300 transition mb-1">
                            <span class="select-none">Место проживания</span>
                            <span>
                                <svg 
                                class="w-6 h-6 transition transform -rotate-90"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <div v-collapse-content>
                           <div class="px-6 py-4 flex flex-col space-y-4">
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Город</label>
                                    <input v-model="city" type="text" class="flex-grow border-2 focus:outline-none py-1 px-3 rounded" placeholder="Москва">
                                </div>
                                <div class="flex items-center">
                                    <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Адрес</label>
                                    <input v-model="adress" type="text" class="flex-grow border-2 focus:outline-none py-1 px-3 rounded" placeholder="ул. Пушкина, д. 15">
                                </div>
                           </div>
                        </div>
                    </v-collapse-wrapper>
                </v-collapse-group>
                
            </div>
            <!-- main -->

        </div>
    </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
import { CurrencyInput } from 'vue-currency-input'
export default {
    data: () => ({
        formVerify: false,
        phone: '',
        name: '',
        surname: '',
        city: '',
        company: '',
        adress: '',
        budget: 0,
    }),


    watch: {
        phone() {
            if(this.phone.toString().indexOf('_') === -1 && this.phone !== '') this.formVerify = true
            else this.formVerify = false
        },
    },

    mounted() {
        
    },


    methods: {
        async addNewUser() {
            if(!this.formVerify) return
            try {

                const formData = {
                    phone: this.phone,
                    name: this.name,
                    surname: this.surname,
                    company: this.company,
                    budget: this.budget,
                    city: this.city,
                    adress: this.adress
                }

                await this.$store.dispatch('addNewClient', formData)
                
                this.$toasts.push({
                    type: 'success',
                    message: 'Клиент успешно добавлен'
                })
                this.$emit('addNewClient')
                this.clearInputs()
            } catch (e) {
                this.$toasts.push({
                    type: 'error',
                    message: 'Что-то пошло не так'
                })
                throw e
            }
            
        },









        clearInputs() {
            this.phone = '',
            this.name = '',
            this.surname = '',
            this.city = '',
            this.company = '',
            this.adress = '',
            this.budget = 0
        }

    },

    components: {
        CurrencyInput, MaskedInput
    }
}
</script>

<style>
.required:after {
    content:" *";
    color: red;
}


.v-collapse-content {
    max-height: 0;
    transition: max-height 0.3s ease-out;
    overflow: hidden;
    padding: 0;
}
   
.v-collapse-content-end {
    transition: max-height 0.3s ease-in;
    max-height: 500px;
}
</style>