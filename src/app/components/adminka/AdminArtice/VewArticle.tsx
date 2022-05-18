import React from "react";
import { ArticleModel } from "../../../models/ArticleModel";
import { MainStart } from "../../Elements/Styled";
const Component: React.FC<ArticleModel> = (props) => {
  return (
    <div>
      <MainStart>{props.content && <div dangerouslySetInnerHTML={{ __html: props.content }} />}</MainStart>
    </div>
  );
};
export default Component;
