<template>
    <div class="admin-course-id oilcase__container">
        <h1 class="admin-course-id__title">Содержание курса ({{ course_lang }})</h1>
        <tabs-cmp 
            :tabs="tabs"
            :id="tab_id.value"
            @select="setTabId"
        />
        <general-setting v-if="tab_id.value === 1" :params="params_course" :directions="general_params.directions"/>
        <info-setting v-if="tab_id.value === 2" :params="params_course"/>
        <content-setting v-if="tab_id.value === 3" :params="params_course" />
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import generalSetting from '../../../components/blocks/admin_setting/general-setting/general-setting.vue'
import infoSetting from '../../../components/blocks/admin_setting/info-setting/info-setting.vue'
import contentSetting from '../../../components/blocks/admin_setting/content-setting/content-setting.vue'
import tabsCmp from '../../../components/ui-components/tabs-cmp/tabs-cmp.vue'

import axios from 'axios'

export default defineComponent({
    setup() {
        const course_lang = 'RU'

        const tabs = 
        [
            {
                name: 'Общие настройки курса',
                id: 1
            },
            {
                name: 'Информация о курсе',
                id: 2
            },
            {
                name: 'Содержание',
                id: 3
            }
        ]

        const tab_id = reactive({
            value: 1 as number
        })

        const setTabId = (val: number) => {
            tab_id.value = val
        }


        const emails = reactive([
            {
                id: 1,
                text: 'pochta1'
            },
            {
                id: 2,
                text: 'pochta2'
            },
            {
                id: 3,
                text: 'pochta3'
            },
            {
                id: 4,
                text: 'pochta4'
            },
            {
                id: 5,
                text: 'pochta5'
            },
            {
                id: 5,
                text: 'pochta6'
            },
        ])

        const course_setting = reactive({
            authors: [
                {
                    email: ''
                }
            ],
            price: '',
            date_end: '',
            hourse: '',
            days: '',
            dates: {
                start: '',
                end: ''
            },
            direction: '',
            course_info: [
                {
                    title: 'Название',
                    label: 'Новый курс по геологии',
                    text: 'Текст'
                },
                {
                    title: 'Авторы',
                    label: 'Если авторов больше одного, перечислите ФИО через запятую',
                    text: ''
                },
                {
                    title: 'Описание',
                    label: 'Краткое описание курса',
                    text: ''
                },
                {
                    title: 'Целевая аудитория',
                    label: 'На кого рассчитан курс',
                    text: ''
                },
                {
                    title: 'Методика обучения',
                    label: 'Описание инструментов обучения',
                    text: ''
                },
                {
                    title: 'Результаты обучения',
                    label: 'Описание результатов обучения с помощью глаголов из таксономии Блума',
                    text: ''
                }
            ]
        })


        const selectedColor = ref('blue');


            
        const selector_filter = [
            {
                placeholder: 'Направление',
                type: 'direaction',
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
        ]


        /////////////////////integration

        const endpoints = reactive([
            'http://192.168.19.204:8080/admin/v1/course/filters',
            'http://192.168.19.204:8080/admin/v1/course/1',
            'http://192.168.19.204:8080/admin/v1/course/1/info',
            'http://192.168.19.204:8080/admin/v1/course/1/content'
        ])

        const filters = reactive({
            direction: [] as Array<{
                direaction_id: number,
                direction_name: string,
            }>
        })

        const params_course = reactive({
            settings:  [
                {
                    title: 'Тип' as string,
                    count: '' as string,
                },
                {
                    title: 'Формат' as string,
                    count: '' as string,
                },
                {
                    title: 'Приобретение' as string,
                    count: '' as string,
                },
                {
                    title: 'Доступ' as string,
                    count: '' as string,
                },
            ],
            authors: [] as Array<[string]> | null,
            price_in_rubles: 0 as number,
            duration_academic_hours: 0 as number | null,
            sales_termination_date: 0 as number,
            directions: [] as Array<{
                direction_id: number, 
                direction_name: string
            }>,
            name: '',
            teachers: '',
            description_course: '',
            target_audience: '',
            education_methods: '',
            education_results: '',
            final_page: {},
            final_testing: {},
            initial_page: {},
            initial_testing: '',
            parts: []
        })

        const general_params = reactive({
            directions: [] as Array<{}>
        })


        axios.all(endpoints.map((endpoint) => 
            axios
                .get(endpoint)))
                .then(axios.spread((filters_response, general_response, info_response, content_response) => {
                    filters.direction = filters_response.data.directions
                    //general
                    params_course.settings[0].count = general_response.data.course_format
                    params_course.settings[1].count = general_response.data.course_type
                    params_course.settings[2].count = general_response.data.is_free ? 'Бесплатно' : 'Платно'
                    params_course.settings[3].count = general_response.data.is_partial_available ? 'Частичный' : 'Полный'
                    params_course.authors = general_response.data.author_emails
                    params_course.price_in_rubles = general_response.data.price_in_rubles
                    params_course.duration_academic_hours = general_response.data.duration_academic_hours
                    params_course.sales_termination_date = general_response.data.sales_termination_date
                    params_course.directions = general_response.data.directions

                    general_params.directions = filters_response.data.directions

                    //info
                    params_course.name = info_response.data.title
                    params_course.teachers = info_response.data.authors
                    params_course.description_course = info_response.data.description
                    params_course.target_audience = info_response.data.target_audience
                    params_course.education_results = info_response.data.education_results

                    //content
                    params_course.initial_page = content_response.data.initial_page
                    params_course.initial_testing = content_response.data.initial_testing
                    params_course.parts = content_response.data.parts
                }))
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {})

        ////////////////////////////////
        // const addBlock = (type: string, idx: number, chapter_idx: number, section_idx: number) => {   
        //     console.log(section_idx);
                     
        //     if(type === 'part') {                                
        //         content.part.push(
        //             {
        //                 title: 'Часть 1',
        //                 chapter: [
        //                     {
        //                         title: 'Глава 11',
        //                         test: 'test 11',
        //                         section: [
        //                             {
        //                                 title: 'Раздел 111'
        //                             }
        //                         ]
        //                     }
        //                 ]  
        //             })
                
        //     } else if(type === 'chapter') {
        //         content.part[idx].chapter.push(
        //             {
        //                 title: 'Глава 11',
        //                 test: 'test 11',
        //                 section: [
        //                     {
        //                         title: 'Раздел 111'
        //                     }
        //                 ]
        //             })                
        //     } else {
        //         content.part[idx].chapter[chapter_idx].section.push({
        //             title: 'Раздел 111'
        //         })
        //     }
        // }    

        return {
            course_lang,
            tabs,
            setTabId,
            tab_id,
            course_setting,
            emails,
            selectedColor,
            selector_filter,

            filters,
            params_course,
            general_params
        }
    },
    components: {
        'tabs-cmp': tabsCmp,
        'general-setting': generalSetting,
        'info-setting': infoSetting,
        'content-setting': contentSetting,
    }
})
</script>