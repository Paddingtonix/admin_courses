<template>
    <transition name="fade">
            <div class="oilcase-modal" v-if="modalComponent" :key="modalComponent">
                <div @click="closeModal()" class="oilcase-modal__shadow"></div>
                <div class="oilcase-modal__container">
                    <h1 class="oilcase-modal__container__title">{{ modalProps.title }}</h1>
                    <component :is="modalComponent" :data="modalProps"></component>
                </div>
            </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapGetters } from 'vuex';
import authModal from './auth-modal/auth-modal.vue';

export default defineComponent({
    data() {
        return {
        }
    },
    components: {
        authModal
    },
    computed: {
        ...mapGetters('modalModule', ['modalComponent', 'modalProps']),
    },
    methods: {
        ...mapMutations('modalModule', ['closeModal']),
    },
})
</script>