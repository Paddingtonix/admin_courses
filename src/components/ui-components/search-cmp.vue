<template>
    <div class="oil-search">
        <InputCmp 
            class="oil-search__input" 
            :label="label"
        />
        <svg class="oil-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: {
            type: String,
            default: 'label'
        }
    },
    setup() {

    }
})
</script>
<style lang="sass">
.oil-search 
    position: relative
    max-width: rem(542)
    width: 100%
    &__icon 
        position: absolute
        top: 50%
        right: rem(16)
        transform: translateY(-50%)

    .oil-input 
        height: rem(38)
</style>