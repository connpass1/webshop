import { IEntity, IItem } from "./IFases";

export class CategoryModel implements IEntity {
  id: number;
  name: string;
  parent: string;
  
  
  icon: string;
  position: number;
  items: IItem[];
  childrenCategory: CategoryModel[];

  constructor(data: any) {
    this.id = data?.id ? data.id : 0;
    this.name = data?.name ? data.name : "";
    this.icon = data?.icon ? data.icon : "";
    this.items = data?.items ? data.items : [];
    this.parent = data?.parent ? data.parent : undefined;
    this.position = data?.position ? data.position : 1;
    this.childrenCategory = data?.childrenCategory ? data.childrenCategory : [];
     
  }
 
  
  public getParent() {
     
    if (this.parent) {
      const s = this.parent.split("$");
      const arr=s[s.length - 1].split("@")
      return {id:Number(arr[1]),name:arr[0],icon:arr[2]};
      
    }
    else return {id:0,name:"",icon:""};
  
  }
}
