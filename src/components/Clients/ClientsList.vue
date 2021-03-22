<template>
    <div class="flex space-x-2 justify-center mt-1 h-full">

        <div class="list-column space-y-0" style="margin: 0;">
            <div class="w-full py-2 px-2 border-2 text-gray-400 cursor-pointer bg-transparent text-center hover:bg-gray-200 transition" @click="addNewItem">Взять нового клиента</div>
                <transition-group name="list" tag="div">
                    <div v-for="item in list.slice().reverse()" :key="item.id" class="w-full px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition" :class="item.name ? 'py-1' : 'py-2'" @click="openItemDrawer(item)">
                        <div class="flex flex-col flex-grow">
                            <span v-if="item.name" class="text-sm text-gray-500">{{item.name}}</span>
                            <h2 class="text-blue-500 font-semibold truncate" style="max-width: 234px;">{{item.phone}}</h2>
                        </div>
                        <div class="flex flex-shrink-0 items-center">
                            <span class="text-xs text-gray-500">31.08.2020</span>
                        </div>
                    </div>
                </transition-group>
        </div>

        <!-- <div v-for="category in categories.slice(1, 5)" :key="category.id" class="list-column">
            <div v-for="i in 15" :key="i" class="w-full py-1 px-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition">
                <div class="flex flex-col flex-grow">
                    <span class="text-sm text-gray-500">Иванов Иван</span>
                    <h2 class="text-blue-500 font-semibold mb-1 truncate" style="max-width: 234px;">Куплю квартиру в центре</h2>
                    <span class="text-sm text-gray-500">{{ 13000000 | currency }}</span>
                </div>
                <div class="flex flex-shrink-0 items-start">
                    <span class="text-xs text-gray-500">31.08.2020</span>
                </div>
            </div>
        </div> -->

        <draggable 
            v-model="processed"
            class="list-column"
            v-bind="dragOptions"
            @start="drag=true" @end="drag=false"
            @change="log"
        >
            <transition-group type="transition" name="flip-list">
                <div v-for="i in processed" :key="i.id" class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none">
                    <div class="flex flex-col flex-grow">
                        <span class="text-sm text-gray-500">{{ i.client }}</span>
                        <h2 class="text-blue-500 font-semibold mb-1 truncate" style="max-width: 234px;">{{i.title}}</h2>
                        <span class="text-sm text-gray-500">{{ 13000000 | currency }}</span>
                    </div>
                    <div class="flex flex-shrink-0 items-start">
                        <span class="text-xs text-gray-500">31.08.2020</span>
                    </div>
                </div>
            </transition-group>
        </draggable>

        <draggable 
            v-model="conversation"
            class="list-column"
            v-bind="dragOptions"
            @start="drag=true" @end="drag=false"
            @change="log"
        >
            <transition-group type="transition" name="flip-list">
                <div v-for="i in conversation" :key="i.id" class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none">
                    <div class="flex flex-col flex-grow">
                        <span class="text-sm text-gray-500">{{ i.client }}</span>
                        <h2 class="text-blue-500 font-semibold mb-1 truncate" style="max-width: 234px;">{{i.title}}</h2>
                        <span class="text-sm text-gray-500">{{ 13000000 | currency }}</span>
                    </div>
                    <div class="flex flex-shrink-0 items-start">
                        <span class="text-xs text-gray-500">31.08.2020</span>
                    </div>
                </div>
            </transition-group>
        </draggable>

        <draggable 
            v-model="view"
            class="list-column"
            v-bind="dragOptions"
            @start="drag=true" @end="drag=false"
            @change="log"
        >
            <transition-group type="transition" name="flip-list">
                <div v-for="i in view" :key="i.id" class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none">
                    <div class="flex flex-col flex-grow">
                        <span class="text-sm text-gray-500">{{ i.client }}</span>
                        <h2 class="text-blue-500 font-semibold mb-1 truncate" style="max-width: 234px;">{{i.title}}</h2>
                        <span class="text-sm text-gray-500">{{ 13000000 | currency }}</span>
                    </div>
                    <div class="flex flex-shrink-0 items-start">
                        <span class="text-xs text-gray-500">31.08.2020</span>
                    </div>
                </div>
            </transition-group>
        </draggable>

        <draggable 
            v-model="success"
            class="list-column"
            v-bind="dragOptions"
            @start="drag=true" @end="drag=false"
            @change="log"
        >
            <transition-group type="transition" name="list">
                <div v-for="i in success" :key="i.id" class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none">
                    <div class="flex flex-col flex-grow">
                        <span class="text-sm text-gray-500">{{ i.client }}</span>
                        <h2 class="text-blue-500 font-semibold mb-1 truncate" style="max-width: 234px;">{{i.title}}</h2>
                        <span class="text-sm text-gray-500">{{ 13000000 | currency }}</span>
                    </div>
                    <div class="flex flex-shrink-0 items-start">
                        <span class="text-xs text-gray-500">31.08.2020</span>
                    </div>
                </div>
            </transition-group>
        </draggable>




    </div>

</template>

<script>
import draggable from 'vuedraggable';
export default {
    props: ['categories'],

    data: () => ({
        list: [
            {id: 0, phone: '+7 (923) 123 45 67'},
            {id: 1, phone: '+7 (923) 123 45 67'},
            {id: 2, phone: '+7 (123) 456 78 90', name: 'Иванов Иван'},
        ],
        processed: [
            {id: 10, title: 'asdasdasd', price: 2000000, client: 'Сергей', date: '26.02.20'},
            {id: 11, title: 'asdasdasd', price: 2000000, client: 'Сергей', date: '26.02.20'},
            {id: 12, title: 'asdasdasd', price: 2000000, client: 'Сергей', date: '26.02.20'},
            {id: 13, title: 'asdasdasd', price: 2000000, client: 'Сергей', date: '26.02.20'}
        ],
        conversation: [
            {id: 0, title: 'ф123123123', price: 2000000, client: 'Алексей', date: '26.02.20'},
            {id: 1, title: 'ф123123123', price: 2000000, client: 'Алексей', date: '26.02.20'},
            {id: 2, title: 'ф123123123', price: 2000000, client: 'Алексей', date: '26.02.20'},
            {id: 3, title: 'ф123123123', price: 2000000, client: 'Алексей', date: '26.02.20'},
            {id: 4, title: 'ф123123123', price: 2000000, client: 'Алексей', date: '26.02.20'}
        ],
        view: [],
        success: [],
        drag: false
    }),

    methods: {
        addNewItem() {
            this.list.push({
                id: this.list.length + 1,
                phone: '123 123 123'
            })
        },

        openItemDrawer(item) {
            this.$emit('openItemDrawer', item)
        },

        log: function(e) {
            window.console.log(e);
        }
    },

    computed: {
    dragOptions() {
            return {
                animation: 200,
                group: "clients",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },


    components: {draggable}
}
</script>


<style>
.list-column {
  @apply w-1/5 flex flex-col space-y-2 flex-shrink-0 overflow-y-auto h-full;
}

.list-column {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}




.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>