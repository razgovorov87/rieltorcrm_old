<template>
	<div class="flex flex-col flex-grow">
		<div class="headerTable">
			<div class="headerTable-item borderNone"></div>
			<div class="headerTable-item textLeft">Адрес</div>
			<div class="headerTable-item">Этаж</div>
			<div class="headerTable-item">Стоимость</div>
			<div class="headerTable-item">Тип</div>
		</div>
		<div class="flex-grow overflow-y-auto">
			<div class="object bg-white border-b hover:bg-gray-100" v-for="obj in objects" :key="obj.id">
				<div class="flex justify-center py-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 cursor-pointer transition text-gray-400 hover:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						@click="$emit('selectObj', obj)"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div class="flex flex-col justify-center">
					<h2 class="text-blue-500 font-semibold -mb-1">
						{{ obj.adress }}
					</h2>
				</div>
				<div v-if="obj.floor && obj.numStoreys" class="flex items-center justify-center">
					{{ obj.floor + '/' + obj.numStoreys }}
				</div>
				<div v-else class="flex items-center justify-center">-</div>
				<div class="flex justify-center items-center">{{ obj.price | currency }}</div>
				<div class="flex items-center justify-center">
					<span class="py-1 px-2 text-sm text-gray-800 bg-yellow-500 rounded">{{ obj.type }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		objects: [],
	}),

	async mounted() {
		this.objects = await this.$store.dispatch('fetchObjects');
	},
};
</script>

<style scoped>
.headerTable {
	display: grid;
	/* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
	grid-template-columns: 150px 500px 1fr 1fr 1fr;
	background-color: #fff;
	@apply border-b shadow items-center;
}

.object {
	display: grid;
	/* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
	grid-template-columns: 150px 500px 1fr 1fr 1fr;
}

.headerTable-item {
	@apply text-center py-3 border-r text-gray-400 uppercase font-semibold text-sm tracking-widest;
}

.headerTable-item.borderNone {
	@apply border-transparent !important;
}

.headerTable-item.textLeft {
	@apply text-left !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input[type='number'] {
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
}
</style>
