<template>
    <NuxtLink :to="to" class="oil-link" :class="{ '_light-svg': link_active }">
        <slot></slot>
        <span :style="{ visibility: !opened_sidebar ? 'hidden' : 'visible' }">{{
            link_name
        }}</span>
    </NuxtLink>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        link_name: {
            type: String,
            default: "link",
        },
        link_active: {
            type: Boolean,
            default: false,
        },
        to: {
            type: String,
            default: "",
        },
        opened_sidebar: {
            type: Boolean,
            default: true,
        },
    },
});
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
</style>
