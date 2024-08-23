import type { IHeading } from "./storeTags.type";

export interface IStoreHeadings {
    headings: IHeading[];
    sortString: string;
    numberOfPages: number | null;
    currentPage: number;
    nHeadingsPerPage: number;
}
