export interface IStateItems {
    fetchingItems?: boolean;
    items?: IEntity[];
    errorFetchingItems?: any
}
export interface IEntity {
    id: number;
    name: string;
    slug?: string;
    group?: string;
}
export interface IItem extends IEntity {
    price: number;
    caption: string;
    description: string;
    photo: string[];
    articular: string;
    message?: string;
}


export interface IGroup extends IEntity {
    icon?: string;
    items?: IEntity[]

}

export interface IStateCustomer {
    fetchingCustomer?: boolean;
    Customer?: ICustomer;
    errorFetchingCustomer?: any
}export interface ICustomer {
    id: number;
    name: string;
    age: number;
}
