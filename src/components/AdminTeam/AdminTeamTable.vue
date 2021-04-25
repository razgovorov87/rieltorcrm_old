<template>
	<div class="bg-white shadow-md rounded my-6">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full">
					<th class="py-3 px-6 text-left w-3/12">ФИО</th>
					<th class="py-3 px-6 text-center w-1/12">Клиентов</th>
					<th class="py-3 px-6 text-center w-2/12">Предлож. объектов</th>
					<th class="py-3 px-6 text-center w-2/12">Телефон</th>
					<th class="py-3 px-6 text-center w-2/12">Дата регистрации</th>
					<th class="py-3 px-6 text-center w-2/12">Действия</th>
				</tr>
			</thead>
			<tbody
				class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full"
				style="max-height: 84vh"
			>
				<TableTeamGroup
					:agents="agents"
					:clients="clients"
					@openClient="
						(client) => {
							$emit('openClient', client);
					}"
					@refreshList="() => {this.agentsInfo()}"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import TableTeamGroup from '@/components/AdminTeam/TableTeamGroup';
export default {
	props: ['clients'],
	data: () => ({
		agents: []
	}),

	mounted() {
		this.agentsInfo();
	},

	methods: {
		async agentsInfo() {
			this.agents = await this.$store.dispatch('fetchAgents')
		},
	},

	components: { TableTeamGroup },
};
</script>
