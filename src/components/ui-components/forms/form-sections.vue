<template>
    <form class="add-section" action="#">
        <InputCmp v-model="formModel.name" class="add-section__input" label="Название раздела"></InputCmp>
        <TextareaCmp v-model="formModel.description" class="add-section__text-area" label="Описание раздела"></TextareaCmp>
        <div class="add-section__button-wrapper">
            <BtnCmp type="button" background_type="_secondary" text="Отмена" @click="closeModal"></BtnCmp>
            <BtnCmp type="submit" text="Добавить" @click.prevent="sendForm"></BtnCmp>
        </div>
    </form>
</template>

<script lang="ts" setup>
import axios from 'axios';


const { closeModal } = defineProps({
    closeModal:{
        type: Function as PropType<() => void>,
        default: ()=>{},
    }
})

const formModel: {[key: string]: string} = reactive({
    name: '',
    description: ''
});

console.log(formModel)

const sendForm = () => {
    axios.post('admin/v1/heading', formModel)
    .then((res)=> {
        console.log('zbs ', res);
    })
    .catch(error => {
        console.log('nezbs ', error);
    })
    .finally(
        // TODO: ADD_LOADER
    )
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