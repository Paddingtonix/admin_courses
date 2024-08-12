<template>
	<div class="lang-switcher">
		<button type="button" class="active">{{ russian }}</button>
		<button type="button">{{ extraLang }}</button>
		<button type="button">{{ extraLang2 }}</button>
	</div>
</template>

<script lang="ts" setup>
const { russian, extraLang, extraLang2 } = defineProps({
	russian: {
		type: String,
		default: "Русский (RU) *",
	},
	extraLang: {
		type: String,
		default: "English (EN) *",
	},
	extraLang2: {
		type: String,
		default: "Français (FR) *",
	},
});
</script>

<style lang="sass" scoped>
.lang-switcher
    position: relative
    display: flex
    justify-content: space-between
    background-color: $disabled_basic
    border-radius: rem(8)
    padding: rem(2)

    button
        padding: rem(16) rem(24)
        font-weight: 600
        color: $basic_tab
        z-index: 1
        transition: all .2s ease-in-out
        &:hover:not(.active)
            transform: translateY(rem(-2))
            color: $basic_primary

        &.active
            border-radius: rem(8)
            background-color: #fff
            border: solid 1px $light_gray
            color: $basic_text
            cursor: default
</style>
