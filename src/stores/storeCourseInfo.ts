import { defineStore } from "pinia";
import type { ICourseInfo } from "~/src/ts-interface/course-info";
import axios from "axios";

export const useCourseInfo = defineStore("course-content", {
    state: () => ({
        course_info: {} as ICourseInfo,
    }),
    actions: {
        getCourseInfo(id: number) {
            axios
                .get(`admin/v1/Course/${id}/info`)
                .then(response => {
                    this.course_info = response.data;

                    console.log('Информация о курсе', response.data)
                })
                .catch(error => {
                    console.error('Ошибка при получении информации о курсе', error)
                })
        },
        patchCourseInfo(id: number) {
            axios
                .patch(`admin/v1/Course/${id}/info`)
                .then(response => {
                    this.getCourseInfo();

                    console.log('Редактирование прошло успешно', response.data);
                })
                .catch(error => {
                    console.error('Произошла ошибка при редактирвоании', error)
                })
        },
    }
})