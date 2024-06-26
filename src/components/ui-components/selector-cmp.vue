<template>
    <div class="oil-selector" @click="openList">
        <div class="oil-selector__chooses">
            <span>{{ chooses_variable }}</span>
            <svg :class="{'_active-list': list_openned.value}" class="oil-selector__chooses__chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="oil-selector__list" v-if="list_openned.value">
            <span v-for="(list_item, idx) in list" :key="idx">{{ list_item.text }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const list_openned = reactive({
            value: false
        }) 

        const chooses_variable = ref('Text')

        const openList = () => {
            list_openned.value = !list_openned.value
        }

        return {
            list_openned,
            chooses_variable,
            openList
        }
    }
})
</script>
<style lang="sass" scoped>
.oil-selector
    padding: rem(16) rem(36) rem(16) rem(16)
    border: rem(1) solid $light_gray
    border-radius: rem(8)
    background-color: $basic_white

    position: relative
    &__chooses 
        &__chevron 
            position: absolute
            right: rem(18)
            top: 50%
            transform: rotate(0deg) translateY(-50%)
            transition: transform .2s
            span 
                font-size: rem(24)
                line-height: 150%

            &._active-list
                transform: rotate(180deg) translateY(-50%)

    &__list 
        position: absolute
        left: 0
        bottom: rem(-56)

        width: 100%
        height: 100%
        max-height: rem(200)
        border: rem(1) solid $light_gray
        border-radius: rem(8)
        background-color: $basic_white

</style>