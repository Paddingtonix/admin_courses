<template>
	<div class="oil" v-if="!preloader.value">
		<Sidebar v-if="storeAuth.$state.isAuth"/>
		<NuxtPage />
		<ModalCmp v-if="storeModal.$state.isOpen" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStoreAuth } from "./src/stores/storeAuth";
import { useStoreModal } from "./src/stores/storeModal";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useUserRoleStore } from "~/src/stores/storeRole";

export default defineComponent({
	setup() {
		const storeAuth = useStoreAuth();
		const storeModal = useStoreModal();
		const { cookies } = useCookies();
		const user_role_store = useUserRoleStore();

        const openDeleteModal = () => {
                storeModal.$patch({
                    label: '',
                    activeModal: "auth-modal",
                });
                storeModal.openModal();
            };

        const preloader = reactive({
            value: false
        })

        onMounted(() => {
            preloader.value = true
            const course_auth_token = cookies.get('course_auth_token')
            if (cookies.get('course_auth') === 'true') {
                axios.defaults.headers.common['Authorization'] = `Bearer ${course_auth_token}`
                user_role_store.getUserRole()
                storeAuth.logIn()
                storeModal.closeModal()
                preloader.value = false

            } else {
                openDeleteModal();
                storeModal.openModal()
                preloader.value = false
            }

        })

    // Iak 68
        // const host = 'http://192.168.19.65:8081/' as string

    // Bob
        const host = "http://195.133.145.105:8082/" as string;

		axios.defaults.baseURL = host;

		return {
			storeAuth,
			storeModal,
			user_role_store,
			host,
			preloader,
		};
	},
});
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
@import "@/src/assets/style/vendor/normalize.sass"
</style>
