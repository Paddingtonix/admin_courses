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
    name: string;
    localizations: {
        ru: string;
        [key: string]: string;
    };
}

export interface IResponseTags {
    headingId: number;
    headingName: string;
    id: number;
    isTranslated: boolean;
    localizationRu: string;
    name: string;
}
