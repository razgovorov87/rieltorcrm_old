<template>
    <div>
        <ReversesHeader />
        <Loading v-if="loading" />
        <NoData v-else-if="!reverses || reverses.length === 0" :screen="true" />

        <div v-else class="relative flex-grow pt-divider">
            <ReversesTable :reverses="reverses" />
        </div>
    </div>
</template>

<script>
import ReversesHeader from '@/components/Reverses/ReversesHeader'
import ReversesTable from '@/components/Reverses/ReversesTable'
import NoData from "@/components/NoData";
export default {
    data: () => ({
        loading: false,
        reverses: []
    }),

    mounted() {
        this.fetchReverses()
    },

    methods: {
        async fetchReverses() {
            try {
              this.reverses = await this.$store.dispatch('fetchReserves')  
            } catch (e) {throw e}
        }
    },

    components: {
        ReversesHeader,
        ReversesTable,
        NoData
    }
}
</script>