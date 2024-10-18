import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import type { IDirection } from "~/src/ts-interface/direction";
import { ILocalizations } from "~/src/ts-interface/direction";
// import { DirectionData } from "~/src/ts-interface/direction-data";

export const useDirectionStore = defineStore("directionStore", {
	state: () => ({
		// directions: [] as IDirection[],
		directions: [] as any,
		localizations: [] as ILocalizations[],
	}),
	actions: {
		getDirections() {
			axios
				.get("admin/v1/Direction")
				.then((response) => {
					this.directions = response.data;

					console.log("Направления добавились !)", response.data);
				})
				.catch((error) => {
					console.error("Ууупс, ошибка при загрузке :(", error);
				});
		},
		getLocalizations(id: number) {
			axios
				.get(`admin/v1/Direction/${id}`)
				.then((response) => {
					this.localizations = response.data;

					console.log("Локализации получены", response.data);
				})
				.catch((error) => {
					console.error(
						"Ууупс, ошибка при получении локализаций",
						error
					);
				});
		},
		createDirection(data: DirectionData) {
			return axios
				.post("admin/v1/Direction", data)
				.then((response) => {
					this.getDirections();
					return response;
				})
				.catch((error) => {
					throw error as AxiosError;
				});
		},
		changeDirection(id: string, data: ILocalizations) {
			return axios
				.patch(`admin/v1/Direction/${id}`, data)
				.then((response) => {
					this.getDirections();
					return response;
				});
		},
		removeDirection(id: string) {
			return axios
				.delete(`admin/v1/Direction/${id}`)
				.then((response) => {
					this.getDirections();
					return response;
				})
				.catch((error) => {
					console.error("Ууупс, ошибка при удалении :(", error);
				});
		},
	},
});
