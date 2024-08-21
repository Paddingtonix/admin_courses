import axios from "axios";
import { defineStore } from "pinia";
import type {
    IHeading,
    IResponseTags,
    IStoreHeaders,
    IStoreTags,
    ITags,
} from "../ts-interface/storeTags.type";

export const useTagsStore = defineStore({
    id: "tagsStore",
    state: (): IStoreTags => ({
        headings: [] as IHeading[],
        tags: [] as IResponseTags[],
        numberOfPages: 1,
        currentPage: 1,
        nLabelsPerPage: 10,
        isTranslated: null,
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
        async getTags({ text = "" }) {
            const translated =
                this.isTranslated !== null
                    ? `isTranslated=${this.isTranslated}&`
                    : "";
            return axios
                .get(
                    `/admin/v1/label?${translated}page=${this.currentPage}&nLabelsPerPage=${this.nLabelsPerPage}&searchSubstring=${text}`
                )
                .then((response) => {
                    const data = response.data;
                    console.log(response);

                    this.tags = data.labels as IResponseTags[];
                    this.numberOfPages = data.numberOfPages;
                })
                .catch((error) => {
                    console.warn(error);
                })
                .finally
                // TODO: ADD_LOADER
                ();
        },
        async postTag(tagData: ITags) {
            return axios.post("admin/v1/label/", tagData).then((resp) => {
                this.getTags({});
                return resp;
            });
        },

        deleteTag(id: number) {
            return axios.delete(`admin/v1/label/${id}`).then((resp) => {
                this.getTags({});
                return resp;
            });
        },

        changeTagsPerPage(value: number) {
            this.nLabelsPerPage = value;
        },

        changePageTags(val: number) {
            this.currentPage = val;
        },
    },
});
