<template>
	<TheHeader :listMenu="menus" />
	<TheContentVue><router-view></router-view></TheContentVue>
</template>

<script setup>
import TheContentVue from './content/TheContent.vue';
import TheHeader from './header/TheHeader.vue';
import { ref } from 'vue';
const menus = ref();
menus.value = [
	{
		text: 'Tài khoản',
		link: '/accountsPage',
	},
];
</script>
