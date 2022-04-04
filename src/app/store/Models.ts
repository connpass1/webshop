
export interface IEntity {
    id: number;
    name: string;
    icon?: string;
    parent: IEntity;
}

export interface IItem extends IEntity {
    price: number;
    quantity: number;
    itemDetail: IItemDetail;
    checked: boolean;
}
export interface IOrderItem {
    item: IItem;
    quantity: number;
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
interface IFetch {
    fetching: boolean;
    errorFetching: number;
}
export interface IFetchCustomer extends IFetch {

    customer: ICustomer;

}


export interface ICustomer {
    id?: number;
    name?: string;
    profile_id?: number;
    password?: string;
    role?: string;

}


export interface IFetchMessage extends IFetch {
    message: string;
}
export interface IFetchCart {
    cart: IItem[];
}
