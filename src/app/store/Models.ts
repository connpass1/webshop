export interface IStateItems {
    fetchingItems?: boolean;
    items?: ILink[];
    errorFetchingItems?: any
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
export interface ILink {
    id: number;
    txt: string;
    link: string;
    icon?: string;
}