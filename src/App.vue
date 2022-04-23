<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link :to="{ name: 'mods' }">Mods</router-link>
	</nav>
	<router-view />
</template>

<style>
nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
