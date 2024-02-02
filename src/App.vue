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
import axios from 'axios';

export default defineComponent({
    name: 'app',
    setup() {
        axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhdXRob3JAYXV0aG9yLmNvbSIsInJvbGUiOiJBdXRob3IiLCJuYmYiOjE3MDY2OTI5MDgsImV4cCI6MTczODIyODkwOCwiaWF0IjoxNzA2NjkyOTA4fQ.z9hJt6_FX7xlfDeGCob7L8g65DiERhkD0m2WSiemruMK19Uy1-lttzbFiQg10RHha2ZjhEPL5tkuTTGcG9uiig`
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
