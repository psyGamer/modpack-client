<template>
	<div class="content-selector">
		<ul ref="listRef" :style="cssVars">
			<li v-for="route in routes" :key="route">
				<router-link
					:id="route.route"
					:to="{ name: routeName, params: createRouteParam(route.route) }"
				>
					{{ route.name }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

type Route = { route: string; name: string }

export default defineComponent({
	name: 'SubrouteSelector',
	props: {
		routes: { type: Array as PropType<Route[]>, required: true },
		routeName: { type: String, required: true },
		routeParamName: { type: String, required: true },
	},
	setup: props => {
		// We need to do this since the key will change
		const createRouteParam = (dst: string) => {
			const routeParam: any = {}
			routeParam[props.routeParamName as string] = dst
			return routeParam
		}

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
			activeRouteRef.value = listRef.value?.querySelector(
				`a#${to.params[props.routeParamName]}`
			)
			updateCssVars()
		})
		onMounted(() => {
			activeRouteRef.value = listRef.value?.querySelector('a.router-link-exact-active')
			updateCssVars()
		})

		return { listRef, activeRouteRef, createRouteParam, cssVars }
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

	border-radius: 1.25em;

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
			&.router-link-exact-active {
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

			background: $color-primary;
			border-radius: 100vw;
			transition: var(--transition-elements) 0.2s ease;
		}
	}
}
</style>
