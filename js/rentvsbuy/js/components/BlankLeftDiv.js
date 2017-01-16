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
export default class BlankLeftDiv extends React.Component { 
  render(){
    return (
        <div>
          <LabelDiv label={this.props.labelleft} />
          <div style={paymentStyle} /> 
          <LabelDiv label={this.props.labelright} />
          <AmountDiv 
            changeHandler={this.props.rightChangeHandler} 
            dollarsign={this.props.dollarsignright} 
            value={this.props.valueright}/>
        </div>
      );
  }
}