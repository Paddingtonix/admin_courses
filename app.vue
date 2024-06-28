<template>
    <div class="oil">
        <Header />
        <ModalCmp 
            :isOpen="modalStore.isOpen"
            @toggle="modalStore.toggleModal"/>
        <NuxtPage />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useModalStore } from './src/stores/modalStore'

export default defineComponent({
    setup() {
        const modalStore = useModalStore()

        return {
            modalStore 
        }
    },
})
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"

</style>
