<template>
    <div class="oil-card-info" :class="{'_revers': card_type === 'texts'}">
        <span class="oil-card-info__count">{{ count }}</span>
        <span class="oil-card-info__text">{{ text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        count: {
            type: [Number, String],
            default: 0
        },
        text: {
            type: String,
            default: 'text'
        },
        card_type: {
            type: String,
            default: 'numbers' //texts 
        }
    }
})
</script>
<style scoped lang="sass">
.oil-card-info
    padding: rem(16) rem(48) 
    background-color: $disabled_basic
    @include flex_column()
    gap: rem(2)
    border-radius: rem(8)
    flex: 1

    &._revers
        flex-direction: column-reverse
        .oil-card-info__count
            font-size: rem(20)

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