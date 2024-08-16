<template>
    <div class="oil" v-if="!preloader.value">
        <Sidebar />
        <NuxtPage />
        <ModalCmp />
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
        const storeModal = useStoreModal()
        const { cookies } = useCookies()

        const preloader = reactive({
            value: true
        })

        onMounted(() => {
            const course_auth_token = cookies.get('course_auth_token')
            if (cookies.get('course_auth') === 'true') {
                axios.defaults.headers.common['Authorization'] = `Bearer ${course_auth_token}`
                storeAuth.logIn()
                storeModal.closeModal()
                preloader.value = false
                console.log(course_auth_token);

            } else {
                storeModal.openModal()
            }
        })

    // Iak 68
        // const host = 'http://192.168.19.204:8081/' as string
        const host = 'http://195.133.145.105:8082/' as string

        axios.defaults.baseURL = host

        return {
            storeAuth,
            storeModal,
            host,
            preloader
        }
    }
})
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
@import "@/src/assets/style/vendor/normalize.sass"
</style>
