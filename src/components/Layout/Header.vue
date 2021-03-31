<template>
    <header class="absolute pl-divider h-divider bg-white z-10 w-full flex">

        <div class="flex items-center py-4 px-8 h-full border-r flex-shrink-0">
            <span class="uppercase font-bold">{{routeName}}</span>
            <span class="text-xs text-gray-400 ml-2">Свободных в базе: {{ClientsLength}}</span>
        </div>

        <div class="flex flex-grow text-right items-center px-4">
            <div class="text-gray-400 w-full">0 сделок: <span class="text-gray-900">0 &#8381;</span> </div>
        </div>

        <div class="flex items-center py-4 px-8 h-full border-l flex-shrink-0">
            
        </div>

    </header>
</template>

<script>
export default {
    computed: {
        routeName() {
            return this.$route.name
        },

        ClientsLength() {
            if(Object.keys(this.$store.getters.clients).length !== 0) return this.$store.getters.clients.filter(client => !client.agent).length
            else return 0
        }
    },
}
</script>