<template>
    <div class="oilcase-burger">
        <div class="oilcase-burger__line" :class="{_active: $props.open_burger}"></div>
        <div class="oilcase-burger__line" :class="{_active: $props.open_burger}"></div>
        <div class="oilcase-burger__line" :class="{_active: $props.open_burger}"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        open_burger: {
            type: Boolean,
            default: false
        }
    },
})
</script>