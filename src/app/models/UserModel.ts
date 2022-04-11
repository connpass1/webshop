import { CUSTOMER } from "../data";
export class UserModel {
  id?: number;
  name?: string;
  //password?: string;
  role?: string;
  token?: string;
  constructor(data: UserModel) {
    this.id = data.id;
    this.name = data.name;
    //this.password = data.password;
    this.role = data.role;
    this.token = data.token;
  }
}
export const saveToLocalStorage = (userModel: UserModel) => {
  localStorage.setItem(CUSTOMER, JSON.stringify(userModel));
};
export const initCustomer = () => {
  const it = localStorage.getItem(CUSTOMER);
  return new UserModel(it ? JSON.parse(it) : {});
};