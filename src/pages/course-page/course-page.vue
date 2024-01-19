<template>
    <section class="admin-course oilcase__container">
        <h1 class="admin-course__title">Курсы</h1>
        <div class="admin-course__chips">
            <chips-cmp 
                v-for="chips in chips_list.list"
                :key="chips.name"
                :title="chips.name"
                :counter="chips.count"
            />
        </div>
        <div class="admin-course__search">
            <input-cmp 
                :input_label="search_form.label"
                :input_value="search_form.value"
                :input_error="search_form.error"
                :input_type="search_form.type"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="admin-course__filters">
            <div class="admin-course__filters__selectors">
                <selector-cmp 
                    v-for="selector in selector_filter"
                    :key="selector"
                    :selector_list="selector.list"
                    :checkbox="selector.checkbox"
                    :selector_placeholder="selector.placeholder"
                    @setSelectorValue="saveStateSelector"
                />
                <btn-cmp 
                    :btn_text="'Показать'"
                />
            </div>
            <div class="admin-course__filters__sort">
                <span>Сортировка</span>
                <div class="admin-course__filters__sort__values" @click="open_sort_selector(true)">
                    <span>{{ active_sort.value }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="admin-course__filters__sort__list" v-if="active_sort.selector">
                    <span v-for="sort in sort_list" :key="sort.id" @click="select_sort(sort.text)">{{ sort.text }}</span>
                </div>
            </div>
        </div>
        <div class="admin-course__table">
            <table-cmp 
                :header_table="header_table"  
                :data_table="data_table"
            />
        </div>
        <pagination-cmp 
            @change_page="currentPage"
            :pages="pages"
            :current_page="current_page.value"
        />
    </section>
</template>
<script lang="ts">
import { defineComponent, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';

import chipsCmp from '../../components/ui-components/chips-cmp/chips-cmp.vue'
import inputCmp from '../../components/ui-components/input-cmp/input-cmp.vue'
import selectorCmp from '../../components/ui-components/selector-cmp/selector-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue'
import tableCmp from '@/components/ui-components/table-cmp/table-cmp.vue'
import paginationCmp from '@/components/ui-components/pagination-cmp/pagination-cmp.vue'


import { auth } from '../../components/base/types/form'

export default defineComponent({
    setup() {
        const current_page = reactive({
            value: 1
        })

        const currentPage = (val: number) => {
            current_page.value = val

            console.log(current_page.value);
        }

        const pages = [
            {
                name: 'test'
            },
            {
                name: 'test'
            },
            {
                name: 'test'
            },
            {
                name: 'test'
            },
            {
                name: 'test'
            },
            {
                name: 'test'
            },
        ]

        const data_table = reactive(
        [
            {
                course: [
                    {
                        type: 'string',
                        id: 'date',
                        text: '31.05.2022'
                    },
                    {
                        type: 'link',
                        id: 'name',
                        text: 'Геологическое моделирование пласта'
                    },
                    {
                        type: 'string',
                        id: 'lang',
                        text: 'RU'
                    },
                    {
                        type: 'link',
                        id: 'status',
                        text: 'В разработке'
                    },
                    {
                        type: 'string',
                        id: 'email',
                        text: 'pochta@gmail.com'
                    },
                    {
                        type: 'string',
                        id: 'direct',
                        text: 'Геология, бурение'
                    },
                    {
                        type: 'string',
                        id: 'date_end',
                        text: '25.05.2023'
                    },
                ]
            },
            {
                course: [
                    {
                        type: 'string',
                        id: 'date',
                        text: '31.05.2022'
                    },
                    {
                        type: 'link',
                        id: 'name',
                        text: 'Геологическое моделирование пласта'
                    },
                    {
                        type: 'string',
                        id: 'lang',
                        text: 'RU'
                    },
                    {
                        type: 'link',
                        id: 'status',
                        text: 'На модерации'
                    },
                    {
                        type: 'string',
                        id: 'email',
                        text: 'pochta@mail.ru'
                    },
                    {
                        type: 'string',
                        id: 'direct',
                        text: 'Геология, бурение'
                    },
                    {
                        type: 'string',
                        id: 'date_end',
                        text: '25.05.2023'
                    },
                ]
            },
            {
                course: [
                    {
                        type: 'string',
                        id: 'date',
                        text: '31.05.2022'
                    },
                    {
                        type: 'link',
                        id: 'name',
                        text: 'Геологическое моделирование пласта'
                    },
                    {
                        type: 'string',
                        id: 'lang',
                        text: 'RU'
                    },
                    {
                        type: 'link',
                        id: 'status',
                        text: 'Опубликован'
                    },
                    {
                        type: 'string',
                        id: 'email',
                        text: 'pochta@ya.ru'
                    },
                    {
                        type: 'string',
                        id: 'direct',
                        text: 'Геология, бурение'
                    },
                    {
                        type: 'string',
                        id: 'date_end',
                        text: '25.05.2023'
                    },
                ]
            }
        ])

        const header_table = [
            {
                id: 'date',
                value: 'Дата посл.ред.'
            },
            {
                id: 'name',
                value: 'Название'
            },
            {
                id: 'lang',
                value: 'Язык'
            },
            {
                id: 'status',
                value: 'Статус'
            },
            {
                id: 'authors',
                value: 'Автор(ы)'
            },
            {
                id: 'direct',
                value: 'Направление'
            },
            {
                id: 'date_end',
                value: 'Дата окончания продажи'
            }
        ]

        const chips_list = reactive({
            list: [] as Array<[
                {
                    name: string,
                    count: number,
                }
            ]>
        })

        const sort_list = reactive([
            {
                id: 'date_edit_inc',
                text: 'По дате посл. редактирования (по возрастанию)'
            },
            {
                id: 'date_edit_dec',
                text: 'По дате посл. редактирования (по убыванию)'
            },
            {
                id: 'date_sells_inc',
                text: 'По дате окончания продажи (по возрастанию)'
            },
            {
                id: 'date__sells_dec',
                text: 'По дате окончания продажи (по убыванию)'
            }
        ])

        const active_sort = reactive({
            value: 'По дате посл. редактирования (по убыванию)',
            selector: false
        })

        const selector_filter = [
            {
                placeholder: 'Направление',
                checkbox: true,
                list: [
                    {
                        id: 1,
                        name: 'Геология'
                    },
                    {
                        id: 2,
                        name: 'Разработка'
                    },
                    {
                        id: 3,
                        name: 'Бурение'
                    },
                    {
                        id: 4,
                        name: 'Технология добычи'
                    },
                    {
                        id: 5,
                        name: 'Шельф'
                    },
                    {
                        id: 6,
                        name: 'Другое'
                    },
                ]
            },
            {
                placeholder: 'Статус',
                list: [
                    {
                        id: 1,
                        name: 'Все'
                    },
                    {
                        id: 2,
                        name: 'В разработке'
                    },
                    {
                        id: 3,
                        name: 'На модерации'
                    },
                    {
                        id: 4,
                        name: 'Опубликован'
                    },
                    {
                        id: 5,
                        name: 'Снят с продажи'
                    },
                    {
                        id: 6,
                        name: 'В архиве'
                    },
                ]
            },
            {
                placeholder: 'Язык',
                list: [
                    {
                        id: 1,
                        name: 'Все'
                    },
                    {
                        id: 2,
                        name: 'Русский'
                    },
                    {
                        id: 3,
                        name: 'Английский'
                    },
                ]
            }
        ]

        const open_sort_selector = (value: boolean) => {
            active_sort.selector = value
        }

        const select_sort = (sort_value: string) => {
            open_sort_selector(false)
            active_sort.value = sort_value
        }

        const search_form = {
            id: "search",
            value: "",
            type: "text",
            pattern: '^([a-z0-9]+(?:[._-][a-z0-9]{1,50})*)@([a-z0-9]{4,31}(?:[.-][a-z0-9]{4,31})*.[a-z]{2,4})$',
            label: "Поиск",
            error: ""
        } as auth
        
        axios
            .get('/api/counter.json')
            .then(response => {
                chips_list.list = response.data
            })
        
        const router = useRouter()

        watchEffect(() => {
            router.push({
                query: { 
                    current_page: current_page.value
                }
            }) 
        })

        const saveStateSelector = (params: any) => {
            router.push({
                query: {
                    direction: params
                }
            }) 
        }
        
        return {
            chips_list,
            search_form,
            selector_filter,
            active_sort,
            sort_list,
            select_sort,
            open_sort_selector,
            header_table,
            data_table,
            pages,
            currentPage,
            current_page,
            saveStateSelector
        }
    },  
    components: {
        'chips-cmp': chipsCmp,
        'input-cmp': inputCmp,
        'selector-cmp': selectorCmp,
        'btn-cmp': btnCmp,
        'table-cmp': tableCmp,
        'pagination-cmp': paginationCmp
    }
})
</script>