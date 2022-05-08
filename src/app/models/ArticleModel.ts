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
 

