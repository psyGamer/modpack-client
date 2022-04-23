<template>
	<input
		@input="$emit('update:modelValue', $event.target.value)"
		:value="modelValue"
		:placeholder="placeholder"
	/>
</template>

<script lang="ts">
export default {
	name: 'InputField',
	props: ['modelValue', 'placeholder'],
	emits: ['update:modelValue'],
}
</script>

<style lang="scss" scoped>
input {
	padding: 0.6em;
	margin-right: 1em;

	outline: none;
	border: 0.2em solid $color-button-bg;
	border-radius: 2em;

	color: $color-button-text;
	background-color: $color-button-bg;

	&:hover {
		color: $color-button-text-hover;
		background-color: $color-button-bg-hover;
		border: 0.2em solid $color-divider;
	}
	&:active,
	&:focus {
		color: $color-button-text-active;
		background-color: $color-button-bg-active;
		border: 0.2em solid $color-primary;
	}
}
</style>
