<template>
    <div class="oil-card-info">
        <span class="oil-card-info__count">{{ count }}</span>
        <span class="oil-card-info__text">{{ text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        count: {
            type: Number,
            default: 0
        },
        text: {
            type: String,
            default: 'text'
        }
    }
})
</script>
<style scoped lang="sass">
.oil-card-info
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