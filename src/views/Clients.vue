<template>
    <div class="flex flex-col container mx-auto pt-4 h-full"> 
      <ClientsHeader :categories="categories"/>
      <ClientsList :categories="categories" @openItemDrawer="openItemDrawer()"/>

        <transition name="fade">
          <ItemDrawer v-if="itemsDrawer" @closeDrawer="itemsDrawer = false" />
        </transition>
    </div>
</template>

<script>
import ClientsHeader from '@/components/Clients/ClientsHeader'
import ClientsList from '@/components/Clients/ClientsList'
import ItemDrawer from '@/components/Clients/ItemDrawer'
export default {


  data: () => ({
      itemsDrawer: true,
      categories: [
          {id: 0, title: 'Не обработано', color: 'gray-500'},
          {id: 1, title: 'Обработано', color: 'blue-500'},
          {id: 2, title: 'Переговоры', color: 'yellow-300'},
          {id: 3, title: 'Просмотр квартир', color: 'yellow-600'},
          {id: 4, title: 'Успешно', color: 'green-500'},
      ]
  }),

  methods: {
    openItemDrawer(item) {
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