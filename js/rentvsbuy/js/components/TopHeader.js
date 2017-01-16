import React from "react";

var topHeaderStyle = {
  textAlign: "center",
  padding: "5px 0 5px 0",
  backgroundColor: "orange",
  color: "white",
  fontSize: "2em",
  width: "100%",
  minHeight: "40px",
  fontWeigth: "bold"
};

export default class TopHeader extends React.Component {  
  render(){
    return (
     <div style={topHeaderStyle}>
      {this.props.title} 
     </div>
    );
  }
}