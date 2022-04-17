import React from "react";
import Pageable from "../Blocks/Pageable";
import { IItem } from "../../models/IFases";
import {  Table } from "../Elements/Styled";

import { Icon } from "../Elements/Icon";

const Basic: React.FC<any> = (props) => {
  const { content, totalPages    } = props.content;
  const items= content as IItem[]
  return < >
    <Table>
      <thead>
      <tr>
        <th >артикул</th>
        <th > наименоваеие</th>
        <th> кол-во</th>
        <th> каталог</th>
        <th colSpan={2}> цена</th>
      </tr>
      </thead>
    {items.map(item=>  <tr key={item.id }>
      <td>{item.id }</td>
      <td><Icon src={item.icon}/> {item.name }</td>
      <td>{item.price }</td>
      <td>{item.parent }</td>
    </tr>)}
      </Table>
    <Pageable pages={totalPages} />
  </>;


};


export default Basic;