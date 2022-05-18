export class ProfileModel { 
  id: number;
  address: string;
  name: string;
  email?: string;
  phone?: number;

  constructor(data: ProfileModel) {
    this.name = data.name;
    this.id = data.id ? data.id : 0;
    this.address = data.address ? data.address : "";
    this.email = data.email ? data.email : "";
    this.phone = data.phone ? data.phone : undefined; 
  }
}
