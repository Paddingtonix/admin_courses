<template>
    <section class="oil-container">
        <div class="oil-page direction-page">
            <h4 class="direction-page__header">Направления курсов</h4>
            <PillCmp
                class="direction-page__pill"
                v-for="(pill, idx) in pill_info"
                :key="idx"
                :text="pill.text"
                :value="pill.value"
            />
            <div class="direction-page__settings">
                <SearchCmp
                    label="Поиск"
                />
                <BtnCmp
                    class="direction-page__settings__btn"
                    background_type="_tertiary"
                    text="Добавить направление">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </BtnCmp>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {useRouter} from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter()

        const pill_info = reactive([
            {
                text: 'Всего',
                value: '25'
            },
            {
                text: 'На сайте',
                value: '23'
            },
        ])

        return {
            pill_info,
        }
    }
})
</script>

<style lang="sass" scoped>
.direction-page
    &__header
        margin-bottom: rem(12)

    &__pill
        margin-bottom: rem(32)

    &__settings
        @include flex_center()

</style>