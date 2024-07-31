
<template>
    <nav class="navigation-switcher">
      <NuxtLink
        class="navigation-switcher__link" 
        v-for="switcher in switchers"
        :key="switcher.id"
        :to="switcher.link"
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

const switchers = switcherArray;

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

        &:hover
            color: $basic_primary
        &:active
            &::after
              width: 100%
        
        &.router-link-exact-active
            color: $basic_primary
            &::after
                  width: 100%
</style>