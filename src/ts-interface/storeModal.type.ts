import type { StoreGeneric } from "pinia";
import type { IHeading } from "./storeTags.type";

export interface IStoreModal {
	isOpen: boolean;
	activeModal: string;
	label: string;
	modalProps: {};
}
export interface IDeleteSection extends IStoreModal {
	modalProps: {
		data: IHeading;
		modalComponent: string;
		deleteFunction: (id: number) => Promise<void>;
		endpoint: string;
	};
}

export interface IFormSection extends IStoreModal {
	modalProps: {
		name: string;
		description: string;
		edit: boolean;
		id: number;
		isFieldChanged: boolean;
	};
}
