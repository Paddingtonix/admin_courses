<template>
    <div>
        <span class="delete-modal__text">
            При удалении метки её перевод перестанет отображаться на сайте.
        </span>
        <span class="delete-modal__text">
            Вы уверены, что хотите удалить метку
            {{ modalData.modalProps.data.name }}?
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import type { IDeleteTag } from "~/src/ts-interface/storeModal.type";

const storeModal = useStoreModal();

const modalData = storeModal.$state as IDeleteTag;
</script>
