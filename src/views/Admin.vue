<template>
    <div>
        <AdminHeader @changeTypeDisplay="changeTypeDisplay" :typeDisplay="typeDisplay"/>
        <div class="relative flex-grow pt-divider">
            <!-- <Loading /> -->
            <AdminTable />
        </div>
    </div>
</template>

<script>
import AdminHeader from '@/components/Admin/AdminHeader'
import AdminTable from '@/components/Admin/AdminTable'
export default {
    data: () => ({
        typeDisplay: 'table'
    }),

    methods: {
        changeTypeDisplay(type) {
            this.typeDisplay = type
        }
    },

    components: {
        AdminHeader, AdminTable
    }
}
</script>