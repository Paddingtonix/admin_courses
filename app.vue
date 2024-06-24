<template>
    <div class="oil">
        <Header />
        <Sidebar />
        <NuxtPage />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup() {
        const route = useRoute();

        return {
            route
        }
    },
})
</script>
<style lang="sass">
@import "@/src/assets/style/index.sass"
</style>
