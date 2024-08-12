<template>
	<div>
		<span v-if="modalData.labelsCount" class="delete-modal__text">
			В выбранном разделе меток есть метки, которые удалятся
			автоматически, при удалении раздела.
		</span>
		<span class="delete-modal__text"
			>Вы уверены, что хотите удалить раздел {{ modalData.name }}?</span
		>
	</div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";

const modalStore = useStoreModal();

const modalData = modalStore.$state.modalProps as {
	labelsCount: number;
	name: string;
};
</script>

<style lang="sass"></style>
