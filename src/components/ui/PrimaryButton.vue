<template>
	<button class="primary-button">
		<slot />
	</button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
	name: 'PrimaryButton'
})
</script>

<style lang="scss">
.primary-button {
	display: flex;
	justify-content: center;
	align-items: center;

	color: $color-text;

	font-weight: bold;
	text-transform: uppercase;

	padding: 0.4em 1.2em;
	border-radius: $border-radius-button;

	border: none;
	outline: none;
	background: $color-primary;

	cursor: pointer;

	img, svg {
		width: 1.25em;
		height: 1.25em;

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
