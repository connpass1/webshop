import { ISlug } from "./IFases";

export class ArticleModel implements ISlug {
  id: number;
  name: string;
  icon?: string;
  title: string;
  content: string;
  position?: number;
  nav: string;

  constructor(data: any) {
    this.id = data.id ? data.id : 0;
    this.name = data.name;
    this.icon = data.icon;
    this.title = data.title;
    this.content = data.content;
    this.position = data.position ? data.position : 0;
    this.nav = data.nav ? data.nav : "OTHER";
  }
}


