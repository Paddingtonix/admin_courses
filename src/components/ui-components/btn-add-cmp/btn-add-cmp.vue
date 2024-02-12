<template>
     <div class="oilcase-add-btn" @click="addBlock">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Добавить {{ text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String,
            default: 'автор'
        },
        block: {
            type: Object,
            default: () => {}
        },
        type_block: {
            type: String,
            default: ''
        },
        idx_block: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {



        const addBlock = () => {
            emit('add-block', {block: props.block, type: props.type_block, idx_block: props.idx_block});
        }

        return {
            addBlock
        }
    }
})
</script>