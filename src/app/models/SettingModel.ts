import { ISlug } from "./IFases";

export class SettingModel {
  phoneNumber: number;
  appBarLinks: ISlug[];
  footerLinks: ISlug[];
  categoryLinks: ISlug[];


  public constructor(data: SettingModel) {
    this.phoneNumber = data.phoneNumber;
    this.appBarLinks = data.appBarLinks;
    this.footerLinks = data.footerLinks;
    this.categoryLinks = data.categoryLinks;
  }
}

export const dataSettingModel: SettingModel = {
  phoneNumber: 1234567890,
  appBarLinks: [
    { name: "Контакты", id: 1 },
    { name: "Доставка", id: 2 },
    { name: "Гарантия", id: 3 }],
  footerLinks: [
    { name: "О нас", id: 4 },
    { name: "Вакансии", id: 5 },
    { name: "О нас", id: 6 },
    { name: "Вакансии", id: 7 },
    { name: "О нас", id: 8 },
    { name: "Вакансии", id: 9 },
    { name: "О нас", id: 19 },
    { name: "Вакансии", id: 11 },
    { name: "Новости", id: 12 }],
  categoryLinks: [
    { id: 13, name: "Категория a 1" },
    { id: 24, name: "Категория a 2" },
    { id: 79, name: "Категория a 7" },
    { id: 90, name: "Категория a 8" },
    { id: 68, name: "Категория a 6" },
    { id: 46, name: "Категория a 4 " }

  ]
};
export const testInit = new SettingModel(dataSettingModel);

