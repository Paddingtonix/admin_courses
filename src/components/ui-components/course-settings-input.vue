<template>
	<div :class="'oil-settings-input'">
		<InputCmp :label="label" class="oil-settings-input__cmp" />
		<i class="accept" @click="acceptFunction()"
			><svg
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
					stroke="#27AE63"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</i>
		<i class="decline" @click="declineFunction()">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M17 7L7 17M7 7L17 17"
					stroke="#FF7C7C"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</i>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	acceptFunction: {
		type: Function,
		default: () => {},
	},
	declineFunction: {
		type: Function,
		default: () => {},
	},
	label: {
		type: String,
		default: "Название теста",
	},
});
</script>

<style lang="sass">
.oil-settings-input
    display: flex
    align-items: center
    width: 100%
    column-gap: rem(8)
    &__cmp
        width: 100%
        max-height: rem(40)
    i
        cursor: pointer
        svg
            path
                transition: stroke .3s
        &:hover
            &.accept
                svg
                    path
                        stroke: $dark_success

            &.decline
                svg
                    path
                        stroke: $dark_error

        &:active
            //$light_success
            &.accept
                svg
                    path
                        stroke: $light_success

            &.decline
                svg
                    path
                        stroke: $light_error
</style>
