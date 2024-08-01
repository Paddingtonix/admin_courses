<template>
    <nav class="navigation-switcher">
        <div 
            class="navigation-switcher__link"
            v-for="switcher in switchers" 
            :key="switcher.id" 
            :class="{ active: switcher.isActive }" 
            @click="changeSwitcher(switcher.id)"
        >
            {{ switcher.text }}
        </div>
    </nav>
</template>

<script lang="ts" setup>
import type ISwitcher from '~/src/ts-interface/switcher.type'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    switcherArray: ISwitcher[]
}>()

const { switcherArray } = props

const switchers = reactive(switcherArray)

const emit = defineEmits<{ (e: 'switch-tab', id: number): void }>()

const changeSwitcher = (id: number) => {
    const activeElement = switchers.find((el) => el.isActive)

    if (activeElement?.isActive) {
        activeElement.isActive = false
    }

    const currentElement = switchers.find((el) => el.id === id)

    if (currentElement && !currentElement.isActive) {
        currentElement.isActive = true
        emit('switch-tab', id)
    }
}
</script>

<style lang="sass">
.navigation-switcher
    display: flex
    cursor: pointer
    &__link
        position: relative
        display: block
        font-weight: 500
        margin-right: rem(16)
        padding: rem(16) rem(8)
        transition: color .3s ease-out
        &::after
          content: ""
          transition: width .3s ease-in-out
          display: block
          position: absolute
          bottom: 0
          left: 0
          width: 0%
          height: rem(3)
          background-color: $basic_primary

        &.active, &:hover
            color: $basic_primary
            &::after
                width: 100%
</style>
