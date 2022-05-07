import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModsView from '../views/ModsView.vue'

import DetailedModView from '../views/DetailedModView.vue'
import ModDescriptionView from '../views/mod/ModDescriptionView.vue'
import ModVersionsView from '../views/mod/ModVersionsView.vue'
import ModChangelogView from '../views/mod/ModVersionsView.vue'
import ModGalleryView from '../views/mod/ModVersionsView.vue'

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
				path: 'description',
				name: 'mod-description',
				component: ModDescriptionView,
			},
			{
				path: 'versions',
				name: 'mod-versions',
				component: ModVersionsView,
			},
			{
				path: 'changelog',
				name: 'mod-changelog',
				component: ModChangelogView,
			},
			{
				path: 'gallery',
				name: 'mod-gallery',
				component: ModGalleryView,
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
