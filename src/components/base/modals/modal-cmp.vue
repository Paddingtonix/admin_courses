<!-- <template>
    <div class="oil-modal" v-if="storeModal.isOpen">
        <div class="oil-modal__container-auth" v-if="modalComponent === 'auth-modal'">
            <component :main_class="'oil-modal'" :is="modalComponent"></component>
        </div>
        <div class="oil-modal__container__content" v-if="modalComponent === 'formTags'">
                <component :main_class="'oil-modal'" :is="formTags"></component>
        </div>
        <div class="oil-modal__container" v-else>
            <div class="oil-modal__container__header">
                <span class="oil-modal__container__header__title">{{ title }}</span>
                <button class="oil-modal__container__header__btn-close" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="oil-modal__container__content">
                <component :main_class="'oil-modal'" :is="modalComponent" :closeModal="closeModal"></component>
            </div>
        </div>
    </div>
</template> -->

<template>
    <div class="oil-modal" v-if="storeModal.isOpen">
        <div class="oil-modal__container">
            <div class="oil-modal__container__header">
                <span class="oil-modal__container__header__title">{{ title }}</span>
                <button class="oil-modal__container__header__btn-close" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="oil-modal__container__content" v-if="modalComponent === 'form-sections'">
                <!-- <component :main_class="'oil-modal'" :is="modalComponent" :closeModal="closeModal"></component> -->
                 <slot class="oil-modal" :closeModal="closeModal" name="content"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStoreModal } from '@/src/stores/storeModal'
import authModal from './auth-modal.vue'
import courseCreateModal from './course-create-modal.vue'
import formTags from '../../ui-components/forms/form-tags.vue'
import formSections from '../../ui-components/forms/form-sections.vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: 'Modal title!'
        },
        modalClose: {
            type: Function,
            default: undefined
        }
    },

    setup(props, {emit}) {
        const storeModal = useStoreModal();
        const modalComponent = ref<string>('form-sections');
        const closeModal = () => {
            if(!props.modalClose){
                storeModal.triggerModal()
            } else {
                props.modalClose();
            }
        }

        return {
            modalComponent,
            storeModal,
            closeModal,
            formTags,
            formSections
        }
    },
    components: {
        'auth-modal': authModal,
        'course-create-modal': courseCreateModal,
        'form-tags': formTags,
        'form-sections': formSections
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
    &__container-auth
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

    &__container
        width: auto
        height: auto
        box-shadow: rem(0) rem(8) rem(28) rem(-6) rgba(24, 39, 75, 0.12), rem(0) rem(18) rem(88) rem(-4) rgba(24, 39, 75, 0.14)
        border-radius: rem(12)
        background-color: $basic_white
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        overflow: hidden
        &__header
            width: 100%
            height: rem(76)
            padding: rem(24) rem(40)
            background-color: $modal_header
            border: rem(1) solid $modal_border
            border-radius: rem(12) rem(12) 0 0
            @include flex_center_spacing
            &__btn-close
                cursor: pointer
                svg
                    path
                        transition: stroke .1s
                        
                &:hover 
                    svg
                        path
                            stroke: #5B6C7B

            &__title
                font-size: 20px
                font-weight: 700
        
        &__content
            width: auto
            height: auto
            padding: rem(32) rem(40) rem(40) rem(40)

    &__shadow
        position: absolute
        width: 100%
        height: 100vh
        z-index: 0
        opacity: 0.12
</style>
