<template>
    <div class="admin-error-modal">
        <div class="admin-error-modal__desc">
            <span class="admin-error-modal__desc__text">Вы не можете отправить курс на модерацию.</span>
            <span class="admin-error-modal__desc__text">Обнаружены ошибки:</span>
        </div>
        <ul class="admin-error-modal__list">
            <li v-for="error in data.errors" :key="error">{{ error.text }}</li>
        </ul>
        <btn-cmp 
            :btn_text="'Понятно'"
            @click="closeModal"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
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

        const closeModal = () => {
            store.commit('modalModule/closeModal')
        }

        return {
            closeModal
        }
    },
    components: {
        'btn-cmp': btnCmp
    }
})
</script>