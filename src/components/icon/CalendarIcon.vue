<template>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 166 186">
		<path d="M158 78v85c0 8.284-6.716 15-15 15H23c-8.284 0-15-6.716-15-15V78m150 0H8m150 0V43c0-8.284-6.716-15-15-15h-25M8 78V43c0-8.284 6.716-15 15-15h25m70 0V8m0 20H48m70 0v20M48 28V8m0 20v20m-6.25 60v5h5v-5h-5Zm38.75 0v5h5v-5h-5Zm38.75 0v5h5v-5h-5Zm-77.5 35v5h5v-5h-5Zm38.75 0v5h5v-5h-5Zm38.75 0v5h5v-5h-5Z"/>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
	name: 'CalendarIcon',
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
