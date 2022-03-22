

export interface IEntity {
    id: number;
    name: string;
    slug?: string;
    group?: string;
    icon?: string;
    parents: IEntity[];
}
export interface ICatalog extends IEntity {
    inner: IEntity[];
}
export interface IItem extends IEntity {
    price: number;
    caption: string;
    description: string;
    photo: string[];
    articular: string;
    message: string;
}


export interface IGroup extends IEntity {
    icon?: string;
    items?: IEntity[]

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