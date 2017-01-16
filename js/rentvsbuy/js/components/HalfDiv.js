import React from 'react';
var halfStyle = {
  width: "50%", 
  display: 'inline-block',
  float: "left", 
  minHeight: "40px",
  padding: "0", 
  fontSize: "90%", 
  textAlign: "center"
}
export default class HalfDiv extends React.Component { 
  render(){
    return (
        <div style={halfStyle}>
          {this.props.label}
        </div>
      );
  }
}