import { defineStore } from "pinia"
import type { CourseList } from "~/src/ts-interface/course-list"
import axios from "axios"

export const useStoreCourses = defineStore('courseState', {
    state: () => ({
        // МОДАЛЬНЫЕ ОКНА
        // курс создан
        createCourse: false,
        // в разработке
        development: false,
        // на модерации
        moderation: false,
        // есть ошибка по дате
        oneError: false,
        // есть несколько ошибок
        someError: false,
        // опубликован
        published: false,
        // снят с витрины
        removed: false,
        // в архиве
        archived: false,
        // удаление курса
        deleteCourse: false,

        // CardInfo data
        price: 'paid', //free
        // price: 'free', //free
        type: 'synchronous', //asynchronous

        course_list: [] as CourseList[],
        course_info: [
            { count: 0, text: 'Всего' },
            { count: 0, text: 'В разработке' },
            { count: 0, text: 'На модерации' },
            { count: 0, text: 'Опубликован' },
            { count: 0, text: 'Снят с витрины' },
            { count: 0, text: 'В архиве' },
        ],

        status: '',
    }),
    actions: {
        getCourses() {
            axios
                .get<{ courses: CourseList[] }>('/admin/v1/Course')
                .then(response => {
                    this.course_list = response.data.courses
                    this.status = response.data.courses.status
                    this.status = this.course_list.length > 0 ? this.course_list[0].status : ''
                    this.updateCourseInfo()
                    console.log(response, 'storeCourse')
                })
                .catch(error => {
                    console.error(error)
                })
        },
        updateCourseInfo() {
            this.course_info[0].count = this.course_list.filter(el => el.status === 'All').length
            this.course_info[1].count = this.course_list.filter(el => el.status === 'InDevelopment').length
            this.course_info[2].count = this.course_list.filter(el => el.status === 'OnModeration').length
            this.course_info[3].count = this.course_list.filter(el => el.status === 'Published').length
            this.course_info[4].count = this.course_list.filter(el => el.status === 'Withdrawn').length
            this.course_info[5].count = this.course_list.filter(el => el.status === 'Archived').length
        }
    }
})