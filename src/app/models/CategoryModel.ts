import { IItem, ISlug } from "./IFaces";

export class CategoryModel  {
  id: number;
  name: string;
  parent: ISlug[];
  
  
  icon: string;
  position: number;
  items: IItem[];
  childrenCategory: CategoryModel[];

  constructor(data: any) {
    this.id = data?.id ? data.id : 0;
    this.name = data?.name ? data.name : "";
    this.icon = data?.icon ? data.icon : "";
    this.items = data?.items ? data.items : [];
    this.parent = data?.parent ? data.parent : [];
    this.position = data?.position ? data.position : 1;
    this.childrenCategory = data?.childrenCategory ? data.childrenCategory : [];
     
  }
 
public getParentId() {
  if(this.parent.length===0)return 0;
  return this.parent[this.parent.length-1].id 
}
 
  
}
export const createCategoryModel = (data: any) => {
  if (!data) return undefined;
  
  if (!data.name) return undefined;
  return new CategoryModel(data);
};