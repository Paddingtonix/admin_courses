<template>
    <form class="add-tag" action="#">
        <SelectorCmp
            :objectList="modalData.modalProps.headers"
            class="add-tag__selector"
            label="Раздел"
        ></SelectorCmp>
        <InputCmp class="add-tag__input" label="Название метки"></InputCmp>
        <LangSwitcherCmp class="add-tag__lang-switcher" />
        <TextareaCmp
            class="add-tag__text-area"
            label="Перевод метки"
        ></TextareaCmp>
        <TooltipCmp
            class="add-tag__tooltip"
            text="Перевод метки - это текст, который будет отображаться на сайте. Метку необходимо перевести на все обязательные языки (помечены звёздочкой)"
        />
        <div class="add-tag__button-wrapper">
            <BtnCmp
                type="button"
                background_type="_secondary"
                text="Отмена"
                @click="closeModal"
            ></BtnCmp>
            <BtnCmp type="submit" text="Добавить"></BtnCmp>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import type { IFormTags } from "~/src/ts-interface/storeModal.type";

const storeModal = useStoreModal();

const modalData = storeModal.modalProps as IFormTags;

const closeModal = storeModal.triggerModal;
</script>

<style lang="sass">
.add-tag
    width: rem(520)

    &__button-wrapper
        display: flex
        column-gap: rem(8)

    &__selector
        margin-bottom: rem(16)

    &__input
        margin-bottom: rem(16)

    &__lang-switcher
        margin-bottom: rem(8)

    &__text-area
        margin-bottom: rem(4)

    &__tooltip
        margin-bottom: rem(32)
</style>
