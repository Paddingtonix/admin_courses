<template>
    <div class="oilcase-edit-input">
        <input-cmp 
            :input_label="label"
            :input_size="input_size"
            @update="setValue"
        />
        <template v-if="edit_mod">
            <transition-group name="slide-up">
                <div class="oilcase-edit-input__icons" v-if="changes_value.value">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.81806 19.779L2.4541 13.415L5.2841 10.585L8.81806 14.129L18.716 4.22104L21.546 7.05104L8.81806 19.779Z" fill="#ffffff"/>
                    </svg>
                    <svg @click="openEdit(false)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12.0001 22C7.95361 22.0024 4.30455 19.5659 2.75572 15.8276C1.20689 12.0893 2.0636 7.78606 4.92606 4.92598C7.45335 2.39868 11.137 1.41166 14.5893 2.33672C18.0417 3.26177 20.7383 5.95836 21.6633 9.41072C22.5884 12.8631 21.6014 16.5467 19.0741 19.074C17.2015 20.955 14.6542 22.0086 12.0001 22ZM4.00006 12.172C4.04737 16.5732 7.64116 20.1095 12.0426 20.086C16.444 20.0622 19.9996 16.4875 19.9996 12.086C19.9996 7.68449 16.444 4.10975 12.0426 4.08598C7.64116 4.06244 4.04737 7.59874 4.00006 12V12.172ZM9.40906 16L8.00006 14.59L10.5901 12L8.00006 9.40998L9.41006 7.99998L12.0001 10.59L14.5901 7.99998L16.0001 9.40998L13.4101 12L16.0001 14.59L14.5911 16L12.0001 13.41L9.41006 16H9.40906Z" fill="#FFFFFF"/>
                    </svg>
                </div>
                <div class="oilcase-edit-input__icons" v-else>
                    <svg @click="openEdit(true)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.41999 20.579C4.13948 20.5785 3.87206 20.4603 3.68299 20.253C3.49044 20.0475 3.39476 19.7695 3.41999 19.489L3.66499 16.795L14.983 5.48103L18.52 9.01703L7.20499 20.33L4.51099 20.575C4.47999 20.578 4.44899 20.579 4.41999 20.579ZM19.226 8.31003L15.69 4.77403L17.811 2.65303C17.9986 2.46525 18.2531 2.35974 18.5185 2.35974C18.7839 2.35974 19.0384 2.46525 19.226 2.65303L21.347 4.77403C21.5348 4.9616 21.6403 5.21612 21.6403 5.48153C21.6403 5.74694 21.5348 6.00146 21.347 6.18903L19.227 8.30903L19.226 8.31003Z" fill="#ffffff"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ffffff" />
                    </svg> 
                </div>
            </transition-group>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import inputCmp from '../input-cmp/input-cmp.vue'

export default defineComponent({
    props: {
        label: {
            type: String,
            default: ''
        },
        edit_mod: {
            type: Boolean,
            default: false
        },
        input_size: {
            type: String,
            default: 'l'
        }
    },
    setup() {
        const changes_value = reactive({
            value: false
        })

        const focusInput = () => {
            changes_value.value = true
        }

        const input_value = reactive({
            value: ''
        })

        const setValue = (text: {value: string}) => {
            input_value.value = text.value
        }

        const openEdit = (val:boolean) => {
            changes_value.value = val
        }

        return {
            changes_value,
            input_value,
            focusInput,
            openEdit,
            setValue
        }
    },
    components: {
        'input-cmp': inputCmp
    }
})

</script>