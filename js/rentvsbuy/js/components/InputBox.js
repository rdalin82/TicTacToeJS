import React from 'react';

export default class InputBox extends React.Component {
  handleChange(e){
    const value = e.target.value;
    this.props.changeHandler(value);
  } 
  render(){
    return (
      <input type="text" onChange={this.handleChange.bind(this)} value={this.props.value}></input>
      );
  } 
}