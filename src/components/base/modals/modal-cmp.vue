<template>
    <div class="oil-modal">
        <div class="oil-modal__container">
            <component :main_class="'oil-modal'" :is="modalComponent"></component>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    import authModal from './auth-modal.vue'

    export default defineComponent({
        props: {
            isOpen: {
                type: Boolean
            }
        },
        setup() {
            
            const modalComponent = authModal

            return {
                modalComponent
            }
        }
    })
</script>
<style scoped lang="sass">
.oil-modal
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 900
    &__container 
        width: auto
        height: auto
        padding: rem(56)
        box-shadow: rem(0) rem(8) rem(28) rem(-6) rgba(24, 39, 75, 0.12), rem(0) rem(18) rem(88) rem(-4) rgba(24, 39, 75, 0.14)
        border-radius: rem(24)
        background-color: $basic_white
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)

    &__shadow
        position: absolute
        width: 100%
        height: 100vh
        z-index: 0
        opacity: 0.12
</style>