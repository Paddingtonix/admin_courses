<template>
    <div class="oil-tabs" :class="{ _active: active === id }" @click="selectTab(id)"></div>
    <span>{{ text }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: {
            type: String,
            default: '',
        },
        id: {
            type: Number,
            default: 1,
        },
        active: {
            type: Number,
            default: 1,
        },
    },
    setup(props, { emit }) {
        const selectTab = (tab_id: number) => {
            emit('select-tab', tab_id)
        }

        return {
            selectTab,
        }
    },
})
</script>
<style scoped lang="sass">
.oil-tabs
    cursor: pointer
    // transition: color .5s
    // color: $menu
    font-weight: 700
    font-size: 16px
    line-height: 24px
    position: relative
    &:not(&._active)
        &:hover 
            // color: $hover-blue

        &:active
            // color: $text-color    

        &:after 
            display: block
            position: absolute
            top: 32px
            left: 0
            width: 0
            height: 2px 
            // background-color: $btn-background
            content: ""
            transition: width 0.3s

        &:hover:after
            width: 100%
            left: 0
            right: auto
            
        &:not(&:hover)
            &::after   
                right: 0
                left: auto

    &._active
        // color: $btn-background
        padding-bottom: 8px
        // border-bottom: 2px solid $btn-background
        border-bottom: 2px solid
</style>
