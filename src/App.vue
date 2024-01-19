<template>
    <main>
        <header-cmp />
        <router-view></router-view>
        <modal-cmp />
        <sidebar-cmp v-if="$route.name !== 'main'"/>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import modalCmp from '@/components/base/modals/modal-cmp.vue'
import headerCmp from '@/components/base/header/header-cmp.vue'
import sidebarCmp from '@/components/base/sidebar/sidebar-cmp.vue'

export default defineComponent({
    name: 'app',
    setup() {
    },
    methods: {},
    components: {
        'modal-cmp': modalCmp,
        'header-cmp': headerCmp,
        'sidebar-cmp': sidebarCmp
    }
});
</script>

<style>
</style>
