<template>
    <div class="container py-4 mx-auto">
        <ClientsHeader :categories="categories" :clients="clients"/>
        <ClientsList :categories="categories" :clients="clients" :disableBtn="true" @openItemDrawer="openItemDrawer()"/>
    </div>
</template>

<script>
import ClientsHeader from '@/components/Clients/ClientsHeader'
import ClientsList from '@/components/Clients/ClientsList'
export default {
    props: ['categories', 'clients'],

    data: () => ({
        itemsDrawer: false
    }),

    methods: {
        openItemDrawer(item) {
        this.itemsDrawer = true
        }
    },

    components: {
        ClientsHeader,
        ClientsList
    }
}
</script>