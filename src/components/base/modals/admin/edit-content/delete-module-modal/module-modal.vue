<template>
    <div class="module-modal">
        <span class="module-modal__text">При удалении этого модуля всё содержимое будет также удалено и недоступно к восстановлению.</span>
        <span class="module-modal__attention">Вы уверены, что хотите удалить этот модуль?</span>
        <div class="module-modal__btns">
            <btn-cmp 
                :btn_type="'secondary'"
                :btn_text="'Отмена'"
            />
            <btn-cmp 
                :btn_type="'delete'"
                :btn_text="'Удалить'"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import btnCmp from "../../../../../ui-components/btn-cmp/btn-cmp"

export default defineComponent({
    setup() {

    },
    components: {
        'btn-cmp': btnCmp
    }
})

</script>