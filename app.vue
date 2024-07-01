<template>
    <div class="oil">
        <!-- <ModalCmp 
            :isOpen="modalStore.isOpen"
            @open="modalStore.openModal"
            @close="modalStore.closeModal"
        /> -->
        <ModalCmp
        
        />
        <NuxtPage 
            name="app"
        />
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
