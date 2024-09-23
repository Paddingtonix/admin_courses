<template>
	<form class="add-section" action="#">
		<InputCmp
			:model-value="formModel.name"
			class="add-section__input"
			label="Название раздела"
			:error="errors.name ?? ''"
			:max_length="70"
			@set_value="changeForm({ name: $event })"
		></InputCmp>
		<TextareaCmp
			:model-value="formModel.description"
			class="add-section__text-area"
			:error="errors.description ?? ''"
			:max_length="490"
			@set_textarea="changeForm({ description: $event })"
			label="Описание раздела"
		></TextareaCmp>
		<div class="add-section__button-wrapper">
			<BtnCmp
				type="button"
				background_type="_secondary"
				text="Отмена"
				@click="storeModal.closeModal()"
			/>
			<BtnCmp
				v-if="modalData.modalProps.edit"
				type="submit"
				:disabled="!isFormValid"
				text="Сохранить"
				@click.prevent="patchForm"
			/>
			<BtnCmp
				v-else
				type="submit"
				text="Добавить"
				:disabled="!isFormValid"
				@click.prevent="sendForm"
			/>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { AxiosError } from "axios";
import { useStoreModal } from "~/src/stores/storeModal";
import { useHeadersStore } from "~/src/stores/storeSections";
import type { IFormSection } from "~/src/ts-interface/storeModal.type";
import { useFormValidate } from "~/src/utils/useFormValidate";
import { validation_schemas } from "./validation-schemas/modal-schemas.schema";
const { form_sections_schema } = validation_schemas;

const storeModal = useStoreModal();

const modalData = storeModal.$state as IFormSection;

const formModel = reactive({
	name: modalData.modalProps.name ?? "",
	description: modalData.modalProps.description ?? "",
});

const headersStore = useHeadersStore();

type TInputEvent = {
	value: string;
	type: string;
};

const { isFormValid, errors, validateOnSubmit, setCustomError } =
	useFormValidate(formModel, form_sections_schema);

const changeForm = ({
	name,
	description,
}: {
	name?: TInputEvent;
	description?: TInputEvent;
}) => {
	if (name !== undefined) {
		formModel.name = name.value;
	}
	if (description !== undefined) {
		formModel.description = description.value;
	}
};

const sendForm = () => {
	validateOnSubmit();

	if (isFormValid.value) {
		headersStore
			.postHeading(formModel)
			.then(() => {
				storeModal.closeModal();
			})
			.catch((err) => {
				if (err instanceof AxiosError && err.response?.status === 409) {
					setCustomError("name", err.response.data);
				} else {
					console.log(
						err instanceof AxiosError,
						err.response?.status
					);
					console.log(err);

					alert(err.message);
				}
			});
	}
};

const patchForm = () => {
	const { name, description } = formModel;
	validateOnSubmit();

	if (isFormValid.value) {
		headersStore
			.patchHeading({
				name,
				description,
				id: modalData.modalProps.id,
			})
			.then((resp) => {
				console.log("allgoodies", resp);
				storeModal.closeModal();
			})
			.catch((err) => {
				if (err instanceof AxiosError && err.response?.status === 409) {
					setCustomError("name", err.response.data);
				} else {
					alert(err.message);
				}
			});
	}
};
</script>

<style lang="sass" scoped>
.add-section
    width: rem(520)

    &__button-wrapper
        display: flex
        column-gap: rem(8)

    &__input
        margin-bottom: rem(24)

    &__text-area
        margin-bottom: rem(32)
</style>
