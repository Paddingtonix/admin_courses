<template>
    <div class="admin-delete-modal">
        <span class="admin-delete-modal__desc">
            Обратите внимание, если вы удалите курс, всё содержимое курса удалится автоматически и не будет доступно к восстановлению.
        </span>
        <span class="admin-delete-modal__attention">Вы уверены, что хотите удалить курс “{{ data.course_name }}?”</span>
        <div class="admin-delete-modal__btns">
            <btn-cmp 
                :btn_text="'Отмена'"
                @click="closeModal"
            />
            <btn-cmp 
                :btn_text="'Удалить'"
                :btn_type="'delete'"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import btnCmp from '../../../../ui-components/btn-cmp/btn-cmp.vue'

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    setup() {
        const store = useStore()
        
        const deleteRequest = () => {

        }

        const closeModal = () => {
            store.commit('modalModule/closeModal')
        }

        return {
            deleteRequest,
            closeModal
        }
    },
    components: {
        'btn-cmp': btnCmp
    }
})
</script>