<template>
	<div class="oil-summary__wrapper" @click="toggleSummary">
		<div
			class="oil-summary__wrapper__head"
			:class="{ active: isSummaryVisible }"
		>
			<slot name="summary-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
				>
					<path
						d="M12 16V12M12 8H12.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
						stroke="#323C46"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</slot>
			<span>{{ attentionTitle }}</span>
			<slot name="summary-chevron">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M6 9L12 15L18 9"
						stroke="#374351"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</slot>
		</div>
		<div
			v-if="isSummaryVisible"
			class="oil-summary__wrapper__text"
			@click.stop
		>
			<slot name="summary-text"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { attentionTitle } = defineProps({
	attentionTitle: {
		type: String,
		default: "Как работать с содержанием модуля?",
	},
});

const isSummaryVisible = ref(false);

const toggleSummary = () => {
	isSummaryVisible.value = !isSummaryVisible.value;
};
</script>

<style lang="sass">
.oil-summary

	&__wrapper
		margin-bottom: rem(32)
		padding: rem(16) rem(24)
		@include flex_column()
		gap: rem(12)
		background-color: $basic_light_gray
		border-radius: rem(8)
		border: rem(1) solid $light_gray
		cursor: pointer
		p
			font-size: rem(16)
			line-height: 150%
			color: $basic_table_header

		&__icon
			padding: rem(12)
			background-color: #F9AD4E1A
			border-radius: 50%
		&__head
			user-select: none
			gap: rem(12)

			display: flex
			align-items: center
			position: relative
			span
				font-weight: bold
			svg
				transition: transform .3s
				&:last-of-type
					margin-left: auto

			&.active
				svg
					&:last-of-type
						transform: rotate(180deg)
		&__text
			@include flex-column()


			ul
				list-style: inside
				li, p
					color: $basic_table_header
					line-height: rem(24)
				li
					margin-left: rem(16)
				&:not(:last-child)
					margin-bottom: rem(20)
				span
					display: block
					font-size: rem(16)
					font-weight: bold
					margin-bottom: rem(12)
					line-height: rem(24)
					font-weight: bold
				& > ul
					padding-left: rem(32)
					line-height: rem(24)
				&:not(&:last-child)
					margin-bottom: rem(20)
</style>
