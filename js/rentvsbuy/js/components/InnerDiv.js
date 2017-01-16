import React from 'react';
import LabelDiv from "./LabelDiv";
import AmountDiv from "./AmountDiv";

export default class InnerDiv extends React.Component { 
  render(){
    return (
        <div>
          <LabelDiv label={this.props.labelleft} />
          <AmountDiv changeHandler={this.props.leftChangeHandler} dollarsign={this.props.dollarsignleft} value={this.props.valueleft} />
          <LabelDiv label={this.props.labelright} />
          <AmountDiv changeHandler={this.props.rightChangeHandler} dollarsign={this.props.dollarsignright} value={this.props.valueright} />
        </div>
      );
  }
}