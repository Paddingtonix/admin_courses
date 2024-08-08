<template>
    <form class="add-section" action="#">
        <InputCmp :model-value="formModel.name" class="add-section__input" label="Название раздела" @set_value="formModel.name = $event"></InputCmp>
        <TextareaCmp :model-value="formModel.description" class="add-section__text-area" @set_textarea="formModel.description = $event" label="Описание раздела"></TextareaCmp>
        <div class="add-section__button-wrapper">
            <BtnCmp type="button" background_type="_secondary" text="Отмена" @click="closeModal"></BtnCmp>
            <BtnCmp type="submit" text="Добавить" @click.prevent="sendForm"></BtnCmp>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { useHeadersStore } from '~/src/stores/storeSections';



const { closeModal } = defineProps({
    closeModal:{
        type: Function as PropType<() => void>,
        default: ()=>{},
    }
})

const formModel = reactive({
    name: '',
    description: ''
});

const headersStore = useHeadersStore();

const sendForm = () => {
    headersStore.postHeading(formModel)
    .then(()=>{
        closeModal();
    })
    .catch((err)=>{
        console.error('EBANAYA OSHIBKA ', err);
    })
    
}

</script>

<style lang="sass" scoped>
.add-section
    width: rem(520)

    &__button-wrapper
        display: flex
        column-gap: rem(8)
    
    &__input
        margin-bottom: rem(16)

    &__text-area
        margin-bottom: rem(32)

</style>