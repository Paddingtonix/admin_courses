import axios from "axios";
import type { IStoreHeaders } from "../ts-interface/storeTags.type";
import type { IStoreHeadings } from "../ts-interface/storeSections.type";

export const useHeadersStore = defineStore({
	id: "headersStore",
	state: (): IStoreHeadings => ({
		headings: [],
		sortString: "",
		numberOfPages: null,
		currentPage: 1,
		nHeadingsPerPage: 10,
	}),

	actions: {
		getHeadings({ text = "" }) {
			return axios
				.get(
					`/admin/v1/heading?page=${this.currentPage}&nHeadingsPerPage=${this.nHeadingsPerPage}&searchSubstring=${text}${this.sortString}`
				)
				.then((response) => {
					const data = response.data as IStoreHeaders;
					this.$patch((state) => {
						state.headings = data.headings;
						state.numberOfPages = data.numberOfPages;
					});
				})
				.catch((error) => {
					console.warn(error);
				})
				.finally(() => {
					// TODO: ADD_LOADER
				});
		},

		postHeading(formData: { name: string; description: string }) {
			return axios
				.post("admin/v1/heading", formData)
				.then(() => {
					return this.getHeadings({});
				})
				.catch((error) => {
					throw error;
				})
				.finally(() => {
					// TODO: ADD_LOADER
				});
		},

		deleteItem(id: number) {
			return axios
				.delete(`admin/v1/heading/${id}?force=True`)
				.then((response) => {
					this.getHeadings({});
					return response;
				})
				.catch((error) => {
					console.error("Ошибка при удалении раздела:", error);
					throw error;
				})
				.finally(() => {
					// TODO: ADD_LOADER
				});
		},
		searchHeading(text: string) {
			axios
				.get(`/admin/v1/heading?searchSubstring="${text}"`)
				.then((response) => {
					const data = response.data as IStoreHeaders;
					this.$patch((state) => {
						state.headings = data.headings;
						state.numberOfPages = data.numberOfPages;
					});
				})
				.catch((error) => {
					console.warn(error);
				})
				.finally(() => {
					// TODO: ADD_LOADER
				});
		},
		setSort(sortString: string) {
			this.sortString = sortString;
			return this.getHeadings({});
		},
		patchHeading({
			name,
			description,
			id,
		}: {
			name: string;
			description: string;
			id: number;
		}) {
			return axios
				.patch(`/admin/v1/heading/${id}`, {
					name,
					description,
				})
				.then((response) => {
					this.getHeadings({});
					return response;
				})
				.catch((err) => {
					throw err;
				});
		},
	},
});
