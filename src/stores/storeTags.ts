import axios from "axios";
import { defineStore } from "pinia";
import type { IHeading, IStoreHeaders } from "../ts-interface/storeTags.type";

export const useTagsStore = defineStore({
    id: "tagsStore",
    state: () => ({
        headings: [] as IHeading[],
        tags: [],
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
    },
});
