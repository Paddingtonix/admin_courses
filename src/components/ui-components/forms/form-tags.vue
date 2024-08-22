<template>
	<form class="add-tag" action="#">
		<MarkSelector
			v-if="headers.length"
			:objectList="headers"
			class="add-tag__selector"
			label="Раздел"
			:choosed_variable="{
				name: tagForm.headingName,
				id: tagForm.headingId,
			}"
			@select-object="setHeading($event)"
		></MarkSelector>
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
				@click="closeModal()"
			></BtnCmp>
			<BtnCmp
				v-if="!modalData.modalProps.edit"
				type="submit"
				text="Добавить"
				:disabled="!modalData.modalProps.isFormChanged"
				@click.prevent="sendFormTags()"
			></BtnCmp>
			<BtnCmp
				v-if="modalData.modalProps.edit"
				type="submit"
				text="Сохранить"
				:disabled="!modalData.modalProps.isFormChanged"
				@click.prevent="patchFormTags()"
			></BtnCmp>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import { useTagsStore } from "~/src/stores/storeTags";
import type { IFormTags } from "~/src/ts-interface/storeModal.type";
import type { IHeading, ITags } from "~/src/ts-interface/storeTags.type";
import { isFormValid } from "~/src/utils/validateForm";

const storeModal = useStoreModal();

const tagStore = useTagsStore();

const modalData = storeModal.$state as IFormTags;

const closeModal = storeModal.closeModal;

const headers = modalData.modalProps?.headers ?? [];

const activeLang = ref("ru");

const initialTagForm: ITags = {
	headingId: null,
	headingName: "",
	id: 0,
	isTranslated: null,
	name: "",
	localizations: {
		ru: "",
		en: "",
		test: "",
	},
};

const tagForm: ITags = reactive(
	modalData.modalProps?.tagForm || initialTagForm
);

enum tagFormEnum {
	_name = "name",
	_localizations = "localizations",
}

const startForm = JSON.parse(JSON.stringify(tagForm));

watch(tagForm, () => {
	const isValid = isFormValid(tagForm, startForm, [
		"name",
		"headingName",
		"localizations",
	]);

	storeModal.$patch({
		modalProps: {
			isFormChanged: isValid,
		},
	});
});

const setFormValue = (
	_fieldName: keyof Omit<
		ITags,
		"headingId" | "headingName" | "id" | "isTranslated"
	>,
	inputValue: { value: string; type: string },
	localization?: string
) => {
	if (_fieldName === "localizations" && localization) {
		tagForm[_fieldName][localization] = inputValue.value;
	} else if (_fieldName !== "localizations") {
		tagForm[_fieldName] = inputValue.value;
	}
};

const changeLang = (newLang: string) => {
	activeLang.value = newLang;
};

const setHeading = (data: IHeading) => {
	tagForm.headingId = data.id;
	tagForm.headingName = data.name;
};

const sendFormTags = () => {
	tagStore.postTag(tagForm).then(() => {
		storeModal.closeModal();
	});
};

const patchFormTags = () => {
	const formData = {
		headingId: tagForm.headingId,
		headingName: tagForm.headingName,
		name: tagForm.name,
		localizations: tagForm.localizations,
	};
	tagStore.patchTag(formData, tagForm.id).catch((err) => {
		console.warn(err);
	});
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
