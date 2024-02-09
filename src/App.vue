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
        axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBhZG1pbi5jb20iLCJ1bmlxdWVfbmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcwNzM2MjI1NiwiZXhwIjoxNzM4ODk4MjU2LCJpYXQiOjE3MDczNjIyNTZ9.uG2LvCXBumkAJeOzKVrhoTK6M3pOy81H8QYMEvMO4-YASuQ7Us96H06NSI56EPfClUX0HuQKPx-fISictxkvHA`
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
