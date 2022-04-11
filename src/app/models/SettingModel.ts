import { ISlug } from "./IFases";

export class SettingModel {
   phoneNumber: number  ;
   appBarLinks: ISlug[]  ;
   footerLinks: ISlug[]  ;
   categoryLinks:ISlug[];


  public constructor(data: SettingModel) {
      this.phoneNumber= data.phoneNumber;
      this.appBarLinks= data.appBarLinks;
      this.footerLinks= data.footerLinks;
      this.categoryLinks=data.categoryLinks;
   }

}
