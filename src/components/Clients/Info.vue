<template>
	<div v-if="info" class="py-4 px-6 flex flex-col">
		<div class="flex justify-between">
			<h3 class="text-xl font-semibold items-center flex-grow">Информация о клиенте</h3>
		</div>

		<div class="flex flex-col space-y-3 mt-4">
			<div class="flex text-sm">
				<div class="w-1/3 font-semibold text-gray-600 flex-shrink-0 leading-3">
					Мобильный телефон
				</div>
				<div class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed">
					{{ info.phone }}
				</div>
			</div>

			<div class="flex text-sm items-center">
				<div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">ФИО</div>
				<div
					class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between items-center pb-1 relative cursor-pointer h-6"
					@click="editName = true"
				>
					<span v-show="!editName">{{ fio }}</span>
					<svg
						v-show="!editName"
						class="w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
					<span v-if="editName" class="absolute">
						<input
							v-model="fio"
							class="focus:outline-none bg-transparent italic"
							type="text"
							@keydown.enter="
								() => {
									editName = false;
									openSave;
								}
							"
						/>
					</span>
				</div>
			</div>

			<div class="flex text-sm items-center">
				<div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">Компания</div>
				<div
					class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between items-center pb-1 relative cursor-pointer h-6"
					@click="editCompany = true"
				>
					<span v-show="!editCompany">{{ company }}</span>
					<svg
						v-show="!editCompany"
						class="w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
					<span v-if="editCompany" class="absolute">
						<input
							v-model="company"
							class="focus:outline-none bg-transparent italic"
							type="text"
							v-click-outside="
								() => {
									editCompany = false;
									openSave;
								}
							"
							@keydown.enter="
								() => {
									editCompany = false;
									openSave;
								}
							"
						/>
					</span>
				</div>
			</div>

			<div class="flex text-sm items-center">
				<div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">Бюджет</div>
				<div
					class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between items-center pb-1 relative cursor-pointer h-6"
					@click="editBudget = true"
				>
					<span v-show="!editBudget">{{ budget | currency }}</span>
					<svg
						v-show="!editBudget"
						class="w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
					<span v-if="editBudget" class="absolute">
						<currency-input
							v-model="budget"
							currency="RUB"
							:precision="0"
							:distraction-free="false"
							class="focus:outline-none bg-transparent italic"
							type="text"
							@keydown.enter="
								() => {
									editBudget = false;
									openSave;
								}
							"
						/>
					</span>
				</div>
			</div>

			<div class="flex text-sm items-center">
				<div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">Город</div>
				<div
					class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between items-center pb-1 relative cursor-pointer h-6"
					@click="editCity = true"
				>
					<span v-show="!editCity">{{ city }}</span>
					<svg
						v-show="!editCity"
						class="w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
					<span v-if="editCity" class="absolute">
						<input
							v-model="city"
							class="focus:outline-none bg-transparent italic"
							type="text"
							v-click-outside="
								() => {
									editCity = false;
									openSave;
								}
							"
							@keydown.enter="
								() => {
									editCity = false;
									openSave;
								}
							"
						/>
					</span>
				</div>
			</div>

			<div class="flex text-sm items-center">
				<div class="w-1/3 font-semibold text-gray-600 flex-shrink-0">Адрес</div>
				<div
					class="w-2/3 italic border-b flex-grow border-gray-800 border-b border-dashed flex justify-between items-center pb-1 relative cursor-pointer h-6"
					@click="editAdress = true"
				>
					<span v-show="!editAdress">{{ adress }}</span>
					<svg
						v-show="!editAdress"
						class="w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
					<span v-if="editAdress" class="absolute">
						<input
							v-model="adress"
							class="focus:outline-none bg-transparent italic"
							type="text"
							v-click-outside="
								() => {
									editAdress = false;
									openSave;
								}
							"
							@keydown.enter="
								() => {
									editAdress = false;
									openSave;
								}
							"
						/>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { CurrencyInput } from 'vue-currency-input';
export default {
	props: ['info'],
	data: () => ({
		fio: '',
		editName: false,
		company: '',
		editCompany: false,
		budget: 0,
		editBudget: false,
		city: '',
		editCity: false,
		adress: '',
		editAdress: false,
	}),

	created() {
		if (Object.keys(this.info).length !== 0) {
			this.fio = this.info.fio;
			this.company = this.info.company;
			this.budget = this.info.budget;
			this.city = this.info.city;
			this.adress = this.info.adress;
		}
	},

	methods: {
		updateInfo({ fio, budget, company, city, adress }) {
			this.fio = fio;
			this.company = company;
			this.budget = budget;
			this.city = city;
			this.adress = adress;
		},
		fioVerify() {
			if (this.fio.length < 3) return false;
			else return true;
		},

		cancel() {
			this.fio = this.info.fio;
			this.company = this.info.company;
			this.budget = this.info.budget;
			this.city = this.info.city;
			this.adress = this.info.adress;
			this.$emit('openSave', false);
		},

		getClientInfo() {
			return {
				fio: this.fio,
				company: this.company,
				budget: this.budget,
				city: this.city,
				adress: this.adress,
			};
		},
	},

	computed: {
		openSave() {
			const fio = this.info.fio;
			if (
				fio !== this.fio ||
				this.info.company !== this.company ||
				this.info.budget !== this.budget ||
				this.info.city !== this.city ||
				this.info.adress !== this.adress
			) {
				this.$emit('openSave', true);
			} else {
				this.$emit('openSave', false);
			}
		},
	},

	components: {
		CurrencyInput,
	},
};
</script>
