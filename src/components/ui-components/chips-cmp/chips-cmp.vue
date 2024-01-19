<template>
    <div class="oilcase-chips">
        <span class="oilcase-chips__text">{{ title }}</span>
        <span class="oilcase-chips__text">{{ counter }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: 'title'
        },
        counter: {
            type: Number,
            default: 0
        }
    },
    setup() {

    }
})
</script>