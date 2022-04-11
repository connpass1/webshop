import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("renders with or without a name", () => {
  act(() => {
    render(<p>Hey, stranger</p>, container);
  });
  expect(container.textContent).toBe("Hey, stranger");
  act(() => {
    render(<p>Hello, Jenny!</p>, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");
  act(() => {
    render(<p>Hello, Margaret!</p>, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});
//yarn test