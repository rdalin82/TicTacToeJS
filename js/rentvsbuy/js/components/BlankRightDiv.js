import React from 'react';
import LabelDiv from "./LabelDiv";
import AmountDiv from "./AmountDiv";
var paymentStyle = {
  width: "10%", 
  display: 'inline-block',
  float: "left", 
  minHeight: "40px",
  padding: "0", 
  fontSize: "90%"
}
export default class BlankRightDiv extends React.Component { 
  render(){
    return (
        <div>
          <LabelDiv label={this.props.labelleft} />
          <AmountDiv 
            changeHandler={this.props.leftChangeHandler} 
            dollarsign={this.props.dollarsignleft} 
            value={this.props.valueleft}/>
          <LabelDiv label={this.props.labelright} />
          <div style={paymentStyle} /> 
        </div>
      );
  }
}