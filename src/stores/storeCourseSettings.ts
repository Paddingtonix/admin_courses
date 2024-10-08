import axios from "axios";
import { defineStore } from "pinia";

interface ICourseSettings {
	Title: string;
	CourseType: string;
	CourseFormat: string;
	PriceInRubles: number;
	IsPartialAvailable: boolean;
	IsFree: boolean;
	DurationAcademicHours: number;
	DurationWorkDays: number;
	DateStart: string;
	DateFinish: string;
	SalesTerminationDate: string;
}

export const useMyStoreCourseSettingsStore = defineStore({
	id: "storeCourseSettings",
	state: (): ICourseSettings => ({
		Title: "",
		CourseType: "",
		CourseFormat: "",
		PriceInRubles: 0,
		IsPartialAvailable: false,
		IsFree: false,
		DurationAcademicHours: 0,
		DurationWorkDays: 0,
		DateStart: "",
		DateFinish: "",
		SalesTerminationDate: "",
	}),
	actions: {
		async getCourseSetting(courseId: string) {
			return await axios
				.get<ICourseSettings>(`/admin/v1/Course/${courseId}`)
				.then((response) => {
					this.$patch(response.data);
					return response;
				})
				.catch((err) => {
					throw err;
				});
		},
	},
});
