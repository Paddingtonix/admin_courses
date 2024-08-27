<template>
	<div class="lang-switcher">
		<button
			v-for="lang in langs"
			type="button"
			:id="lang.id"
			:class="{ active: active === lang.id }"
			@click="() => changeActiveLang(lang.id)"
		>
			{{ lang.text }}
		</button>
	</div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

const { russian, extraLang, extraLang2, active } = defineProps({
	russian: {
		type: Object as PropType<{ text: string; id: string }>,
		default: { text: "Русский (RU) *", id: "ru" },
	},
	extraLang: {
		type: Object as PropType<{ text: string; id: string }>,
		default: { text: "English (EN) *", id: "en" },
	},
	extraLang2: {
		type: Object as PropType<{ text: string; id: string }>,
		default: { text: "Français (FR) *", id: "test" },
	},
	active: {
		type: String,
		default: "ru",
	},
});

const langs = {
	russian,
	extraLang,
	extraLang2,
};
const emit = defineEmits(["change-lang"]);
const changeActiveLang = (id: string) => {
	emit("change-lang", id);
};
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
        // color: $basic_tab
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
