import { IStoreModal } from "~/src/ts-interface/storeModal.type";

export interface IDirection {
    directionId: number,
    lastChangeDateTime?: string,
    localizedName: string,
    isVisible?: boolean,
    count?: number,
    localizations?: {
        en: string,
        ru: string,
        fr: string
    }
}

export interface ILocalizations {
    id?: number,
    isVisible?: boolean,
    localizations: {
        ru?: string,
        en?: string,
        fr?: string
    },
    description: {
        ru?: string,
        en?: string,
        fr?: string
    }
}
