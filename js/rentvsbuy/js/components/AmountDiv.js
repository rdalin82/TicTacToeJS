import React from 'react';
import InputBox from "./InputBox";

var paymentStyle = {
  width: "10%", 
  display: 'inline-block',
  float: "left", 
  minHeight: "40px",
  padding: "0", 
  fontSize: "90%"
}
export default class AmountDiv extends React.Component { 
  render(){
    return (
      <div style={paymentStyle}>
        {this.props.dollarsign}<InputBox changeHandler={this.props.changeHandler} value={this.props.value} />
      </div>
      );
  }
}