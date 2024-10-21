<template>
	<div class="oil-direction">
		<span class="oil-direction__desc"
			>Направление и описание должны быть переведены на обязательные языки
			(помечены звёздочкой)</span
		>
		<LangSwitcherCmp
			class="oil-direction__tabs"
			:active="lang"
			:errors="switcherErrors"
			@change-lang="setLang"
		/>
		<InputCmp
			class="oil-direction__input"
			:label="`Название направления (${lang.toLocaleUpperCase()})*`"
			:modelValue="localizationForm.name.value[lang]"
			:error="localizationForm.name.error[lang]"
			@set_value="setFormValue($event)"
			:type="localizationForm.name.type"
		/>
		<TextareaCmp
			class="oil-direction__text-area"
			:label="`Описание направления (${lang.toLocaleUpperCase()})*`"
			:modelValue="localizationForm.description.value[lang]"
			:error="localizationForm.description.error[lang]"
			:max_length="550"
			:type="localizationForm.description.type"
			@set_textarea="setFormValue($event)"
		></TextareaCmp>
		<CheckboxCmp
			class="oil-direction__checkbox"
			:text="'Отображать на сайте'"
			:id="'visible'"
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
				:disabled="!isFormValid"
				@click="sendDirection"
			/>
			<BtnCmp
				v-if="modal_data.modalProps.edit"
				:text="'Сохранить'"
				:disabled="!isFormValid"
				@click="patchDirection"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";
