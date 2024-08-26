<template>
	<form class="add-section" action="#">
		<InputCmp
			:model-value="formModel.name"
			class="add-section__input"
			label="Название раздела"
			:max_length="20"
			@set_value="changeForm({ name: $event })"
		></InputCmp>
		<TextareaCmp
			:model-value="formModel.description"
			class="add-section__text-area"
			:max_length="40"
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
				:disabled="!modalData.modalProps.isFieldChanged"
				text="Сохранить"
				@click.prevent="patchForm"
			/>
			<BtnCmp
				v-else
				type="submit"
				text="Добавить"
				:disabled="!modalData.modalProps.isFieldChanged"
				@click.prevent="sendForm"
			/>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import { useHeadersStore } from "~/src/stores/storeSections";
import type { IFormSection } from "~/src/ts-interface/storeModal.type";
import { isFormValid } from "~/src/utils/validateForm";

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

const startForm = JSON.parse(JSON.stringify(formModel));

watch(formModel, () => {
	const isValid = isFormValid(formModel, startForm, ["name", "description"]);

	storeModal.$patch({
		modalProps: {
			isFieldChanged: isValid,
		},
	});
});

const sendForm = () => {
	headersStore
		.postHeading(formModel)
		.then(() => {
			storeModal.closeModal();
		})
		.catch((err) => {
			console.error("EBANAYA OSHIBKA ", err);
		});
};

const patchForm = () => {
	const { name, description } = formModel;

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
			console.log("ДА ЕБАТЬ ЕГО В РОТ НАХУЙ", err);
		});
};
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
