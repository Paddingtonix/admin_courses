<template>
    <div class="oilcase-textarea">
        <textarea 
            class="oilcase-textarea__field"
            :class="{'_fill-input': textarea_field_value.value.length, '_error-input': textarea_error.length}"
            :type="textarea_type"
            v-model="textarea_field_value.value"
            @keyup="setValue"
            v-bind="$attrs"
        />
        <label class="oilcase-textarea__label">{{ textarea_label }}</label>
        <span class="oilcase-textarea__error">{{ textarea_error }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    props: {
        textarea_type: {
            type: String,
            default: 'text'
        },
        textarea_value: {
            type: String,
            default: ''
        },
        textarea_label: {
            type: String,
            default: 'label'
        },
        textarea_error: {
            type: String,
            default: ''
        },
    },
    setup(props) {
        const textarea_field_value = reactive({
            value: props.textarea_value
        })

        return {
            textarea_field_value
        }
    },
    methods: {
        setValue() {
            // this.$emit('update', {value: this.input_field_value.value, type: this.$props.input_type})
        },
    }
})
</script>