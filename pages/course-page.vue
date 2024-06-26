<template>
    <section class="oil-container oil-course">
        <div class="oil-course__info oil-page">
            <div class="oil-course__info__card">
                <CardInfo 
                    v-for="(card, idx) in course_info"
                    :key="idx"
                    :count="card.count"
                    :text="card.text"
                />
            </div>
            <div class="oil-course__info__attention">
                <i class="oil-course__info__attention__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20.0007 26.6673V20.0007M20.0007 13.334H20.0173M36.6673 20.0007C36.6673 29.2054 29.2054 36.6673 20.0007 36.6673C10.7959 36.6673 3.33398 29.2054 3.33398 20.0007C3.33398 10.7959 10.7959 3.33398 20.0007 3.33398C29.2054 3.33398 36.6673 10.7959 36.6673 20.0007Z" stroke="#176DC1" stroke-width="3.33" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </i>
                <p class="oil-course__info__attention__text">На данный момент в системе нет ни одного курса. Как только первые курсы будут созданы, здесь появится таблица, которая позволит управлять их параметрами и содержанием. </p>
            </div>
            <btnCmp 
                :text="'Создать курс'"
                class="oil-course__info__btn"
                @click="navigate('/course-create')"
            />
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter()

        const course_info = reactive([
            {
                count: 0,
                text: 'Всего'
            },
            {
                count: 0,
                text: 'В разработке'
            },
            {
                count: 0,
                text: 'На модерации'
            },
            {
                count: 0,
                text: 'Опубликован'
            },
            {
                count: 0,
                text: 'Снят с витрины'
            },
        ])

        const navigate = (url: string) => {
            router.push(url)
        }

        return {
            course_info,
            navigate
        }
    }
})
</script>
<style lang="sass" scoped>
.oil-course
    &__info
        &__card 
            margin-bottom: rem(48)

            @include flex_center_spacing()
            gap: rem(12)
        
        &__attention
            padding: rem(16) rem(24)
            margin-bottom: rem(32)
            
            border: 1px solid $basic-primary
            background-color: $disabled_basic
            max-width: rem(972)
            @include flex_center()
            gap: rem(10)
            border-radius: rem(12)
            &__icon
                padding: rem(12)

                border-radius: 50%
                background-color: #176DC10D
                @include flex_center()

            &__text
                font-size: rem(16)
                line-height: 150%   

        &__btn 
            max-width: rem(192)         
</style>