<template>
    <section class="oil-container">
        <div class="oil-page oil-course-setting">
            <breadCmp 
                :prev_page="'Список курсов'"
                :current_page="'Геологическое моделирование пласта'"
                class="oil-course-setting__bread"
            />
            <div class="oil-course-setting__menubar">
                <tabsCmp 
                    v-for="(tab, tab_idx) in tabs.list" 
                    :key="tab_idx"
                    :text="tab.text"
                />
            </div>
            <template v-if="active_tab === 1">
                <div class="oil-course-setting__info">
                    <CardInfo 
                        v-for="(card, card_idx) in course_setting"
                        :key="card_idx"
                        :text="card.text"
                        :subtext="card.subtext"
                    />
                </div>
            </template>
            <template v-else-if="active_tab === 2">
                <div class="oil-course-setting__info"></div>
            </template>
            <template v-else-if="active_tab === 3">
                <div class="oil-course-setting__content"></div>
            </template>
        </div>
    </section>
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

        const course_setting = reactive([
            {
                subtext: 'Тип',
                text: 'Синхронный'
            },
            {
                subtext: 'Формат',
                text: 'Онлайн'
            },
            {
                subtext: 'приобретение',
                text: 'Платно'
            },
            {
                subtext: 'Доступ',
                text: 'Полный'
            }
        ])
        
        return {
            active_tab,
            tabs,
            course_setting
        }
    },
})
</script>

<style scoped lang="sass">
.oil-course-setting
    @include flex_column()
    &__menubar 
        @include flex_start()
        gap: rem(12)

    &__info

</style>
