import { Field } from "formik";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import styled from "styled-components";
import { device, theme } from "../GlobalStyles";
import { Icon } from "./Icon";
import { GridIcon } from "./StyledForms";
export const Input = styled.input.attrs(({ type, size }): any => ({
  type: type ? type : "text",
  size: size,
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const StyledD = styled.div<{ isDragging: boolean }>`
  color: ${(props) => (props.isDragging ? theme.color.error : theme.color.secondary)} !important;
  background-color: white;
  border: 1px solid;
  border-color: currentColor;
  display: flex;
  font-size: 0.8 rem;
  font-style: italic;
  cursor: pointer;
  align-self: stretch;
  padding: 24px;
  justify-content: center;
  flex-wrap: wrap;
  @media ${device.mobile} {
    flex-direction: column;
  }
`;
const DIVUploader = styled.div`
  grid-area: b;
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-wrap: wrap;
`;
export const SingleLoader: React.FC<{ handle: any; errorHandler?: any }> = ({ handle, errorHandler }) => {
  return (
    <ImageUploading
      multiple={false}
      maxFileSize={2000000}
      value={[]}
      onChange={(imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        handle(imageList[0].dataURL);
      }}
      maxNumber={1}
    >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        <DIVUploader className="upload__image-wrapper">
          <StyledD isDragging={isDragging} onClick={onImageUpload} {...dragProps}>
            <div> нажмите сюда или </div> <div> перетащите файл для загрузки</div>
          </StyledD>
        </DIVUploader>
      )}
    </ImageUploading>
  );
};

export const IconLoader: React.FC<{ value?: string; handle: any }> = ({ handle, value = "empty" }) => {
  return (
    <GridIcon>
      <Icon src={value} />
      <label htmlFor={"icon"}> иконка </label>
      <Field name="icon" type="text" placeholder="home" />
      <Field as="select" name="icon" className="select">
        <option value="empty">....</option>
        <option value="alcohol">alcohol</option>
        <option value="bear">bear</option>
        <option value="cake">cake</option>
      </Field>
      <SingleLoader handle={handle} />
    </GridIcon>
  );
};
