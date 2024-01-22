<template>
    <div class="admin-attention-modal">
        <span class="admin-attention-modal__text" v-for="text in data.desc" :key='text'>{{ text }}</span>
        <btn-cmp 
            :btn_text="'Понятно'"
            @click="closeModal"
        />
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