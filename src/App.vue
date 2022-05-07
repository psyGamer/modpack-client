<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link :to="{ name: 'mods' }">Mods</router-link>
	</nav>
	<router-view />
</template>

<style lang="scss">
nav {
	padding: 0;
	height: 0;
	background-color: lightgray;
	position: absolute;
}

nav a {
	font-weight: bold;
	color: #1b7bdb;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
