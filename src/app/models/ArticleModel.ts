export class ArticleModel {
  id: number;
  name: string;
  icon?: string;
  position?: number;
  nav: string;

  constructor(data: any) {
    this.id = data.id ? data.id : 0;
    this.name = data.name ? data.name : "";
    this.icon = data.icon ? data.icon : "";
    this.position = data.position ? data.position : 0;
    this.nav = data.nav ? data.nav : "OTHER";
    if (!this.id) this.id = 0;
  }
}

export class ArticleContentModel {
  id: number;
  content: string;
  title: string;
  article: ArticleModel;

  constructor(data: any) {

    this.article = new ArticleModel(data.article ? data.article : data);
    this.id = data.id ? data.id : 0;
    this.title = data.title ? data.title : "";
    this.content = data.content ? data.content : "";
    if (!this.id) this.id = 0;
  }

}

