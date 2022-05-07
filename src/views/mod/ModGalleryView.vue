<template>
	<div class="content-page">
		<div>Gallery</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import { getModInfo, getError } from '@/store/mod-details'

export default defineComponent({
	components: { MarkdownRenderer },
	setup: () => {
		const store = useStore()
		return { mod: getModInfo(store), error: getError(store) }
	},
})
</script>

<style lang="scss" scoped>
div {
	background: red;
}
</style>
