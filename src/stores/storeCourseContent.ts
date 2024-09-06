import axios, { type AxiosResponse } from "axios";
import { defineStore } from "pinia";

interface IAnswer {
    id: number,
    text: string,
    isCorrectAnswer: boolean,
    directionId: number
}

interface IQuestion {
      id: number,
      correctAnswerScore: number,
      directionId: number,
      contentId: number,
      content: string,
      answers: IAnswer[]
}

interface IDirection {
    directionId: number,
    lastChangeDateTime: string,
    localizedName: string,
    isVisible: boolean,
    count: number
}

interface mappedDirections {
    id: number,
    name: string
}


interface IDirectionResponse {
        totalDirectionsCount: number,
        visibleDirectionsCount: number,
        directions: IDirection[]
    }

export const useStoreCourseContent = defineStore('course-content', {
    state: () => ({
        directions: [] as mappedDirections[],
        questions: [] as IQuestion[],

    }),
    actions: {
        async getDirections(){
            axios.interceptors.request.use(
                (request) => {
                    console.log('Блять, а они отправляются', request);
                    return request;
                },
                (error) => {
                    console.error('Ошибка ответа:', error);
                    return Promise.reject(error);
                }
            );
            return axios.get('admin/v1/Direction')
            .then((response) => {
                const data = response.data as IDirectionResponse;
                const filteredData = data.directions.map(direction => ({
                    id: direction.directionId,
                    name: direction.localizedName,
                }));

               this.directions = filteredData;
               
            }).catch(err => {
                console.warn('ошибка storeCourseContent, getDirections: ', err);
            })
        }
    },
})
