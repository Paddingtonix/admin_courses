import { defineStore } from 'pinia';
import axios from 'axios';
import type { IDirection } from '~/src/ts-interface/direction';
import { DirectionData } from "~/src/ts-interface/direction-data";

export const useDirectionStore = defineStore('directionStore', {
    state: () => ({
        directions: [] as IDirection[],
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
        addDirection(direction: Direction) {
            this.directions.push(direction);
        },
        createDirection(data: DirectionData) {
            console.log(data);

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
        removeDirection(id: string) {
            axios
                .delete(`admin/v1/Direction/${id}`)
                .then(() => {
                    this.getDirections()
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при удалении :(', error);
                });
        },
    },
});
