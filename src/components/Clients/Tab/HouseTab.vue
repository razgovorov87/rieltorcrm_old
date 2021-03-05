<template>
    <div>
        Квартиры
    </div>
</template>

<script>
export default {
    data: () => ({
        name: 'Максим',
        editName: false,
        budget: 200000,
        editBudget: false,
        residence: 'Москва',
        residenceList: ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Нижний Новгород'],
        editResidence: false
    }),

    methods: {
        selectResidence(item) {
            this.residence = item
            this.editResidence = false
        }
    }
}
</script>