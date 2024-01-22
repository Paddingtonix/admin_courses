<template>
    <div class="oilcase-radio" @click="select_field(radio_id)" :class="{_active: radio_id === active_field}">
        <div class="oilcase-radio__field">
            <div class="oilcase-radio__field__inner" v-if="radio_id === active_field"></div>
        </div>
        <span class="oilcase-radio__text">{{ radio_text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        radio_text: {
            type: String,
            default: 'text'
        },
        active_field: {
            type: Boolean,
            default: false
        },
        radio_id: {
            type: Number,
            default: 0
        }
    },
    setup(_, { emit }) {
        const select_field = (id: number) => {
            emit('select-radio', id)
        }

        return {
            select_field
        }
    }
})

</script>