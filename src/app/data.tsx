export const webMenu = [
  { name: "test", link: "/page/test" },
  { name: "Контакты", link: "/page/contacts" },
  { name: "Доставка", link: "/page/cargo" },
  { name: "Гарантия", link: "/page/warranty" }
];
export const footerLinks = [
  { name: "main", link: "/" },

  { name: "order", link: "/order" }
];
export const SERVERNAME = "http://192.168.1.125:8080";
export const TokenPREFIX = "WebShop";
export const HeaderString = "Authorization";
export const CUSTOMER = "customer";
export const footerMessage = "footer Message";
export const phoneNumber = "111111111";
export const getMessage = (status: number) => {
  switch (status) {
    case 400:
      return "Контент не найден";
    case 423:
      return "логин занят";
    case 401:
      return "неверные логин и(или) пароль";
    case 404:
      return "контент не найден";
    case 422:
      return "ошибка данных";
    case 500:
      return "сервер недоступен";
    default:
      return "ошибка " + status;
  }
};