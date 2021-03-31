<template>
    <Loading v-if="loading" />
    <div v-else class="flex flex-col container mx-auto pt-4 h-full">
      <ClientsHeader :categories="categories" :clients="clients" :key="refreshList2"/>
      <ClientsList :categories="categories" :clients="clients" @openItemDrawer="openItemDrawer" @catchNewClient="fetchClients(false)" :key="refreshList"/>

        <transition name="fade">
          <ItemDrawer v-if="itemsDrawer" :client="client" @closeDrawer="itemsDrawer = false" @reloadList="fetchClients(true)"/>
        </transition>
    </div>
</template>

<script>
import ClientsHeader from '@/components/Clients/ClientsHeader'
import ClientsList from '@/components/Clients/ClientsList'
import ItemDrawer from '@/components/Clients/ItemDrawer'
export default {


  data: () => ({
      loading: true,
      itemsDrawer: false,
      client: {},
      categories: [
          {id: 0, title: 'Не обработано', color: 'gray-500'},
          {id: 1, title: 'Обработано', color: 'blue-500'},
          {id: 2, title: 'Переговоры', color: 'yellow-300'},
          {id: 3, title: 'Просмотр квартир', color: 'yellow-600'},
          {id: 4, title: 'Успешно', color: 'green-500'},
      ],
      clients: [],
      refreshList: 0,
      refreshList2: 1
  }),

    async mounted() {
        await this.$store.dispatch('fetchClients')
        this.fetchClients(false)
        this.loading = false
    },

    methods: {
        changeTypeDisplay(type) {
            this.typeDisplay = type
        },

        async fetchClients(bool) {
          await this.$store.dispatch('fetchClients')
          this.clients = await this.$store.dispatch('fetchUserClients')
          if(bool) {
            this.refreshList++
            this.refreshList2++
          }
        },

        openItemDrawer(item) {
          this.client = item
          this.itemsDrawer = true
        }
    },


  components: {
    ClientsHeader,
    ClientsList,
    ItemDrawer
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
</style>