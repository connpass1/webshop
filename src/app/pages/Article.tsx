import React from "react";
import { H1 } from "../components/Elements/Icon";
import { MainStart } from "../components/Elements/Styled";

const Component: React.FC<{ content: any }> = ({ content }) => {
  return (
    <>
      <H1 src={content.icon}> {content.title}</H1>
      <MainStart>{content.content && <div dangerouslySetInnerHTML={{ __html: content.content }} />}</MainStart>
    </>
  );
};

export default Component;
