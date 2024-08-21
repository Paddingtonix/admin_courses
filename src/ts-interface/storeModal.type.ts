import type { StoreGeneric } from "pinia";
import type { IHeading, IResponseTags, ITags } from "./storeTags.type";

export interface IStoreModal {
    isOpen: boolean;
    activeModal: string;
    label: string;
    modalProps: {};
}

export interface IDeleteModal extends IStoreModal {
    modalProps: {
        data: { name: string; id: number };
        modalComponent: string;
        deleteFunction: (id: number) => Promise<void>;
    };
}

export interface IDeleteSection extends IStoreModal {
    modalProps: {
        data: IHeading;
        modalComponent: string;
        deleteFunction: (id: number) => Promise<void>;
        endpoint: string;
    };
}

export interface IDeleteTag extends IStoreModal {
    modalProps: {
        data: IResponseTags;
        modalComponent: string;
        // deleteFunction: (id: number) => Promise<void>;
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

export interface IFormTags extends IStoreModal {
    modalProps: {
        headers: IHeading[];
        tagForm?: ITags;
        isFormChanged: boolean;
    };
}
