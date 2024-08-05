<template>
    <div class="tooltip">
        <i class="tooltip__icon">
            <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8V6M6 4H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" stroke="#808E9D" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </i>
        <span class="tooltip__text">
            {{ text }}
        </span>
    </div>
</template>

<script lang="ts" setup>

const { text } = defineProps({
    text: {
        type: String,
        default: 'Tooltip'
    },

});

</script>

<style lang="sass" scoped>
.tooltip
    display: flex
    column-gap: rem(8)
    &__icon
        padding-top: rem(2)
        svg
            width: rem(16)
            height: rem(16)

    &__text
        font-size: rem(16)
        line-height: rem(24)
        word-break: break-all
        font-weight: 400
        color: $basic_tab
</style>
