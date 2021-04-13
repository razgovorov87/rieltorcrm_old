<template>
	<div class="bg-white shadow-md rounded my-6">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full">
					<th class="py-3 px-6 text-left w-1/4">Клиент</th>
					<th class="py-3 px-6 text-left w-1/4">Агент</th>
					<th class="py-3 px-6 text-center w-2/12">Телефон</th>
					<th class="py-3 px-6 text-center w-2/12">Статус</th>
					<th class="py-3 px-6 text-center w-2/12">Действия</th>
				</tr>
			</thead>
			<tbody
				class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full"
				style="max-height: 84vh"
			>
				<TableGroup
					v-for="category in categories"
					:key="category.id"
					:category="category"
					:items="clients"
					:agents="agents"
					@openClient="
						(client) => {
							$emit('openClient', client);
						}
					"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import TableGroup from '@/components/Admin/TableGroup';
export default {
	props: ['categories', 'clients'],
	data: () => ({
		agents: [],
	}),

	mounted() {
		this.agentsInfo();
	},

	methods: {
		async agentsInfo() {
			this.agents = await this.$store.dispatch('fetchAgents');
		},
	},

	components: { TableGroup },
};
</script>
