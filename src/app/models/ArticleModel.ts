export class ArticleModel {
  id: number;
  name: string;
  icon?: string;
  position?: number;
  nav: string;
  content?: string;
  title?: string;
  constructor(data: any) {
    this.id = data?.id ? data.id : 0;
    this.name = data?.name ? data.name : "";
    this.icon = data?.icon ? data.icon : "";
    this.position = data?.position ? data.position : 0;
    this.nav = data?.nav ? data.nav : "OTHER";
    this.title = data?.title ? data.title : "";
    this.content = data?.content ? data.content : "";
    if (!this.id) this.id = 0;
  }
}
export const createArticleModel = (data: any) => {
  if (!data) return undefined; 
 
  if (!data.nav) return undefined;
  return new ArticleModel(data);
};

export const createArticleModelList = (data: any) => {
 
    if (!data) return undefined; 
  if (!Array.isArray(data)) return null;
  const arr:ArticleModel[]=[]
  for (let i=0; i<data.length; i++)
  {
     const article=createArticleModel(data[i])
    if (!article) return undefined; 
    arr.push(article)
  }
  
  return  arr;
};