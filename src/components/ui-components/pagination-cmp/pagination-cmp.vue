<template>
    <div class="oilcase-pagination">
        <div class="oilcase-pagination__page" :class="{_active: current_page === page}" v-for="page in pages.length" :key="page" @click="changePage(page)">
            <span class="oilcase-pagination__page__field">{{ page }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        // посмотреть, как у бэка будет
        pages: {
            type: Array as () => Array<Array<{ test: string }>>,
            default: () => []
        },
        current_page: {
            type: Number,
            default: 1
        }
    },
    setup(_, { emit }) {        
        const changePage = (page: number) => {
            emit('change_page', page)
        }

        return {
            changePage
        }
    }
})
</script>