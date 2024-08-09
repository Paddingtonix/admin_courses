import { defineStore } from 'pinia';
import axios from 'axios';
import type { Direction } from '~/src/ts-interface/direction';
import { DirectionData } from "~/src/ts-interface/direction-data";

export const useDirectionStore = defineStore('directionStore', {
    state: () => ({
        directions: [] as Direction[],
    }),
    actions: {
        getDirections() {
            axios.get('admin/v1/Direction')
                .then(response => {
                    this.directions = response.data;
                    console.log('Направления добавились !)')
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при загрузке :(', error);
                });
        },
        addDirection(direction: Direction) {
            this.directions.push(direction);
        },
        createDirection(data: DirectionData) {
            axios.post('admin/v1/Direction', data)
                .then(response => {
                    this.getDirections();
                    console.log('Успешно добавил, хехе :)', response.data);
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при добавлении :(', error);
                });
        },
        removeDirection(id: string) {
            axios.delete(`admin/v1/Direction/${id}`)
                .then(() => {
                    this.getDirections()
                })
                .catch(error => {
                    console.error('Ууупс, ошибка при удалении :(', error);
                });
        },
    },
    getters: {
        filteredDirections: (state) => {
            return (searchQuery: string) => {
                return state.directions.filter(direction =>
                    direction.localizedName.toLowerCase().includes(searchQuery.toLowerCase())
                );
            };
        },
    },
});