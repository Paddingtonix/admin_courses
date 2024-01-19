<template>
    <div class="oilcase-link">
        <slot></slot>
        <span class="oilcase-link__text">{{ text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: {
            type: String,
            default: 'text'
        }
    }
})

</script>