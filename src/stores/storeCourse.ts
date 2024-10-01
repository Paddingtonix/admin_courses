import { defineStore } from "pinia";
import type { CourseList } from "~/src/ts-interface/course-list";
import axios from "axios";

enum langNames {
	"ru" = "Русский",
	"en" = "Аглийский",
	"test" = "Тестовский",
}

enum statusesNames {
	"InDevelopment" = "В разработке",
	"OnModeration" = "На модерации",
	"Published" = "Опубликован",
	"Withdrawn" = "Снаят с витрины",
	"Archived" = "Архивирован",
}

export const useStoreCourses = defineStore("courseState", {
	state: () => ({
		// CardInfo data
		price: "paid", //free
		// price: 'free', //free
		type: "synchronous", //asynchronous

		course_list: [] as CourseList[],
		course_info: [
			{ count: 0, text: "Всего" },
			{ count: 0, text: "В разработке" },
			{ count: 0, text: "На модерации" },
			{ count: 0, text: "Опубликован" },
			{ count: 0, text: "Снят с витрины" },
			{ count: 0, text: "В архиве" },
		],
		numberOfPages: null as number | null,
		currentPage: 1,
		nCoursesPerPage: 10,
		filters: {},
	}),
	actions: {
		getCourses(endpoint: string) {
			axios
				.get<{ courses: CourseList[]; numberOfPages: number }>(endpoint)
				.then((response) => {
					this.course_list = response.data.courses;
					this.$patch((state) => {
						state.numberOfPages = response.data.numberOfPages;
					});
					this.updateCourseInfo();
					console.log(response.data, "response.data course-id");
				})
				.catch((error) => {
					console.error(error);
				});
		},
		getFiters() {
			axios
				.get<{
					statuses: string[];
					languages: string[];
					directions: { id: number; name: string }[];
				}>("/admin/v1/Course/filters")
				.then(({ data }) => {
					this.filters = {
						Статус: data.statuses.map((item, id) => ({
							//@ts-ignore
							name: statusesNames[item],
							id: item,
						})),
						Язык: data.languages.map((item) => ({
							//@ts-ignore
							name: `${langNames[item]}(${item.toUpperCase()})`,
							id: item,
						})),
						Направления: data.directions,
					};
					console.log(this.filters);
				});
		},
		updateCourseInfo() {
			axios
				.get<{
					inDevelopment: number;
					onModeration: number;
					published: number;
					withdrawn: number;
					archieved: number;
				}>("/admin/v1/Course/statuses")
				.then((response) => {
					this.course_info.find(
						(element: { count: number; text: string }) =>
							element.text === "В разработке"
					)!.count = response.data.inDevelopment;
					this.course_info.find(
						(element: { count: number; text: string }) =>
							element.text === "На модерации"
					)!.count = response.data.onModeration;
					this.course_info.find(
						(element: { count: number; text: string }) =>
							element.text === "Опубликован"
					)!.count = response.data.published;
					this.course_info.find(
						(element: { count: number; text: string }) =>
							element.text === "Снят с витрины"
					)!.count = response.data.withdrawn;
					this.course_info.find(
						(element: { count: number; text: string }) =>
							element.text === "В архиве"
					)!.count = response.data.archieved;
					this.course_info.find(
						(element: { count: number; text: string }) =>
							element.text === "Всего"
					)!.count = Object.values(response.data).reduce(
						(sum: number, value: number) => sum + value,
						0
					);
				});
		},
		deleteCourse(id: number) {
			console.log("qwerty2");

			return axios.delete(`/admin/v1/Course/${id}`).then((resp) => {
				this.updateCourseInfo();
				return resp;
			});
		},
		changeCoursePerPage(value: number) {
			this.nCoursesPerPage = value;
		},
	},
});
