import type { IHeading } from "./storeTags.type";

export interface IStoreHeadings {
	headings: IHeading[];
	numberOfPages: number | null;
	currentPage: number;
	nHeadingsPerPage: number;
}
