
<template>
    <nav class="navigation-switcher">
      <NuxtLink
        class="navigation-switcher__link" 
        v-for="switcher in switchers"
        :class="{ 'active': switcher.isActive }"
        :key="switcher.id"
        :to="switcher.link"
        @click="changeSwitcher(switcher.id)"
      >
        {{ switcher.text }}
      </NuxtLink>
    </nav>
  </template>

<script lang="ts" setup>
import type ISwitcher from '~/src/ts-interface/switcher.type';
import { defineProps } from 'vue';

const props = defineProps<{
  switcherArray: ISwitcher[]
}>();

const { switcherArray } = props;

const switchers = reactive(switcherArray);

const changeSwitcher = (id: number) => {
    const activeElement = switchers.find(el => el.isActive);

    if(activeElement?.isActive){
        activeElement.isActive = false
    }

    const currentElement = switchers.find(el => el.id === id);

    if(currentElement && !currentElement.isActive) {
        currentElement.isActive = true;
    }

}

</script>

<style lang="sass">
.navigation-switcher
    display: flex

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
        &.active, &:active
            &::after
              width: 100%
</style>