import {render } from '@testing-library/react'
import React, {JSXElementConstructor, ReactElement} from "react";
import {Router} from "../Router/router";
import userEvent from '@testing-library/user-event'
 import {screen} from '@testing-library/dom'
test('два плюс два равно четыре', () => {
  expect(2+2).toBe(4);
});

 
test('Контактыq', () => {
 
render(<Router/>)
const aboutAnchorNode = screen.getByText(/Контакты/i)
 
userEvent.click(aboutAnchorNode)
screen.getByText(/Заготовка статической страницы/i)
  
});
//yarn test