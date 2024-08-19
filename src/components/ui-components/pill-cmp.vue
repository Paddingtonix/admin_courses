<template>
    <div class="oil-pill">
        <div class="oil-pill__inner">
            <span>{{ text }}: {{ value }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        text: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: 'value'
        }
    }
})
</script>

<style scoped lang="sass">
.oil-pill
    display: inline-block
    margin-right: rem(12)
    border-radius: rem(16)
    height: rem(24)
    background-color: $disabled_basic
    &__inner
        font-family: $font-family-inter
        font-weight: 700
        // color: $basic_tab
        font-size: rem(12)
        padding: rem(4) rem(8)
        white-space: nowrap
        
</style>