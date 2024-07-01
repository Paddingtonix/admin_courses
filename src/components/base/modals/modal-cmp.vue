<template>
    <div class="oil-modal">
        <!-- <button class="oil-modal__btntestopen" @click="$emit('open')">Open Modal</button>
        <button class="oil-modal__btntestclose" @click="$emit('close')">Close Modal</button>
        <div class="oil-modal__test"  v-if="isOpen">ya test</div> -->
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
            const remember_me = reactive({
                active: false
            })
            
            const modalComponent = authModal

            return {
                remember_me,
                modalComponent
            }
        },
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
    // &__btntestopen
    //     width: 100px
    //     height: 100px
    //     background-color: green
    //     border: 2px solid blue
    //     cursor: pointer

    // &__btntestclose
    //     width: 100px
    //     height: 100px
    //     background-color: yellow
    //     border: 2px solid black
    //     cursor: pointer

    // &__test
    //     width: 500px
    //     height: 300px
    //     background-color: blue
    //     border: 2px solid red

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