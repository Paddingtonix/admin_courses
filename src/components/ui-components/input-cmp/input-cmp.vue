<template>
    <div class="oilcase-input">
        <input 
            class="oilcase-input__field"
            :class="{'_fill-input': input_field_value.value.length, '_error-input': input_error.length}"
            :type="input_type"
            v-model="input_field_value.value"
            @keyup="setValue"
            v-bind="$attrs"
        />
        <label class="oilcase-input__label">{{ input_label }}</label>
        <span class="oilcase-input__error">{{ input_error }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    props: {
        input_type: {
            type: String,
            default: 'text'
        },
        input_value: {
            type: String,
            default: ''
        },
        input_label: {
            type: String,
            default: 'label'
        },
        input_error: {
            type: String,
            default: ''
        },
    },
    setup(props) {
        const input_field_value = reactive({
            value: props.input_value
        })

        return {
            input_field_value
        }
    },
    methods: {
        setValue() {
            this.$emit('update', {value: this.input_field_value.value, type: this.$props.input_type})
        },
    }
})
</script>
