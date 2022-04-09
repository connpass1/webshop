import {render} from '@testing-library/react'
import React, {JSXElementConstructor, ReactElement} from "react";

import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/dom'
import {Router} from '../app/routers/MainRouter';

test('два плюс два равно четыре', () => {
  expect(2+2).toBe(4);
});

 
test('Контакты', () => {

 render(<Router/>)
const aboutAnchorNode=screen.getByText(/Контакты/i)

  userEvent.click(aboutAnchorNode)

  screen.getByText(/Заготовка статической страницы/i)

}); 

test('Контакты', () => {

 render(<Router/>)
 jest.setTimeout(2000);
  

}); 

//yarn testtest('some test title', async () => {
