<template>
	<div class="oil-card-info">
		<div class="oil-card-info__course-page">
			<span class="oil-card-info__course-page__count">{{ count }}</span>
			<span class="oil-card-info__course-page__text">{{ text }}</span>
		</div>
		<div class="oil-card-info__course-setting">
			<span class="oil-card-info__course-setting__count">{{
				count
			}}</span>
			<span class="oil-card-info__course-setting__text">{{ text }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		count: {
			type: Number,
			default: 0,
		},
		text: {
			type: String,
			default: "text",
		},
	},
});
</script>
<style scoped lang="sass">
.oil-card-info
    &__course-page
        padding: rem(16) rem(72)
        background-color: $disabled_basic
        @include flex_column()
        gap: rem(2)
        border-radius: rem(8)
        flex: 1
        &__count
            font-size: rem(40)
            line-height: 120%
            font-weight: bold
            text-align: center

        &__text
            font-size:  rem(14)
            color: $basic_gray
            text-align: center
</style>
