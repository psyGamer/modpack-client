<template>
	<div class="page">
		<div>Versions</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import { getVersions } from '@/store/mod-details'

export default defineComponent({
	components: { MarkdownRenderer },
	setup: () => {
		const store = useStore()
		return { versions: getVersions(store) }
	},
})
</script>

<style lang="scss" scoped>
div {
	background: red;
}
</style>
