<template>
    <div class="oil">
        <Sidebar />
        <NuxtPage />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStoreAuth } from './src/stores/storeAuth'
import axios from 'axios';

export default defineComponent({
    setup() {
        const storeAuth = useStoreAuth()

        onMounted(() => {
            const token = localStorage.getItem('test_auth_token')
            if (token === 'fake_token') {
                storeAuth.logIn()
                console.log('pinia, snova sasat! ya zaloginen')
            }
        })


        const host = 'http://195.133.145.105:8082/' as string

        axios.defaults.baseURL = host
        
        return {}
    },
})
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
@import "@/src/assets/style/vendor/normalize.sass"
</style>
