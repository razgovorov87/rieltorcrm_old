<template>
	<div class="absolute inset-0 z-50 flex justify-end overflow-hidden">
		<div class="flex flex-col w-2/4 h-screen bg-white shadow-2xl z-30">
			<div class="border-b p-5 flex justify-between items-center">
				<span v-if="changeItem" class="text-xl font-medium select-none">Изменение объекта</span>
				<span v-else class="text-xl font-medium select-none">Добавление объекта</span>

				<div class="flex items-center">
					<div
						v-if="changeItem"
						class="mr-4 border rounded font-medium px-2 py-1 border-gray-300 select-none transition"
						:class="{
							'border-blue-700 text-white bg-blue-700 hover:shadow-xl cursor-pointer': formVerify,
							'text-gray-500': !formVerify,
						}"
						@click="saveChangeItem"
					>
						Сохранить
					</div>
					<div
						v-else
						class="mr-4 border rounded font-medium px-2 py-1 border-gray-300 select-none transition"
						:class="{
							'border-blue-700 text-white bg-blue-700 hover:shadow-xl cursor-pointer': formVerify,
							'text-gray-500': !formVerify,
						}"
						@click="addNewObject"
					>
						Сохранить
					</div>
					<div class="cursor-pointer" @click="$emit('closeDrawer')">
						<svg
							class="w-6 h-6 mt-0.5 text-gray-700"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
				</div>
			</div>
			<!-- header -->

			<div class="flex flex-col">
				<div>
					<div class="flex flex-col" :active="true">
						<div
							class="px-5 py-2 bg-gray-200 font-medium text-gray-600 cursor-pointer flex justify-between items-center hover:bg-gray-300 transition mb-1"
						>
							<span class="select-none">Основная информация</span>
						</div>
						<div>
							<div class="px-6 py-4 flex flex-col space-y-4">
								<div class="flex items-center">
									<label class="flex-shrink-0 w-1/3 text-gray-500 font-medium required"
										>Адрес</label
									>
									<input
										v-model="adress"
										placeholder="ул.Ленина, д. 1, кв.112"
										type="text"
										class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
									/>
								</div>
								<div class="flex items-center">
									<label class="flex-shrink-0 w-1/3 text-gray-500 font-medium required"
										>Стоимость</label
									>
									<currency-input
										v-model="price"
										currency="RUB"
										:precision="0"
										:distraction-free="false"
										class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
									/>
								</div>
								<div class="flex items-center">
									<label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Этаж</label>
									<input
										v-model="floor"
										type="numbeer"
										class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
										placeholder="0"
									/>
								</div>
								<div class="flex items-center">
									<label class="flex-shrink-0 w-1/3 text-gray-500 font-medium"
										>Кол-во этажей в доме</label
									>
									<input
										v-model="numStoreys"
										type="numbeer"
										class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
										placeholder="0"
									/>
								</div>
								<div class="flex items-center">
									<label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Тип</label>
									<div
										class="flex text-gray-800 items-center py-1 px-3 border-2 rounded relative cursor-pointer flex-grow select-none justify-between"
										@click="typeList = !typeList"
									>
										<span>{{ type }}</span>
										<svg
											class="w-3 text-gray-500 ml-2 transition"
											:class="[
												{
													'transform rotate-180': typeList,
												},
											]"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
										<div
											v-if="typeList"
											class="absolute top-full inset-x-0 bg-white border shadow z-50"
										>
											<div class="flex flex-col w-full">
												<div
													class="border-b px-2 py-2 hover:bg-gray-100 flex justify-between items-center"
													@click="type = $event.target.innerText"
												>
													Квартира
												</div>
												<div
													class="border-b px-2 py-2 hover:bg-gray-100 flex justify-between items-center"
													@click="type = $event.target.innerText"
												>
													Дом
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="flex items-center">
									<label class="flex-shrink-0 w-1/3 text-gray-500 font-medium"
										>Ссылка на Авито</label
									>
									<input
										v-model="avito"
										type="text"
										class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
										placeholder="http://"
									/>
								</div>
								<!-- typeList -->
								<!-- <div
									class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"
								>
									<p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
										<span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
									</p>
									<input id="hidden-input" type="file" multiple class="hidden" />
									<button
										id="button"
										class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
									>
										Upload a file
									</button>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- main -->
		</div>
	</div>
</template>

<script>
import MaskedInput from 'vue-masked-input';
import { CurrencyInput } from 'vue-currency-input';
export default {
	props: ['changeItem'],
	data: () => ({
		formVerify: false,
		adress: '',
		floor: null,
		numStoreys: null,
		price: 0,
		typeList: false,
		type: 'Квартира',
		avito: '',
	}),

	watch: {
		adress() {
			if (this.adress !== '' && this.price !== 0 && this.price) this.formVerify = true;
			else this.formVerify = false;
		},

		price() {
			if (this.adress !== '' && this.price !== 0 && this.price) this.formVerify = true;
			else this.formVerify = false;
		},
	},

	mounted() {
		this.checkChangeItem();
	},

	methods: {
		async addNewObject() {
			if (!this.formVerify) return;
			try {
				const formData = {
					adress: this.adress,
					price: this.price,
					floor: this.floor,
					numStoreys: this.numStoreys,
					type: this.type,
					avito: this.avito,
				};

				await this.$store.dispatch('addNewObject', formData);

				this.$toasts.push({
					type: 'success',
					message: 'Объект успешно добавлен',
				});
				this.$emit('addNewObject');
				this.clearInputs();
			} catch (e) {
				this.$toasts.push({
					type: 'error',
					message: 'Что-то пошло не так',
				});
				throw e;
			}
		},

		checkChangeItem() {
			if (this.changeItem) {
				this.adress = this.changeItem.adress;
				this.price = this.changeItem.price;
				this.floor = this.changeItem.floor;
				this.numStoreys = this.changeItem.numStoreys;
				this.type = this.changeItem.type;
				this.avito = this.changeItem.avito;
			}
		},

		async saveChangeItem() {
			try {
				if (!this.formVerify) return;
			} catch (e) {
				this.$toasts.push({
					type: 'error',
					message: 'Что-то пошло не так',
				});
				throw e;
			}
		},

		clearInputs() {
			this.adress = '';
			this.price = 0;
			this.floor = '';
			this.numStoreys = '';
			this.avito = '';
			this.type = 'Квартира';
		},
	},

	components: {
		CurrencyInput,
		MaskedInput,
	},
};
</script>

<style>
.required:after {
	content: ' *';
	color: red;
}

.v-collapse-content {
	max-height: 0;
	transition: max-height 0.3s ease-out;
	overflow: hidden;
	padding: 0;
}

.v-collapse-content-end {
	transition: max-height 0.3s ease-in;
	height: 100vh;
	max-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
	transition: transform 0.3s ease;
}
.fade-enter,
.fade-leave-to {
	transform: translateX(100%);
}

.opacity-enter-active,
.opacity-leave-active {
	transition: 0.3s ease;
}
.opacity-enter,
.opacity-leave-to {
	opacity: 0;
}
</style>
