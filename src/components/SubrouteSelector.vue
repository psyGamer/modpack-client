<template>
	<div ref="rootRef" :class="`content-selector${sticky ? ' sticky' : ''}`">
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
import { defineComponent, onMounted, onUnmounted, PropType, reactive, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

type Route = { routeName: string; displayName: string }

export default defineComponent({
	name: 'SubrouteSelector',
	props: {
		routes: { type: Array as PropType<Route[]>, required: true },
	},
	setup: props => {
		const rootRef = ref<HTMLDivElement | undefined>(undefined)
		const listRef = ref<HTMLUListElement | undefined>(undefined)
		const activeRouteRef = ref<HTMLAnchorElement | null | undefined>(null)

		const sticky = ref(false)
		const stickyStart = ref(Number.MAX_VALUE)

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

		const handleScroll = () => {
			if (!rootRef.value) return
			sticky.value = rootRef.value && window.scrollY >= stickyStart.value
			console.log(stickyStart.value, window.scrollY, rootRef.value.offsetTop)
		}

		onBeforeRouteUpdate(to => {
			activeRouteRef.value = listRef.value?.querySelector(`a#${to.name?.toString()}`)
			updateCssVars()
		})
		onMounted(() => {
			window.addEventListener('scroll', handleScroll)
			activeRouteRef.value = listRef.value?.querySelector('a.router-link-exact-active')
			updateCssVars()

			if (rootRef.value) stickyStart.value = rootRef.value.offsetTop
		})
		onUnmounted(() => {
			window.removeEventListener('scroll', handleScroll)
		})

		return { rootRef, listRef, activeRouteRef, cssVars, sticky }
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

	background: $color-bg2;
	margin: 0.5em auto;

	// border-radius: 0 0 1.25em 1.25em;
	border-radius: 1.25em;

	transition: border-radius 0.2s ease;

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

.sticky {
	position: fixed;
	top: 0;
	z-index: 1;

	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>
