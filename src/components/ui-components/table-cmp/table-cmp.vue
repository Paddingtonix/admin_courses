<template>
    <div class="oilcase-table">
        <div v-for="(count, count_idx) in header_table.length" :key="count" class="oilcase-table__column">
            <div class="_style-row">
                <span class="oilcase-table__header__text">{{ header_table[count_idx]?.value }}</span>
            </div>
            <template v-for="(row, row_idx) in data_table.length" :key="row">
                <div class="_style-row">
                    <span v-if="data_table[row_idx]?.course[count_idx]?.type === 'string'">{{ data_table[row_idx]?.course[count_idx]?.text }}</span>   
                    <a v-else> {{ data_table[row_idx].course[count_idx]?.text }}</a>    
                    <svg class="oilcase-table__basket" v-if="count === header_table.length && (data_table[row_idx]?.course[3].text === 'В разработке' || data_table[row_idx]?.course[3].text === 'На модерации')" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ffffff" />
                    </svg>  
                </div>  
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        header_table: {
            type: Array as () => Array<Array<{ value: string; id: number }>>,
            default: () => []
        },
        data_table: {
            type: Array as () => Array<{ type: string; id: number, text: string }>,
            default: () => []
        }
    },
    setup() {

    }
})

</script>