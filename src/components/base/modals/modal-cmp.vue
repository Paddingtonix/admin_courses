<template>
    <transition name="fade">
            <div class="oilcase-modal" v-if="modalComponent" :key="modalComponent">
                <div @click="closeModal()" class="oilcase-modal__shadow"></div>
                <div class="oilcase-modal__container">
                    <component :is="modalComponent" :data="modalProps" :class="'oilcase-modal'"></component>
                </div>
            </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapGetters } from 'vuex';

export default defineComponent({
    data() {
        return {
        }
    },
    components: {},
    computed: {
        ...mapGetters('modal', ['modalComponent', 'modalProps', 'modalShadow']),
    },
    methods: {
        ...mapMutations('modal', ['closeModal']),
    },
})
</script>