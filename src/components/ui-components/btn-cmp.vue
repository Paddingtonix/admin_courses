<template>
	<!-- v-wave="{ color: '#03AEE2' }" -->
	<button class="oil-btn" :class="background_type" :disabled="disabled">
		<slot></slot>
		<span>{{ text }}</span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		text: {
			type: String,
			default: "Button",
		},
		background_type: {
			type: String,
			default: "_primary", //_secondary, _tertiary, _quaternary
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const { disabled, text, background_type } = toRefs(props);
		watch(disabled, () => {
			console.log(disabled, "BUTTON");
		});
		return {
			disabled,
			text,
			background_type,
		};
	},
});
</script>

<style scoped lang="sass">
.oil-btn
    padding: rem(16) rem(32)
    cursor: pointer
    transition: all .2s
    user-select: none
    border-radius: rem(8)
    width: 100%
    height: rem(56)
    @include flex_center()
    gap: rem(8)
    & > *
        transition: all .2s

    &._primary
        @include button_styles_primary()

    &._secondary
        @include button_styles_secondary()

    &._tertiary
        @include button_styles_tertiary()

    &._quaternary
        @include button_styles_quaternary()
</style>
