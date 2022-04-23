<template>
	<div class="search">
		<input-field v-model="searchContext.query" placeholder="Search..." class="query" />

		<div class="sorting">
			<div class="sort-by">
				<label>Sort by</label>
				<select v-model="searchContext.sortBy" id="sort">
					<option value="relevance">Relevance</option>
					<option value="downloads">Total downloads</option>
					<option value="date_created">Recently created</option>
					<option value="date_updated">Recently updated</option>
				</select>
			</div>

			<div class="results-per-page">
				<label>Results per page</label>
				<select v-model.number="searchContext.resultsPerPage" id="sort">
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import InputField from '@/components/ui/InputField.vue'
import SearchContext from '@/types/SearchContext'

export default {
	name: 'ModSearch',
	props: ['modelValue'],
	components: { InputField },
	setup(props: any) {
		const searchContext = reactive<SearchContext>(props.modelValue)
		return { searchContext }
	},
}
</script>

<style lang="scss" scoped>
.search {
	display: flex;
	justify-content: center;
}

.sorting {
	display: flex;

	label {
		margin-right: 0.3rem;
		margin-left: 0.5rem;
	}
}
</style>
