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
                    this.status = this.course_list.length ? this.course_list[0].status : ''
                    this.updateCourseInfo()
                    console.log(response.data.courses, 'response.data.courses');
                })
                .catch(error => {
                    console.error(error)
                })
        },
        updateCourseInfo() {
            axios
                .get<{ inDevelopment: number, onModeration: number, published: number, withdrawn: number, archieved: number }>('/admin/v1/Course/statuses')
                .then((response) => {
                    this.course_info.find((element: { count: number, text: string }) => element.text === 'В разработке')!.count = response.data.inDevelopment
                    this.course_info.find((element: { count: number, text: string }) => element.text === 'На модерации')!.count = response.data.onModeration
                    this.course_info.find((element: { count: number, text: string }) => element.text === 'Опубликован')!.count = response.data.published
                    this.course_info.find((element: { count: number, text: string }) => element.text === 'Снят с витрины')!.count = response.data.withdrawn
                    this.course_info.find((element: { count: number, text: string }) => element.text === 'В архиве')!.count = response.data.archieved
                    this.course_info.find((element: { count: number, text: string }) => element.text === 'Всего')!.count = Object.values(response.data).reduce((sum: number, value: number) => sum + value, 0)
                })
        }
    }
})