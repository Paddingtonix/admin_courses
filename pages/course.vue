<template>
    <div class="oil-course">
        <p>COURSE</p>
        <div class="oil-course__breadcrumb"></div>
        <TabsCmp />
        <div class="oil-course__main"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
 
export default defineComponent({
    setup() {},
})
</script>

<style scoped lang="sass">
.oil-course
    @include flex_column()
</style>
