<template>
    <div>
        <span
            class="delete-modal__text"
        >
            Внимание! Если вы удалите курс, всё его содержимое удалится автоматически и не будет доступно к восстановлению.
        </span>
        <span class="delete-modal__text">
            Вы уверены, что хотите удалить курс “{{ modalData.modalProps.data.title }}”?
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
