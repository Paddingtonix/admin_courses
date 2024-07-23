<template>
    <div class="oil-direction" :class="{ _active: picked}" @click="setDirection()"><span>{{ text }}</span></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		text: {
			type: String,
			default: 'direction'
		},
		picked: {
			type: Boolean,
			default: false
		},
		id: {
			type: Number,
			default: null
		}
	},
	setup(props, { emit }) {
		const setDirection = () => {
				emit('set_direction', { picked: !props.picked, id: props.id })
			}

		return {
			setDirection
		}
	}
})

</script>

<style scoped lang="sass">
.oil-direction
	background-color: $basic_white
	border: rem(1) solid $basic_gray
	border-radius: rem(16)
	padding: rem(4) rem(8)
	line-height: rem(20)
	font-size: rem(14)
	cursor: pointer
	height: fit-content
	&:hover
		transition: background-color .2s
		background-color: $basic_white
		border-color: $basic_primary
		span
			color: $basic_primary

	&._active
		background-color: $background-main
		color: $basic_primary
		border: rem(1) solid $basic_primary
		span
			color: $basic_primary

	span
		color: $basic_gray
</style>
