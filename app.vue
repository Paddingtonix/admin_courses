<template>
	<div class="oil">
		<Sidebar />
		<NuxtPage />
		<ModalCmp v-if="storeModal.$state.isOpen" />
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStoreAuth } from "./src/stores/storeAuth";
import axios from "axios";
import { useStoreModal } from "./src/stores/storeModal";



export default defineComponent({
	setup() {
		const storeAuth = useStoreAuth();
		const storeModal = useStoreModal();
		onMounted(() => {
			const token = localStorage.getItem("test_auth_token");
			if (token === "fake_token") {
				storeAuth.logIn();
				console.log("pinia, snova sasat! ya zaloginen");
			}
		});

		const host = "http://195.133.145.105:8082/" as string;

		const token =
			"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbjFAYWRtaW4uY29tIiwidW5pcXVlX25hbWUiOiJhZG1pbjFAYWRtaW4uY29tIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzIyNTA5MzE0LCJleHAiOjE3NTQwNDUzMTQsImlhdCI6MTcyMjUwOTMxNH0.xsuhpmqlEdjq66i2knqL9Js1XD_Zd0bAKaf_hsJKm2WRG8J1p4syNqOOaNJkCwbNLTpKTpYmGaD4iK4ntzMPog";

		axios.defaults.baseURL = host;
		axios.defaults.headers.Authorization = token;

		return {
			storeModal,
		};
	},
});
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
@import "@/src/assets/style/vendor/normalize.sass"
</style>
