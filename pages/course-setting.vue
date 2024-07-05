<template>
    <div class="oil-course__settings oil-container">
        <breadCmp 
            :prev_page="'Список курсов'"
            :current_page="'Геологическое моделирование пласта'"
            class="oil-course__settings__bread"
        />
        <div class="oil-course__settings__menubar">
            <tabsCmp 
                v-for="(tab, tab_idx) in tabs.list" 
                :key="tab_idx"
                :text="tab.text"
            />
        </div>
        <template v-if="active_tab === 1">
            <div class="oil-course__settings__main"></div>
        </template>
        <template v-if="active_tab === 2">
            <div class="oil-course__settings__info"></div>
        </template>
        <template v-if="active_tab === 3">
            <div class="oil-course__settings__content"></div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
 
export default defineComponent({
    setup() {
        const active_tab = ref<number | null>(null)

        const tabs = reactive({
            list: [
                {
                    id: 1,
                    text: 'Общие настройки'
                },
                {
                    id: 2,
                    text: 'Информация о курсе'
                },
                {
                    id: 3,
                    text: 'Содержание'
                },
            ]
        })
        
        return {
            active_tab,
            tabs
        }
    },
})
</script>

<style scoped lang="sass">
.oil-course__settings
    @include flex_column()
    &__menubar 
        @include flex_start()
        gap: rem(12)
</style>
