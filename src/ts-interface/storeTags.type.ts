import type { IStoreModal } from "./storeModal.type";

export interface IHeading {
	id: number;
	name: string;
	description: string;
	labelsCount: number;
}

export interface IStoreTags {
	headings: IHeading[];
	numberOfPages: number;
}
