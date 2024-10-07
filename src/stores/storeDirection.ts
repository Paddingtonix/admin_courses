import { defineStore } from 'pinia';
import axios from 'axios';
import type { IDirection } from '~/src/ts-interface/direction';
// import { DirectionData } from "~/src/ts-interface/direction-data";

export const useDirectionStore = defineStore('directionStore', {
    state: () => ({
        // directions: [] as IDirection[],
        directions: [] as any,
        localizations: [] as any
    }),
    actions: {
        getDirections() {
            axios
                .get('admin/v1/Direction')
                .then(response => {
                    this.directions = response.data;

                    console.log('Направления добавились !)', response.data)
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при загрузке :(', error);
                });
        },
        getLocalizations(id: number) {
            axios
                .get(`admin/v1/Direction/${id}`)
                .then(response => {
                    this.localizations = response.data;

                    console.log('Локализации получены', response.data)
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при получении локализаций', error);
                });
        },
        createDirection(data: DirectionData) {

            axios
                .post('admin/v1/Direction', data)
                .then(response => {
                    this.getDirections();
                    console.log('Успешно добавил, хехе :)', response.data);
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при добавлении :(', error);
                });
        },
        changeDirection(id: string, data: DirectionData) {
            axios
                .patch(`admin/v1/Direction/${id}`, data)
                .then(response => {
                    this.getDirections();
                    console.log('Успешно изменил, хехе :)', response.data);
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при изменении :(', error);
                });
        },
        removeDirection(id: string) {
            return axios
                .delete(`admin/v1/Direction/${id}`)
                .then((response) => {
                    this.getDirections()
                    return response
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при удалении :(', error);
                });
        },
    },
});
