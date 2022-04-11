import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import { actionsCart } from "../store/storeCart";
import { Column, FlexBetween, FlexCenter } from "../components/Elements/Styled";
import { mapContent  } from "../store/helper";
import { Spinner } from "../components/Elements/SvgSpinner";
import { BackToCatalog, BackToHistory } from "../components/Elements/Button";
import styled from "styled-components";
import { Icon } from "../components/Elements/Icon";
import { getMessage } from "../data";
type Props = ReturnType<typeof mapContent > ;
const Div=styled.div`
display: flex;
flex-direction: column;
  
  span{
    font-size :  20em  ;
    color:var(--error-color) ;
    justify-content: space-between;
    min-height: 100%; 
    align-items: flex-end; 
  }
`

const Component: FunctionComponent<Props > = (props) => {
  const {status}=props
  if(  status=== 100) return <Spinner/>
  if( status< 201) return null;
    return<Div  >
      <h1><Icon src={"error"}/>
      {getMessage(status)}</h1>

       <span>{status}</span>

    <FlexBetween>
      <BackToHistory/>
      <BackToCatalog/>
    </FlexBetween>
    </Div>
};

const ConnectedComponent = connect(mapContent   )(Component);

const Fetch: FunctionComponent = () => {
 const paths =["catalog","user","order","cart","item"]
  let { id } = useParams();
  const error404= !paths.includes(id)
  return <>
          <ConnectedComponent />
    {error404&& <Column>
    <h1>Страница не найдена</h1>
    <p>{id} </p>
      </Column>
    }
    </>
};
export default Fetch;

