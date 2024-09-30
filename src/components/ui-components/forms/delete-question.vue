<template>
	<p>
		При удалении вопроса все содержимое вопроса удалится автоматически и
		будет недоступно к восстановлению.
	</p>
	<p>Вы уверены, что хотите удалить вопрос “{{ questionName }}”?</p>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";

const storeModal = useStoreModal() as unknown as {
	modalProps: {
		question_name: string;
	};
};

const questionName = storeModal.modalProps.question_name;
</script>

<style></style>
