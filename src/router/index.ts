import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModsView from '../views/ModsView.vue'
import DetailedModView from '../views/DetailedModView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/mods',
		name: 'mods',
		component: ModsView,
	},
	{
		path: '/mod/:id',
		name: 'mod',
		component: DetailedModView,
		redirect: to => ({ name: 'mod-content', params: { ...to.params, content: 'description' } }),
		children: [
			{
				path: ':content(description|versions|changelog|gallery)',
				name: 'mod-content',
				component: DetailedModView,
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
