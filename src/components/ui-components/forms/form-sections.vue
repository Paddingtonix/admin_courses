<template>
	<form class="add-section" action="#">
		<InputCmp
			:model-value="formModel.name"
			class="add-section__input"
			label="Название раздела"
			@set_value="changeForm({ ...formModel, name: $event })"
		></InputCmp>
		<TextareaCmp
			:model-value="formModel.description"
			class="add-section__text-area"
			@set_textarea="changeForm({ ...formModel, description: $event })"
			label="Описание раздела"
		></TextareaCmp>
		<div class="add-section__button-wrapper">
			<BtnCmp
				type="button"
				background_type="_secondary"
				text="Отмена"
				@click="modalStore.triggerModal"
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

const modalStore = useStoreModal();

const modalData = modalStore.$state as IFormSection;
//Pinia не дает деструктуризировать объект. Просто шикарно. Храни господь React, славься Redux!
const formModel = reactive({
	name: modalData.modalProps.edit ? modalData.modalProps.name : "",
	description: modalData.modalProps.edit
		? modalData.modalProps.description
		: "",
});

const headersStore = useHeadersStore();

const changeForm = ({ name, description }: { [key: string]: string }) => {
	formModel.name = name;
	formModel.description = description;
	modalStore.$patch({
		modalProps: {
			isFieldChanged: true,
		},
	});
};

const sendForm = () => {
	headersStore
		.postHeading(formModel)
		.then(() => {
			modalStore.triggerModal();
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
			modalStore.triggerModal();
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
