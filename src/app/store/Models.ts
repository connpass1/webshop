
export interface   IEntity extends ISlug{
    parent: string;
}
export interface ISlug {
    id: number;
    name: string;
    icon?: string;
}
export interface IItem extends IEntity {
    price: number;
    quantity: number;
    itemDetailId: number;
    checked: boolean;
}
export interface IItemProperty {
    id: number;
    name: string;
    property: string;
}
export interface IItemDetail {
    item: IItem;
    id: number;
    amount: number;
    caption: string;
    description: string;
    photos: string[];
    properties: IItemProperty;

}
export interface ICatalog extends IEntity {
    childrenCategory: IEntity[];
    items: IItem[];
}
export interface IPage {
    content: IItem[];
    number: number;
    totalPages: number;
    totalElements: number;
}
interface IFetch {
    status: number;
}
export interface IFetchCustomer extends IFetch {
    customer: ICustomer;
}

export interface IFetchContent extends IFetch {
    content:  any;
}
export interface ICustomer {
    id?: number;
    name?: string;
    password?: string;
    role?: string;
}
export interface IProfile {
    user: ICustomer;
    id:number;
    address:string;
    email:string;
    phone: number;
}

export interface IFetchMessage extends IFetch {
    message: string;
}
export interface IFetchCart extends IFetch {
    cart: IItem[];
}
