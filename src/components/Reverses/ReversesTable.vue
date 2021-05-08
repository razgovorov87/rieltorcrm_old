<template>
	<div class="bg-white shadow-md rounded my-6">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full">
					<th class="py-3 px-6 text-left w-1/12">Агент</th>
					<th class="py-3 px-6 text-center w-2/12">Дата и время</th>
					<th class="py-3 px-6 text-center w-2/12">Клиент</th>
					<th class="py-3 px-6 text-center w-3/12">Ссылка на объект</th>
					<th class="py-3 px-6 text-center w-2/12">Создал</th>
					<th class="py-3 px-6 text-center w-2/12">Действия</th>
				</tr>
			</thead>
			<tbody
				class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full"
				style="max-height: 84vh"
			>

				<div class="bg-white">
					<tr 
						v-for="(item, idx) in sortedReserve"
						:key="item + idx"
						class="border-b border-gray-200 hover:bg-gray-100 flex items-center"
					>
					
						<td class="w-1/12 py-3 px-6 text-left whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium">{{ takeAgentInfo(item.agent) }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium border-b border-dashed border-gray-400">{{ item.date | date('fullmonthDayAndYear')  }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium border-b bg-gray-100 rounded px-3 py-1 shadow cursor-pointer">{{ takeClientInfo(item.clientId) }}</span>
							</div>
						</td>

						<td class="w-3/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<a :href="item.obj.link" target="_blank" class="font-medium border-b border-dashed border-gray-400">{{ item.obj.link  }}</a>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-left flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium">{{ takeAgentInfo(item.author) }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-left flex justify-center whitespace-nowrap">

							<div class="flex items-center justify-center">
								
								<div v-if="item.agent === uid" class="mr-2 transition transform hover:text-blue-500 hover:scale-110 cursor-pointer">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>

								<div v-else class="mr-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>

								<div v-if="item.agent === uid" class="mr-2 transition transform hover:text-red-500 hover:scale-110 cursor-pointer">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</div>

								<div v-else class="mr-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</div>

							</div>
							
						</td>

					</tr>
				</div>

				

			</tbody>
		</table>

	</div>
</template>

<script>
export default {
	props: ['reverses'],
	data: () => ({
		agents: [],
		clients: [],
		uid: null
	}),

	async mounted() {
		this.agentsInfo();
		this.clientsInfo();
		this.uid = await this.$store.dispatch('getUid');
	},

	methods: {
		async agentsInfo() {
			this.agents = await this.$store.dispatch('fetchAgents')
		},

		async clientsInfo() {
			this.clients = await this.$store.dispatch('fetchClients')
		},

		takeAgentInfo(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].name + ' ' + agent[0].surname;
			}
		},

		takeClientInfo(id) {
			if (this.clients) {
				const client = this.clients.filter((client) => client.id === id);
				if (client[0]) return client[0].phone;
			}
		},
	},

	computed: {
		sortedReserve() {
			if(!this.reverses) return []
			const arr =  Object.keys(this.reverses).map(key => ({...this.reverses[key], id: key}))
			arr.sort( function(a, b) {
				const dateA = new Date(a.date)
				const dateB = new Date(b.date)

				return dateA - dateB
			})

			const date = new Date()

			const today =
				date.getUTCFullYear() + '-'
				+ (date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth()) + '-'
				+ (date.getUTCDay() < 10 ? '0' + date.getUTCDay() : date.getUTCDay())

			const result = arr.filter(item => item.date > today)


			return result
		},

		sortedArchive() {
			if(!this.reverses) return []
			const arr =  Object.keys(this.reverses).map(key => ({...this.reverses[key], id: key}))
			arr.sort( function(a, b) {
				const dateA = new Date(a.date)
				const dateB = new Date(b.date)

				return dateB - dateA
			})

			const date = new Date()

			const today =
				date.getUTCFullYear() + '-'
				+ (date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth()) + '-'
				+ (date.getUTCDay() < 10 ? '0' + date.getUTCDay() : date.getUTCDay())

			const result = arr.filter(item => item.date < today)


			return result
		},
	},

};
</script>
