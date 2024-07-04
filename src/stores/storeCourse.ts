import { defineStore } from 'pinia'

export const useStoreCourses = defineStore('courseState', {
    state: () => ({
        // курс создан
        createCourse: false,
        // в разработке
        development: false,
        // на модерации
        moderation: true,
        // есть ошибка по дате
        oneError: false,
        // есть несколько ошибок
        someError: false,
        // опубликован
        published: false,
        // снят с витрины
        removed: false,
        // в архивк
        archived: false,
        // удаление курса
        deleteCourse: false
    })
})
