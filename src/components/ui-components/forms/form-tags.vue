<template>
    <form class="add-tag" action="#">
        <SelectorCmp
            v-if="!headers"
            :objectList="headers"
            class="add-tag__selector"
            label="Раздел"
        ></SelectorCmp>
        <span class="add-tag__no-selector" v-else>
            Вы должны создать раздел, прежде, чем создать метку
        </span>
        <InputCmp
            @set_value="setFormValue(tagFormEnum._name, $event)"
            :modelValue="tagForm.name"
            class="add-tag__input"
            label="Название метки"
        ></InputCmp>
        <LangSwitcherCmp
            :active="activeLang"
            class="add-tag__lang-switcher"
            @change-lang="changeLang($event)"
        />
        <TextareaCmp
            class="add-tag__text-area"
            label="Перевод метки"
            :modelValue="tagForm.localizations[activeLang]"
            @set_textarea="
                setFormValue(tagFormEnum._localizations, $event, activeLang)
            "
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
import type { ITags } from "~/src/ts-interface/storeTags.type";

const storeModal = useStoreModal();

const modalData = storeModal.$state as IFormTags;

const closeModal = storeModal.triggerModal;

const headers = modalData.modalProps?.headers ?? [];

const activeLang = ref("RU");

const initialTagForm: ITags = {
    headingId: null,
    headingName: "",
    name: "",
    localizations: {},
};

const tagForm: ITags = reactive(
    modalData.modalProps?.tagForm || initialTagForm
);

enum tagFormEnum {
    _name = "name",
    _localizations = "localizations",
}

const setFormValue = (
    _fieldName: keyof Omit<ITags, "headingId" | "headingName">,
    inputValue: string,
    localization?: string
) => {
    if (_fieldName === "localizations" && localization) {
        tagForm[_fieldName][localization] = inputValue;
    } else if (_fieldName !== "localizations") {
        tagForm[_fieldName] = inputValue;
    }
};

const changeLang = (newLang: string) => {
    activeLang.value = newLang;
};
</script>

<style lang="sass">
.add-tag
    width: rem(520)

    &__button-wrapper
        display: flex
        column-gap: rem(8)

    &__selector
        margin-bottom: rem(16)
    &__no-selector
        display: block
        margin-bottom: rem(16)
        color: $dark_error

    &__input
        margin-bottom: rem(16)

    &__lang-switcher
        margin-bottom: rem(8)

    &__text-area
        margin-bottom: rem(4)

    &__tooltip
        margin-bottom: rem(32)
</style>
