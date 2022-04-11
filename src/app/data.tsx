export const webMenu = [
  { txt: "test", link: "/test" },
  { txt: "Контакты", link: "/contacts" },
  { txt: "Доставка", link: "/cargo" },
  { txt: "Гарантия", link: "/warranty" },
];
export const footerLinks = [
  { txt: "main", link: "/" },
  { txt: "test", link: "/test" },
  { txt: "order", link: "/order" },
];


export const SERVERNAME = "http://192.168.1.125:8080";
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