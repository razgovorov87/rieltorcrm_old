<template>
    <div class="flex-shrink-0 w-divider bg-dividerBg h-full flex flex-col z-20">

        <div class="logo h-divider flex-shrink-0"></div>

        <nav class="flex flex-col w-full items-center justify-start mt-2 flex-grow">
            
            <router-link to="/" class="py-2 flex flex-col items-center text-gray-400 outline-none hover:text-white transition w-full" exact>
                <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span class="text-xs font-semibold mt-1">Клиенты</span>
            </router-link>

            <router-link to="/object" class="py-2 flex flex-col items-center text-gray-400 outline-none hover:text-white transition w-full" exact>
                <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="text-xs font-semibold mt-1">Объекты</span>
            </router-link>

        </nav>
      
    </div>
</template>

<script>
export default {

}
</script>

<style>
.router-link-active {
    @apply bg-darkDivider text-white !important;
}
</style>