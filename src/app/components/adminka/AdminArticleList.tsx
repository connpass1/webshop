import React, { useMemo } from "react";
import { ISlug } from "../../models/IFases";
import { Link } from "react-router-dom";


const Component: React.FC<any> = (props) => {

  const memo = useMemo(() => Object.keys(props).map((key, val, h) => <div>{
    <Link to={"/admin/page/" + ((props[key]) as ISlug).id}>{((props[key]) as ISlug).name}</Link>
  } </div>), [props]);


  return < >
    <h1> Список статей</h1>

    {memo}


  </>;

};

export default Component;