import { useDirectionStore } from "~/src/stores/storeDirection";
import type { ILocalizations } from "~/src/ts-interface/direction";
import { AxiosError } from "axios";

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
				error: {
					ru: "",
					en: "",
					fr: "",
				},
				value: {
					ru: dataLocalizations.localizations.ru,
					en: dataLocalizations.localizations.en,
					fr: dataLocalizations.localizations.fr,
				},
				type: "name",
				pattern: "",
			},
			description: {
				error: {
					ru: "",
					en: "",
					fr: "",
				},
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
				value: dataLocalizations.isVisible,
				type: "checkbox",
				pattern: "",
			},
		});

		const switcherErrors = computed(() => {
			const searchForErrors = (parentObject: object) => {
				return Object.keys(parentObject).filter(
					(item) => parentObject[item].length
				);
			};

			return searchForErrors(localizationForm.description.error).concat(
				searchForErrors(localizationForm.name.error)
			);
		});

		const isFormValid = computed(
			() =>
				!switcherErrors.value.length &&
				!localizationForm.visibleCheckbox.error.length
		);

		const closeModal = () => {
			store_modal.closeModal();
		};

		const setLang = (active_lang: "ru" | "en" | "fr") => {
			lang.value = active_lang;
		};

		const validateForm = (
			fieldValue: {
				type: "name" | "description" | "visibleCheckbox";
				value: string;
			},
			language: "ru" | "en" | "fr"
		) => {
			function setError(errorMessage: string) {
				if (fieldValue.type !== "visibleCheckbox") {
					localizationForm[fieldValue.type].error[language] =
						errorMessage;
				} else {
					localizationForm[fieldValue.type].error = errorMessage;
				}
			}

			switch (fieldValue.type) {
				case "name":
					if (!fieldValue.value && !fieldValue.value?.trimStart()) {
						setError("Поле обязательно к заполнению");
					} else if (fieldValue.value.length > 50) {
						setError("Максимальное количество символов - 50");
					} else {
						setError("");
					}
					return;
				case "description":
					if (!fieldValue.value && !fieldValue.value?.trimStart()) {
						setError("Поле обязательно к заполнению");
					} else if (fieldValue.value.length > 170) {
						setError("Максимальное количество символов - 170");
					} else {
						setError("");
					}
					return;
				default:
					break;
			}
		};

		const validateOnSendForm = () => {
			const validateSendingObject = (
				validatingField: {
					[key: string]: string;
				},
				fieldType: "description" | "name"
			) => {
				for (const [fieldName, field] of Object.entries(
					validatingField
				)) {
					validateForm(
						{ type: fieldType, value: field },
						fieldName as "ru" | "en" | "fr"
					);
				}
			};

			validateSendingObject(
				localizationForm.description.value as { [key: string]: string },
				"description"
			);
			validateSendingObject(
				localizationForm.name.value as { [key: string]: string },
				"name"
			);
		};

		const setCheckbox = (val: { id: number; active: boolean }) => {
			localizationForm.visibleCheckbox.value = val.active;
			console.log(localizationForm.visibleCheckbox.value);
		};

		const setFormValue = ({
			value,
			type,
		}: {
			value: string;
			type: "description" | "name";
		}) => {
			localizationForm[type].value[lang.value] = value;
			validateForm({ value, type }, lang.value);
		};

		const sendDirection = () => {
			const sendData = {
				isVisible: localizationForm.visibleCheckbox.value,
				localizations: localizationForm.name.value,
				descriptions: localizationForm.description.value,
			};

			validateOnSendForm();
			if (isFormValid.value) {
				store_direction
					.createDirection(sendData)
					.then(() => {
						store_modal.closeModal();
					})
					.catch((error) => {
						console.warn("eto catch", error.response?.data);
						if (
							error.response?.data.includes(
								"Такие локализации уже существуют"
							)
						) {
							const existingValue = error.response?.data
								.split(":")[1]
								.split(",")[0]
								.trimStart();
							console.log(existingValue);

							for (const [name, value] of Object.entries(
								localizationForm.name.value
							)) {
								if (value === existingValue) {
									console.log("Value === existingValue");

									localizationForm.name.error[name] =
										"Направление с таким названием уже существует";
								}
							}
						}
						if (
							error.response.data
								.trimStart()
								.includes(
									"Такие описания уже существуют для других направлений:"
								)
						) {
							const existingValue = error.response?.data
								.split(":")[1]
								.split(",")[0]
								.trimStart();
							console.log(existingValue);

							for (const [name, value] of Object.entries(
								localizationForm.description.value
							)) {
								if (value === existingValue) {
									console.log("Value === existingValue");

									localizationForm.description.error[name] =
										"Направление с таким описанием уже существует";
								}
							}
						}
					});
			}
		};

		const patchDirection = () => {
			const sendData = {
				isVisible: visible_direction.value,
				localizations: dataLocalizations.localizations,
				descriptions: dataLocalizations.description,
			};

			validateOnSendForm();
			if (isFormValid.value) {
				store_direction
					.changeDirection(
						modal_data.modalProps?.localizations.id,
						sendData
					)
					.then(() => {
						store_modal.closeModal();
					})
					.catch((error) => {
						console.warn("eto catch", error.response?.data);
						if (
							error.response?.data.includes(
								"Такие локализации уже существуют"
							)
						) {
							const existingValue = error.response?.data
								.split(":")[1]
								.split(",")[0]
								.trimStart();
							console.log(existingValue);

							for (const [name, value] of Object.entries(
								localizationForm.name.value
							)) {
								if (value === existingValue) {
									console.log("Value === existingValue");

									localizationForm.name.error[name] =
										"Направление с таким названием уже существует";
								}
							}
						}
						if (
							error.response.data
								.trimStart()
								.includes(
									"Такие описания уже существуют для других направлений:"
								)
						) {
							const existingValue = error.response?.data
								.split(":")[1]
								.split(",")[0]
								.trimStart();
							console.log(existingValue);

							for (const [name, value] of Object.entries(
								localizationForm.description.value
							)) {
								if (value === existingValue) {
									console.log("Value === existingValue");

									localizationForm.description.error[name] =
										"Направление с таким описанием уже существует";
								}
							}
						}
					});
			}
		};

		return {
			lang,
			visible_direction,
			modal_data,
			dataLocalizations,
			setLang,
			setCheckbox,
			setFormValue,
			sendDirection,
			patchDirection,
			closeModal,
			localizationForm,
			switcherErrors,
			isFormValid,
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
