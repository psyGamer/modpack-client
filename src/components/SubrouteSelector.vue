<template>
	<div class="content-selector">
		<ul ref="listRef" :style="cssVars">
			<li v-for="route in routes" :key="route">
				<router-link :id="route.routeName" :to="{ name: route.routeName }" exact>
					{{ route.displayName }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

type Route = { routeName: string; displayName: string }

export default defineComponent({
	name: 'SubrouteSelector',
	props: {
		routes: { type: Array as PropType<Route[]>, required: true },
	},
	setup: props => {
		// We need to do this since the key will change
		const listRef = ref<HTMLUListElement | undefined>(undefined)
		const activeRouteRef = ref<HTMLAnchorElement | null | undefined>(null)

		const cssVars = reactive({
			'--selected-width': `${activeRouteRef.value?.offsetWidth}px`,
			'--selected-left': `${activeRouteRef.value?.offsetWidth}px`,
			'--transition-elements': 'all',
		})

		const updateCssVars = () => {
			if (!activeRouteRef.value) return
			cssVars['--selected-width'] = `${activeRouteRef.value.offsetWidth}px`
			cssVars['--selected-left'] = `${activeRouteRef.value.offsetLeft}px`
		}

		onBeforeRouteUpdate(to => {
			activeRouteRef.value = listRef.value?.querySelector(`a#${to.name?.toString()}`)
			updateCssVars()
		})
		onMounted(() => {
			activeRouteRef.value = listRef.value?.querySelector('a.router-link-exact-active')
			updateCssVars()
		})

		return { listRef, activeRouteRef, cssVars }
	},
})
</script>

<style lang="scss" scoped>
.content-selector {
	font-size: 1.7rem;
	display: flex;

	justify-content: center;
	align-items: center;

	width: fit-content;
	height: 3em;

	background: $color-bg3;
	margin: 0.5em auto;

	border-radius: 0 0 1.25em 1.25em;

	ul {
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		li {
			height: 100%;
			list-style: none;
		}
		li a {
			display: flex;
			align-items: center;

			padding-inline: 1em;

			height: 100%;
			color: $color-text;

			text-decoration: none;

			transition: all ease 0.2s;

			&:hover,
			&:focus-visible {
				color: $color-text-hover;
				transform: translateY(-0.1em);
			}
			&.router-link-active {
				color: $color-text;
				transform: translateY(-0.25em) scale(1.1);
			}
			&:active {
				color: $color-primary-active-plain;
			}
		}

		&::after {
			content: '';
			position: absolute;

			left: calc(var(--selected-left) + 1.5em);
			bottom: 0.55em;

			width: calc(var(--selected-width) - 3em);
			height: 0.25em;

			background: $color-primary-plain;
			border-radius: 100vw;
			transition: var(--transition-elements) 0.2s ease;
		}
	}
}
</style>
