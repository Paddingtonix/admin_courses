<template>
    <div class="oilcase-tabs">
        <span 
            class="oilcase-tabs__text"
            v-for="tab in tabs" 
            :key="tab" 
            :class="{_active: tab.id === id}"
            @click="selectedTab(tab.id)"
        >{{ tab.name }}
        <div class="oilcase-tabs__underline"></div>
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        tabs: {
            type: Array,
            default: () => [{
                id: 1,
                name: 'Отправить данные'
            }]
        },
        id: {
            type: Number,
            default: 1
        }
    } ,  
    methods: {
        selectedTab(id: Number) {
            this.$emit('select', id)
        }
    }
})
</script>