<template>
	<form class="add-tag" action="#">
		<MarkSelector
			v-if="headers.length"
			:objectList="headers"
			class="add-tag__selector"
			:error="errors.headingName"
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
			:error="errors.name ? errors.name : ''"
			class="add-tag__input"
			:class="{ error: errors.name }"
			label="Название метки"
		></InputCmp>
		<LangSwitcherCmp
			:active="activeLang"
			class="add-tag__lang-switcher"
			:errors="Object.keys(errors)"
			@change-lang="changeLang($event)"
		/>
		<TextareaCmp
			class="add-tag__text-area"
			label="Перевод метки"
			:class="{ error: errors[activeLang] }"
			:modelValue="tagForm.localizations[activeLang]"
			:error="errors[activeLang] ?? ''"
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
				:disabled="!isFormValid"
				@click.prevent="sendFormTags"
			></BtnCmp>
			<BtnCmp
				v-if="modalData.modalProps.edit"
				type="submit"
				text="Сохранить"
				:disabled="!isFormValid"
				@click.prevent="patchFormTags"
			></BtnCmp>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import { useTagsStore } from "~/src/stores/storeTags";
import type { IFormTags } from "~/src/ts-interface/storeModal.type";
import type { IHeading, ITags } from "~/src/ts-interface/storeTags.type";
import { useFormValidate } from "~/src/utils/useFormValidate";
import { validation_schemas } from "./validation-schemas/modal-schemas.schema";

const { tags_form_schema } = validation_schemas;

const storeModal = useStoreModal();
onErrorCaptured((err) => {
	console.log(err);
});
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
const { validateOnSubmit, isFormValid, setCustomError, errors } =
	useFormValidate(tagForm, tags_form_schema);

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
	validateOnSubmit();
	if (isFormValid.value) {
		tagStore.postTag(tagForm).then(() => {
			storeModal.closeModal();
		});
	}
	//TODO: добавть валидацию на ошибки с сервера
};

const patchFormTags = () => {
	validateOnSubmit();
	if (isFormValid.value) {
		const formData = {
			headingId: tagForm.headingId,
			headingName: tagForm.headingName,
			name: tagForm.name,
			localizations: tagForm.localizations,
		};
		tagStore
			.patchTag(formData, tagForm.id)
			.then(() => {
				storeModal.closeModal();
			})
			.catch((err) => {
				//TODO: добавть валидацию на ошибки с сервера
				console.warn(err);
			});
	}
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
        &.error
            margin-bottom: rem(24)

    &__lang-switcher
        margin-bottom: rem(8)

    &__text-area
        margin-bottom: rem(4)
        &.error
            margin-bottom: rem(16)

    &__tooltip
        margin-bottom: rem(32)
</style>
