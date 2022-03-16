export interface IStateItems {
    fetchingItems?: boolean;
    items?: ILink[];
    errorFetchingItems?: any
}
export interface IStatePerson {
    fetchingPerson?: boolean;
    person?: IPersonDto;
    errorFetchingPerson?: any
}export interface IPersonDto {
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