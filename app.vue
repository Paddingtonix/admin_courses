<template>
    <div class="oil">
        <Sidebar />
        <NuxtPage />
        <ModalCmp v-if="modalStore.$state.isOpen" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStoreAuth } from './src/stores/storeAuth'
import { useStoreModal } from './src/stores/storeModal'
import axios from 'axios'
import { useCookies } from "vue3-cookies"

export default defineComponent({
    setup() {
        const storeAuth = useStoreAuth()
        const modalStore = useStoreModal()
        const { cookies } = useCookies()

        const openDeleteModal = () => {
                modalStore.$patch({
                    label: '',
                    activeModal: "auth-modal",
                });
                modalStore.openModal();
            };

        onMounted(() => {
            const course_auth_token = cookies.get('course_auth_token')
            if (cookies.get('course_auth') === 'true') {
                axios.defaults.headers.common['Authorization'] = `Bearer ${course_auth_token}`
                storeAuth.logIn()
                modalStore.closeModal()
            } else {
                openDeleteModal();
                modalStore.openModal()
            }
            
        })

        

    // Iak 68
        // const host = 'http://192.168.19.204:8081/' as string

    // Bob Safronoff
        const host = 'http://195.133.145.105:8082/' as string

        axios.defaults.baseURL = host

        return {
            storeAuth,
            modalStore,
            host
        }
    }
})
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
@import "@/src/assets/style/vendor/normalize.sass"
</style>
