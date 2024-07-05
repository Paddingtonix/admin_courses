<template>
    <div class="oil-pagination">
        <div 
            class="oil-pagination__cell" 
            v-for="(page, idx) in pagesArray.value.slice(0, 3)" 
            :key="idx"
            :class="{ _active: true }"
        >
            <span>{{ page }}</span>
        </div>
        <span class="oil-pagination__cell" v-if="pagesArray.value.length > 6">...</span>
        <div 
            class="oil-pagination__cell" 
            v-for="(page, idx) in pagesArray.value.slice(-3)" 
            :key="idx"
            :class="{ _active: true }"
        >
            <span>{{ page }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        pages_count: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const pagesArray = reactive({
            value: Array.from({ length: props.pages_count }, (_, i) => i + 1)
        })
        
        return {
            pagesArray
        }
    }
})
</script>
<style lang="sass">
.oil-pagination
    max-width: rem(292)

    @include flex_center_spacing()
    gap: rem(2)
    &__cell 
        width: rem(40)
        height: rem(40)

        border-radius: 50%
        @include flex_center()
        span 
            font-size: rem(14)

        &._active 
            background-color: #E5F0FB
</style>