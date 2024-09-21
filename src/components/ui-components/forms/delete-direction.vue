<template>
    <div>
        <span class="delete-modal__text">
            Вы действительно хотите удалить направление {{ modal_data.modalProps.data.localizedName }}?
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import type { IDeleteDirection } from "~/src/ts-interface/direction";

const store_modal = useStoreModal();

const modal_data = store_modal.$state as IDeleteDirection;
</script>
