<template>
	<div class="oil-direction">
		<span class="oil-direction__desc"
			>Направление и описание должны быть переведены на обязательные языки
			(помечены звёздочкой)</span
		>
		<LangSwitcherCmp
			class="oil-direction__tabs"
			:active="lang"
			@change-lang="setLang"
		/>
		<InputCmp
			class="oil-direction__input"
			:label="`Название направления (${lang.toLocaleUpperCase()})*`"
			:modelValue="localizationForm.name.value[lang]"
			:error="localizationForm.name.error"
			@set_value="setFormValue($event)"
			:type="localizationForm.name.type"
		/>
		<TextareaCmp
			class="oil-direction__text-area"
			:label="`Описание направления (${lang.toLocaleUpperCase()})*`"
			:modelValue="localizationForm.description.value[lang]"
			:max_length="550"
			:type="localizationForm.description.type"
			@set_textarea="setFormValue($event)"
		></TextareaCmp>
		<CheckboxCmp
			class="oil-direction__checkbox"
			:text="'Отображать на сайте'"
			:active="localizationForm.visibleCheckbox.value"
			:error="localizationForm.visibleCheckbox.error"
			:type="localizationForm.visibleCheckbox.type"
			@set_value="setCheckbox"
		/>
		<div class="oil-direction__btns">
			<BtnCmp
				:text="'Отмена'"
				:background_type="'_secondary'"
				@click="closeModal"
			/>
			<BtnCmp
				v-if="!modal_data.modalProps.edit"
				:text="'Добавить'"
				@click="sendDirection"
			/>
			<BtnCmp
				v-if="modal_data.modalProps.edit"
				:text="'Сохранить'"
				@click="patchDirection"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";
import { useDirectionStore } from "~/src/stores/storeDirection";
import { useStoreCourses } from "~/src/stores/storeCourse";
import type { ILocalizations } from "~/src/ts-interface/direction";

export default defineComponent({
	components: {},

	setup() {
		const lang = ref<"ru" | "en" | "fr">("ru");

		const store_modal = useStoreModal();

		const modal_data = store_modal.$state;

		const visible_direction = ref(
			modal_data.modalProps?.localizations?.isVisible || false
		);

		const store_direction = useDirectionStore();
		const course_store = useStoreCourses();

		const initialLocalizations: ILocalizations = {
			id: 0,
			isVisible: false,
			localizations: { ru: "", en: "", fr: "" },
			description: { ru: "", en: "", fr: "" },
		};

		const dataLocalizations: ILocalizations = reactive(
			modal_data.modalProps?.localizations || initialLocalizations
		);

		const localizationForm = reactive({
			name: {
				error: "",
				value: {
					ru: dataLocalizations.localizations.ru,
					en: dataLocalizations.localizations.en,
					fr: dataLocalizations.localizations.fr,
				},
				type: "name",
				pattern: "",
			},
			description: {
				error: "",
				value: {
					ru: dataLocalizations.description.ru,
					en: dataLocalizations.description.en,
					fr: dataLocalizations.description.fr,
				},
				type: "description",
				pattern: "",
			},
			visibleCheckbox: {
				error: "",
				value: false,
				type: "checkbox",
				pattern: "",
			},
		});

		const closeModal = () => {
			store_modal.closeModal();
		};

		const setLang = (active_lang: "ru" | "en" | "fr") => {
			lang.value = active_lang;
		};

		const setCheckbox = (val: boolean) => {
			localizationForm.visibleCheckbox.value = val.active;
		};

		const setFormValue = ({
			value,
			type,
		}: {
			value: string;
			type: "description" | "name";
		}) => {
			localizationForm[type].value[lang.value] = value;
		};

		const errors = reactive({
			name: "",
		});

		const sendDirection = () => {
			const sendData = {
				isVisible: visible_direction.value,
				localizations: dataLocalizations.localizations,
				descriptions: dataLocalizations.description,
			};
			console.log(
				sendData,
				"отправляемые данные при создании направления"
			);

			store_direction.createDirection(sendData);
			store_modal.closeModal();
		};

		const patchDirection = () => {
			const sendData = {
				isVisible: visible_direction.value,
				localizations: dataLocalizations.localizations,
				descriptions: dataLocalizations.description,
			};
			console.log(
				sendData,
				"отправляемые данные при редактировании направления"
			);

			store_direction.changeDirection(
				modal_data.modalProps?.localizations.id,
				sendData
			);
			store_modal.closeModal();
		};

		return {
			lang,
			visible_direction,
			modal_data,
			dataLocalizations,
			errors,
			setLang,
			setCheckbox,
			setFormValue,
			sendDirection,
			patchDirection,
			closeModal,
			localizationForm,
		};
	},
});
</script>
<style lang="sass">
.oil-direction
    &__desc
        display: inline-flex
        margin-bottom: rem(24)

    &__tabs
        margin-bottom: rem(16)

    &__input
        margin-bottom: rem(24)

    &__text-area
        margin-bottom: rem(24)

    &__checkbox
        margin-bottom: rem(32)

    &__btns
        @include flex_start()
        gap: rem(16)
</style>
