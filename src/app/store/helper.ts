import {IFetchCustomer, IFetchItems} from "./Models";

function isObject(object: any) {
    return object!=null&&typeof object==='object';
}
export function isEqual(obj1: any, obj2: any) {
    var props1=Object.getOwnPropertyNames(obj1);
    var props2=Object.getOwnPropertyNames(obj2);
    if (props1.length!==props2.length) {
        return false;
    }
    for (var i=0;i<props1.length;i++) {
        let val1=obj1[props1[i]];
        let val2=obj2[props1[i]];
        let isObjects=isObject(val1)&&isObject(val2);
        if ((isObjects&&!isEqual(val1, val2))||(!isObjects&&val1!==val2)) {
            return false;
        }
    }
    return true;
}
export function getErrorStatus(e: any) {
    try {
        return e.response.status
    }
    catch (e) {return 500}
}
export const mapItems=(state: {itemReducer: IFetchItems}) => state.itemReducer;
export const mapProfile=(state: {profileReducer: IFetchCustomer}) => state.profileReducer;