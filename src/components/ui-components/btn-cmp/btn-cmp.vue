<template>
    <div class="oilcase-btn" 
        :class="[
            {_primary: btn_type === 'primary'},
            {_delete: btn_type === 'delete'},
            {_secondary: btn_type === 'secondary'},
            btn_disabled ? '_disabled' : ''
        ]">
        <slot></slot>
        <span class="oilcase-btn__text">{{ btn_text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        btn_type: {
            type: String,
            default: 'primary'
        },
        btn_text: {
            type: String,
            default: 'button'
        },
        btn_disabled: {
            type: Boolean,
            default: false
        }
    },
})
</script>