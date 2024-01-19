<template>
    <div class="oilcase-checkbox" @click="changeStateCheckbox(text)">
        <div class="oilcase-checkbox__field">
            <svg v-if="checkbox_active.value" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.3658 5.57883L7.34843 15.5962L2.63438 10.8822L3.80938 9.70717L7.34843 13.2378L16.1908 4.40382L17.3658 5.57883Z" fill="#03AEE2"/>
            </svg>
        </div>
        <span class="oilcase-checkbox__text">{{ text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    props: {
        text: {
            type: String,
            default: 'text'
        }
    },
    setup(_, { emit }) {
        const checkbox_active = reactive({
            value: false
        })

        const selectParams = (params: string) => {
            emit('setParams', params)
        }

        const changeStateCheckbox = (text: string) => {
            checkbox_active.value = !checkbox_active.value
            selectParams(text)
        }

        return {
            changeStateCheckbox,
            checkbox_active,
        }
    }
})
</script>1