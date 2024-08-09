<template>
    <div class="delete-modal">
        <slot :class="'delete-modal__text'" name="text"/>
    </div>
    <div class="delete-modal__btn-wrapper">
        <BtnCmp
            :text="'Отмена'"
            :background_type="'_secondary'"
            @click="closeModal"
        />
        <BtnCmp
            :text="'Удалить'"
            background_type="_quaternary"
        />
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { useStoreModal } from '~/src/stores/storeModal';


const modalStore = useStoreModal();

const {closeModal} = defineProps({
    closeModal: {
        type: Function as PropType<typeof modalStore.triggerModal>,
        default: ()=>{}
    }
})

</script>

<style lang="sass">
.delete-modal
    max-width: rem(400)
    &__text
        display: block
        margin-bottom: rem(16)
        &:last-child
            margin-bottom: rem(32)
    &__btn-wrapper
        display: flex
        column-gap: rem(16)
            
</style>