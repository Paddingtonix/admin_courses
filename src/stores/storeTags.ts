import axios from "axios";
import { defineStore } from "pinia";
import type {
	IHeading,
	IStoreHeaders,
	ITags,
} from "../ts-interface/storeTags.type";

export const useTagsStore = defineStore({
	id: "tagsStore",
	state: () => ({
		headings: [] as IHeading[],
		tags: [],
		numberOfPages: 1,
		currentPage: 1,
	}),
	actions: {
		async getAllHeadings() {
			return axios
				.get("/admin/v1/heading?nHeadingsPerPage=99999")
				.then((response) => {
					const tags = response.data as IStoreHeaders;
					this.headings = tags.headings;
				})
				.catch((error) => {
					console.warn(error);
				})
				.finally
				// TODO: ADD_LOADER
				();
		},
		async postTag(tagData: ITags) {
			return axios.post("admin/v1/label/", tagData);
		},
	},
});
