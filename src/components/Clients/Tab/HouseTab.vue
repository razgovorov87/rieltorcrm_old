<template>
	<div class="px-8 py-4 flex flex-col space-y-4">
		<div class="flex flex-col">
			<h3 class="font-medium text-gray-500">Интересующий объект</h3>
			<div class="flex flex-col my-2 px-4">
				<div class="flex mt-2">
					<span class="font-medium text-gray-500 w-24">Адрес:</span>
					<span class="border-b text-gray-500 border-b border-gray-500 ml-2">{{
						client.interestingObj.adress
					}}</span>
				</div>

				<div
					v-if="client.interestingObj.floor && client.interestingObj.numStoreys"
					class="flex mt-2"
				>
					<span class="font-medium text-gray-500 w-24">Этаж:</span>
					<span class="border-b text-gray-500 border-b border-gray-500 ml-2">{{
						client.interestingObj.floor + '/' + client.interestingObj.numStoreys
					}}</span>
				</div>

				<div v-else class="flex mt-2">
					<span class="font-medium text-gray-500 w-24">Этаж:</span>
					<span class="border-b text-gray-500 ml-2">-</span>
				</div>

				<div class="flex mt-2">
					<span class="font-medium text-gray-500 w-24">Стоимость:</span>
					<span class="border-b text-gray-500 ml-2 border-b border-gray-500">{{
						client.interestingObj.price | currency
					}}</span>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<h3 class="font-medium text-gray-500">Предложенные объекты</h3>
			<div v-for="(obj, idx) in objects" :key="obj + idx" class="flex mt-3 items-center">
				<input
					v-model="objects[idx].link"
					type="text"
					placeholder="Ссылка на отчет в PDF"
					class="flex-grow border-2 focus:outline-none py-1 px-3 rounded mr-4"
					@input="$emit('openSave', true)"
				/>
				<button class="focus:outline-none" @click="deleteObj(idx)">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div
				class="flex justify-center items-center mt-4 font-medium text-gray-500 cursor-pointer"
				@click="addProposedObject"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				<span>Добавить новую ссылку</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['client'],
	data: () => ({
		objects: [],
		objStartLength: null,
	}),

	watch: {
		objects() {
			if (this.objects.length !== this.objStartLength) this.$emit('openSave', true);
			else this.$emit('openSave', false);
		},
	},

	mounted() {
		const response = this.client.proposedObjects;
		if (response) {
			this.client.proposedObjects.forEach((el) => {
				this.objects.push(el);
			});
		}
		this.objStartLength = this.objects.length;
	},

	methods: {
		addProposedObject() {
			this.objects.push({
				link: '',
			});
		},

		deleteObj(idx) {
			this.objects.splice(idx, 1);
		},

		async saveLinks() {
			const data = {
				clientId: this.client.id,
				arr: this.objects,
			};
			await this.$store.dispatch('saveClientLinks', data);
		},
	},
};
</script>
