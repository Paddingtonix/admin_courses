<template>
    <div class="oil-link" :class="{'_light-svg': link_active}">
        <slot></slot>
        <a>{{ link_name }}</a>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        link_name: {
            type: String,
            default: 'link'
        },
        link_active: {
            type: Boolean,
            default: false
        }
    }
})
</script>
<style lang="sass">
.oil-link
    padding: rem(10) rem(26)

    @include flex_start()
    gap: rem(12)
    cursor: pointer
    transition: all .2s linear
    a
        color: $dark_gray

    &:hover 
        background-color: $basic_light_gray

    &._light-svg
        svg path 
            stroke: $basic_primary

        a 
            color: $basic_primary    

</style>