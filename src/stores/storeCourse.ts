import { defineStore } from 'pinia'

export const useStoreCourses = defineStore('courseState', {
    state: () => ({
        // МОДАЛЬНЫЕ ОКНА
        // курс создан
        createCourse: true,
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
        // price: 'paid', //free
        price: 'free', //free
        type: 'synchronous', //asynchronous

    })
})
