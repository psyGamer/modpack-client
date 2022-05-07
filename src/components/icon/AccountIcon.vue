<template>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 166 166">
		<path
			d="M8 158v-40c0-10 20-30 75-30s75 20 75 30v40M83 68c30-1.5 30-30 30-30C111 8 83 8 83 8c-30 2-30 30-30 30 2 30 30 30 30 30Z"
		/>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
	name: 'AccountIcon',
})
</script>

<style lang="scss" scoped>
svg {
	stroke: white;
	stroke-width: 15;
	stroke-linecap: round;
	stroke-linejoin: round;
}
</style>
