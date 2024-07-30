<template>
    <div class="oil-textarea">
        <label 
            class="oil-textarea__label"
            :class="['oil-textarea__label', { _fill: textarea_value && textarea_value.length }]"
        >{{ label }}</label>
        <textarea 
            v-model="textarea_value" 
            :type="type" 
            @keyup="setValue"
            
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: {
            type: String,
            default: 'label'
        },
        error: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        }
    },
    setup(props, { emit }) {
        const textarea_value = ref<string>('')

        const setValue = () => {
            emit('set', { value: textarea_value.value, type: props.type })
        }

        return {
            textarea_value,
            setValue,
        }
    }
})
</script>
<style lang="sass">
.oil-textarea 
    border: rem(1) solid $light_gray
    border-radius: rem(8)
    height: rem(216)
    position: relative
    padding: rem(26) rem(16)
    textarea
        resize: none
        height: 100%
        width: 100%

    &__label
        color: $light_gray
        position: absolute
        top: rem(16)
        transform: translateY(-16)
        transition: all .2s
        left: rem(16)
        &._fill
            top: rem(8)
            font-size: rem(12)
            color: $light_primary

</style>