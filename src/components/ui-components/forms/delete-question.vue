<template>
	<p class="oil-delete-question-text">
		При удалении вопроса все содержимое вопроса удалится автоматически и
		будет недоступно к восстановлению.
	</p>
	<p class="oil-delete-question-text">
		Вы уверены, что хотите удалить вопрос “{{ questionName }}”?
	</p>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";

const storeModal = useStoreModal() as unknown as {
	modalProps: {
		data: {
			questionName: string;
			id: number;
		};
	};
};

const questionName = storeModal.modalProps.data.questionName;
</script>

<style lang="sass">
.oil-delete-question-text
	display: block
	margin-bottom: rem(16)
	&:last-of-type
		margin-bottom: rem(32)
</style>
