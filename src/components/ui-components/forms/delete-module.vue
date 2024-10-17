<template>
	<p class="oil-delete-module">
		При удалении этого модуля всё содержимое будет также удалено и
		недоступно к восстановлению.
	</p>
	<p class="oil-delete-module">
		Вы уверены, что хотите удалить "{{ name }}"?
	</p>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";

const storeModal = useStoreModal();

const { name } = storeModal.modalProps as {
	name: string;
};
</script>

<style lang="sass">
.oil-delete-module
    display: block
    line-height: 24px
    color: $basic_text
    &:not(&:last-child)
        margin-bottom: rem(16)
    &:last-child
        margin-bottom: rem(32)
</style>
