import { IStoreModal } from "~/src/ts-interface/storeModal.type";

export interface IDirection {
    directionId: number,
    lastChangeDateTime?: string,
    localizedName: string,
    isVisible?: boolean,
    count?: number
}
