<template>
    <header class="absolute h-divider bg-white z-10 w-full flex">

        <div class="flex items-center py-4 px-8 h-full border-r flex-shrink-0">
            <span class="uppercase font-bold">Панель администратора</span>
            <div class="text-gray-400 flex items-center ml-4 space-x-2">
                <div class="cursor-pointer group" @click="changeTypeDisplay('column')">
                    <svg class="w-6 transform rotate-90 group-hover:text-blue-500 transition" :class="typeDisplay === 'column' ? 'text-blue-500' : ''"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h7M4 12h12M4 18h16" />
                    </svg>
                </div>

                <div class="cursor-pointer group" @click="changeTypeDisplay('table')">
                    <svg class="w-6 group-hover:text-blue-500 transition" :class="typeDisplay === 'table' ? 'text-blue-500' : ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="flex flex-grow text-right items-center px-4">
            
        </div>

        <div class="flex items-center py-4 px-8 h-full border-l flex-shrink-0">

        </div>

    </header>
</template>

<script>
export default {
    props: ['typeDisplay'],


    methods: {
        changeTypeDisplay(type) {
            if( this.typeDisplay === type ) return
            
            this.$emit('changeTypeDisplay', type)
        }
    },
}
</script>
