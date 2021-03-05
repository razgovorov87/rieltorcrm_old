<template>
    <div class="flex-shrink-0 w-divider bg-dividerBg h-full flex flex-col z-20">

        <div class="logo h-divider flex-shrink-0"></div>

        <nav class="flex flex-col w-full items-center justify-start mt-2 flex-grow">
            
            <router-link to="#" class="py-2 flex flex-col items-center text-gray-400 outline-none hover:text-white transition">
                <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span class="text-xs font-semibold mt-1">Клиенты</span>
            </router-link>

        </nav>

        <router-link to="#" class="flex flex-col bg-darkDivider items-center justify-center border-t border-gray-500 h-divider text-gray-400 hover:text-white transition">
            <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </router-link>
      
    </div>
</template>