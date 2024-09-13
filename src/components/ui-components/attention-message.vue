<template>
	<div class="oil-course-content__info__attention">
		<i class="oil-course-content__info__attention__icon">
			<slot name="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
				>
					<path
						d="M20.0007 26.6673V20.0007M20.0007 13.334H20.0173M36.6673 20.0007C36.6673 29.2054 29.2054 36.6673 20.0007 36.6673C10.7959 36.6673 3.33398 29.2054 3.33398 20.0007C3.33398 10.7959 10.7959 3.33398 20.0007 3.33398C29.2054 3.33398 36.6673 10.7959 36.6673 20.0007Z"
						stroke="#176DC1"
						stroke-width="3.33"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</slot>
		</i>
		<p class="oil-course-content__info__attention__text">
			{{ message }}
		</p>
		<BtnCmp
			:text="buttonText"
			@click="buttonClick"
			:background_type="backgroundType"
		>
			<slot name="button-icon">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M15 8L10 13M10 13L5 8M10 13V1"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</slot>
		</BtnCmp>
	</div>
</template>

<script setup>
const props = defineProps({
	message: {
		type: String,
		required: true,
	},
	buttonText: {
		type: String,
		default: "Скачать PDF",
	},
	backgroundType: {
		type: String,
		default: "_primary",
	},
	buttonClick: {
		type: Function,
		required: true,
	},
});
</script>

<style lang="sass">
.oil-course-content__info
    &__attention
        padding: rem(16) rem(24)
        margin-bottom: rem(32)

        border: 1px solid $basic-primary
        background-color: $disabled_basic
        max-width: rem(972)
        @include flex_center()
        gap: rem(10)
        border-radius: rem(12)

        &__icon
            padding: rem(12)

            border-radius: 50%
            background-color: #176DC10D
            @include flex_center()

        &__text
            min-width: rem(640)
            font-size: rem(16)
            line-height: 150%
</style>
