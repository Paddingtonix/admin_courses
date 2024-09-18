import axios, { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type {
    ICourseContent,
    ICourseContentQuestions,
    IDirection,
    IDirectionResponse,
    IGeneralCourseSettings,
    mappedDirections,
} from "../ts-interface/course-content";

export const useStoreCourseContent = defineStore("course-content", {
    state: () => ({
        courseId: 0,
        generalSettings: {} as IGeneralCourseSettings,
        directions: [] as IDirection[],
        questions: [] as ICourseContentQuestions[],
    }),
    actions: {
        async getDirections(courseId: number) {
            return axios
                .get(`admin/v1/Course/${courseId}`)
                .then((response) => {
                    const data = response.data as IDirectionResponse;
                    this.directions = data.Directions;
                })
                .catch((err) => {
                    console.warn(
                        "ошибка storeCourseContent, getDirections: ",
                        err
                    );
                });
        },

        getCourseContent(id: string) {
            return axios
                .get<ICourseContent>(`admin/v1/Testing/${id}`)
                .then((response) => {
                    const { data } = response;
                    this.courseId = data.courseId;
                    this.questions = data.questions;
                    this.generalSettings = {
                        title: data.title,
                        cutScorePercentages: data.cutScorePercentages,
                    };
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        patchCourseContent(
            id: string,
            formData: { title?: string; cutScorePercentages?: number }
        ) {
            return axios
                .patch(`admin/v1/Testing/${id}`, formData)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    return error;
                });
        },

        patchQuestion(formData: ICourseContentQuestions) {
            return axios
                .patch(`admin/v1/Question/${formData.id}`, formData)
                .then((response) => {
                    console.log("questionUpdated!", formData);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },

        addQuestion(testingId: number) {
            return axios
                .post("admin/v1/Question", { testingId })
                .then((response) => {
                    console.log(response);
                    return response;
                })
                .finally(() => {});
        },
    },
});
