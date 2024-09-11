import axios, { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type {
	ICourseContent,
	ICourseContentQuestions,
	IDirectionResponse,
	IGeneralCourseSettings,
	mappedDirections,
} from "../ts-interface/course-content";

export const useStoreCourseContent = defineStore("course-content", {
	state: () => ({
		generalSettings: {} as IGeneralCourseSettings,
		directions: [] as mappedDirections[],
		questions: [] as ICourseContentQuestions[],
	}),
	actions: {
		async getDirections() {
			return axios
				.get("admin/v1/Direction")
				.then((response) => {
					const data = response.data as IDirectionResponse;
					const filteredData = data.directions.map((direction) => ({
						id: direction.directionId,
						name: direction.localizedName,
					}));

					this.directions = filteredData;
				})
				.catch((err) => {
					console.warn(
						"ошибка storeCourseContent, getDirections: ",
						err
					);
				})
				.finally(() => {});
		},

		getCourseContent(id: number) {
			return axios
				.get<ICourseContent>(`admin/v1/Testing/${id}`)
				.then((response) => {
					const { data } = response;
					this.questions = data.questions;
					this.generalSettings = {
						title: data.title,
						cutScorePercentages: data.cutScorePercentages,
					};
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {});
		},
	},
});
