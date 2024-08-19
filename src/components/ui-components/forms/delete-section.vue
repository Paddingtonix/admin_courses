<template>
    <div>
        <span
            v-if="modalData.modalProps.data.labelsCount"
            class="delete-modal__text"
        >
            В выбранном разделе меток есть метки, которые удалятся
            автоматически, при удалении раздела.
        </span>
        <span class="delete-modal__text">
            Вы уверены, что хотите удалить раздел
            {{ modalData.modalProps.data.name }}?
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import type { IDeleteSection } from "~/src/ts-interface/storeModal.type";

const storeModal = useStoreModal();

const modalData = storeModal.$state as IDeleteSection;
</script>

<style lang="sass"></style>
