import type { IStoreModal } from "./storeModal.type";

export interface IHeading {
    id: number;
    name: string;
    description: string;
    labelsCount: number;
}

export interface IStoreHeaders {
    headings: IHeading[];
    numberOfPages: number;
}

export interface ITags {
    id: number;
    headingId: number | null;
    headingName: string;
    isTranslated: boolean | null;
    name: string;
    localizations: {
        ru: string;
        [key: string]: string;
    };
}

export interface IFiltersTagsResponse {
    languages: { name: string; id: string | number }[];
    headings: { name: string; id: string | number }[];
}

export interface IResponseTags {
    headingId: number;
    headingName: string;
    id: number;
    isTranslated: boolean;
    localizationRu: string;
    name: string;
}

export interface IStoreTags {
    headings: IHeading[];
    searchValue: string;
    tags: ITags[];
    numberOfPages: number;
    currentPage: number;
    sortString: string;
    nLabelsPerPage: number;
    isTranslated: boolean | null;
    filters: IFiltersTagsResponse;
}
