import React from 'react';
import ReactDOM from 'react-dom';
 
import styled from "styled-components";
import { theme } from '../GlobalStyles';
const Label = styled.label`
color: white !important;
background-color: ${theme.color.secondary};
display: inline-block;
text-align: center;
padding: 6px ;font-size: 1rem;
grid-area:b !important;
user-select: none;
cursor: pointer;
 
input[type="file"] {
  display: none;
} 

`

export default class FileBase64 extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        files: [],
      };
    }
  
    handleChange(e) {
  
      // get the files
      let files = e.target.files;
  
      // Process each file
      var allFiles = [];
      for (var i = 0; i < files.length; i++) {
  
        let file = files[i];
  
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
  
          // Make a fileInfo Object
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + ' kB',
            base64: reader.result,
            file: file,
          };
  
          // Push it to the state
          allFiles.push(fileInfo);
  
          // If all files have been proceed
          if(allFiles.length == files.length){ 
            
            this.props.onDone(allFiles[0]);
          }
  
        } // reader.onload
  
      } // for
  
    }
  
    render() {
      return (
        <Label  >
          {this.props.text?this.props.text:"Загрузить"}
     
        <input  
          type="file"
          onChange={ this.handleChange.bind(this) }
          multiple={false}  /> 
       </Label>
      );
    }
  }
  