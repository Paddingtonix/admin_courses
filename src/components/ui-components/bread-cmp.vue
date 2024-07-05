<template>
    <div class="oil-bread">
        <span class="oil-bread__page _primary">{{ prev_page }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#374351" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="oil-bread__page">{{ current_page }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        prev_page: {
            type: String,
            default: 'prev_page'
        },
        current_page: {
            type: String,
            default: 'current_page'
        },
    },
    setup() {
    }
})
</script>
<style lang="sass" scoped>
.oil-bread
    @include flex_start()
    gap: rem(8)
    &__page
        font-size: rem(20)
        line-height: 140%
        font-weight: bold
        &._primary
            color: $basic_primary
            
</style>