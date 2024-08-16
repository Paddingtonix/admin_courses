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
    headingId: number | null;
    headingName: string;
    name: string;
    localizations: {
        [key: string]: string;
    };
}
