import { initCustomer, UserModel } from "./UserModel";
export class ProfileModel {
  user: UserModel;
  id: number;
  address: string;
  email: string;
  phone: number;
  constructor(data: ProfileModel) {
    this.id = data.id;
    this.address = data.address ? data.address : "";
    this.email = data.email ? data.email : "";
    this.phone = data.phone ? data.phone : 777;
    this.user = initCustomer();
  }
}
