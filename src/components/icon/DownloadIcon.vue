<template>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 166 166">
		<path d="M8 120.5V143c0 8.284 6.716 15 15 15h120c8.284 0 15-6.716 15-15v-22.5M43 68l40 40m0 0V8m0 100 40-40"/>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
	name: 'DownloadIcon',
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
