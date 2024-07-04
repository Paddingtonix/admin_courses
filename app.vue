<template>
    <div class="oil">
        <NuxtLayout />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStoreAuth } from './src/stores/storeAuth'

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

        return {}
    },
})
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
</style>
