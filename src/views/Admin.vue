<template>
    <div>
        <AdminHeader @changeTypeDisplay="changeTypeDisplay" :typeDisplay="typeDisplay" @addNewClient="addNewClientDrawer = true"/>
        <div class="relative flex-grow pt-divider">
            <Loading v-if="loading" />
            <AdminTable v-if="typeDisplay === 'table' && !loading" :categories="categories" :clients="clients"/>
            <AdminColumn v-if="typeDisplay === 'column' && !loading" :categories="categories" :clients="clients"/>
        </div>

        
        <transition name="opacity">
            <div v-show="addNewClientDrawer" class="absolute inset-0 bg-black opacity-30 z-20"></div>
        </transition>

        <transition name="fade">
            <ClientDrawer v-show="addNewClientDrawer" @closeDrawer="addNewClientDrawer = false" @addNewClient="fetchClients"/>
        </transition>
    </div>
</template>

<script>
import AdminHeader from '@/components/Admin/AdminHeader'
import AdminTable from '@/components/Admin/AdminTable'
import AdminColumn from '@/components/Admin/AdminColumn'
import ClientDrawer from '@/components/Admin/ClientDrawer'
export default {
    data: () => ({
        loading: true,
        typeDisplay: 'table',
        addNewClientDrawer: false,
        categories: [
          {id: 0, title: 'Не обработано', color: 'gray-500'},
          {id: 1, title: 'Обработано', color: 'blue-500'},
          {id: 2, title: 'Переговоры', color: 'yellow-300'},
          {id: 3, title: 'Просмотр квартир', color: 'yellow-600'},
          {id: 4, title: 'Успешно', color: 'green-500'},
        ],
        clients: []
    }),

    mounted() {
        this.fetchClients()
    },

    methods: {
        changeTypeDisplay(type) {
            this.typeDisplay = type
        },

        async fetchClients() {
            this.clients = await this.$store.dispatch('fetchClients')
            this.loading = false
        }
    },

    components: {
        AdminHeader, AdminTable, AdminColumn, ClientDrawer
    }
}
</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: transform .3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
}

.opacity-enter-active,
.opacity-leave-active {
  transition: .3s ease;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
</style>