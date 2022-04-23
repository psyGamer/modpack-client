<template>
	<button>
		<img v-if="src" :src="require(`@/assets/${src}`)" alt="Download icon" />
		<img v-if="remoteSrc" :src="remoteSrc" alt="Download icon" />
		<slot />
	</button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
	name: 'IconButton',
	props: {
		src: String, // For local files inside @/assets/
		remoteSrc: String, // For files from a remote
		alt: String,
	},
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');

button {
	display: flex;
	justify-content: center;
	align-items: center;

	color: $color-text;

	font-family: 'Inter';
	font-size: 1.1rem;
	font-weight: bold;
	text-transform: uppercase;

	padding: 0.4em 1.6em;
	border-radius: $border-radius-button;

	border: none;
	outline: none;
	background: $color-primary;

	cursor: pointer;

	img {
		width: 1.25rem * 1.3;
		height: 1.25rem * 1.3;

		margin-right: 0.8em;
	}

	&:hover,
	&:focus-visible {
		background: $color-primary-hover;
	}
	&:active {
		background: $color-primary-active;
	}
}
</style>
