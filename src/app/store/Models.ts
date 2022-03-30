

export interface IEntity {
    id: number;
    name: string;
    icon?: string;
    parent: IEntity;

}

export interface IItem extends IEntity {
    price: number;
    title: string;
    itemDetail: IItemDetail;
    caption: string;
    description: string;

}

export interface Photo {

    id: number;
    url: string;
    alt?: string;
    thumbnail: string;

}export interface IItemProperty {
    id: number;
    name: string;
    property: string;
}
export interface IItemDetail {
    id: number;
    amount: number;
    caption: string;
    description: string;
    photos: Photo;
    properties: IItemProperty;

}
export interface ICatalog extends IEntity {
    childrenCategory: IEntity[];
}
export interface IPage {
    content: IItem[];
    number: number;
    totalPages: number;
    totalElements: number;
}


export interface IFetchCustomer {

    fetching?: boolean;
    Customer: ICustomer;
    errorFetching?: string;

}

export interface ICustomer {
    id: number;
    name: string;
    email?: string;
    phone?: number;
    avatar?: string;
    address?: string;
}
export interface IFetchItems {
    fetching?: boolean;
    items?: IEntity;
    errorFetching?: string;
}