import React from "react";
import TopHeader from "./TopHeader";
import InnerDiv from "./InnerDiv";
import BlankLeftDiv from "./BlankLeftDiv";
import BlankRightDiv from "./BlankRightDiv";
import HalfDiv from "./HalfDiv";
import InputBox from "./InputBox";
import MortgageStore from "../stores/MortgageStore";
import * as MortgageActions from "../actions/MortgageActions";
import RentStore from "../stores/RentStore";
import * as RentActions from "../actions/RentActions";

var containerStyle = {
  margin: "0 10px 10px 0",
  maxHeight: "800px"
};
export default class Container extends React.Component {
  constructor(){
    super();
    this.getRent= this.getRent.bind(this);
    this.getMortgage = this.getMortgage.bind(this);
    this.state = {
      mortgage: MortgageStore.mortgageDetails(),
      rental: RentStore.rentDetails(),
    };
  }
  componentWillMount(){
    MortgageStore.on("change", this.getMortgage);
    RentStore.on("change", this.getRent);
  }

  componentWillUnMount(){
    MortgageStore.removeListener("change", this.getMortgage);
    RentStore.removeListener("change", this.getRent)
  }
  getMortgage(){
    this.setState({
      mortgage: MortgageStore.mortgageDetails(),
    })
  }
  getRent(){
    this.setState({
      rent: RentStore.rentDetails(),
    })
  }
  reloadMortgage(){
    MortgageActions.reloadMortgage();
  }
  reloadRent(){
    RentActions.reloadRent();
  }
  calculateTotalPayment(){
    const pp = parseFloat(this.state.mortgage.purchasePrice);
    const dp = parseFloat(this.state.mortgage.downpayment);
    const tax = parseFloat(this.state.mortgage.taxes);
    const interest = parseFloat(this.state.mortgage.interestRate);
    return ((pp-dp)/30/12)+(interest/12/100*pp)
  }
  calculateFinalHomePayment(){
    const assess = parseFloat(this.state.mortgage.assessments);
    const pmi = parseFloat(this.state.mortgage.purchasePrice*0.01/12);
    const mt = parseFloat(this.state.mortgage.taxes/12);
    const hi = parseFloat(this.state.mortgage.homeownersInsurance);
    return parseFloat(mt+hi+pmi+assess);
  }
  calculateRentPayment(){
    const rp = parseFloat(this.state.rental.rentPayment);
    const ri = parseFloat(this.state.rental.rentInsurance);
    return parseFloat(rp+ri);
  }
  finalCalc(){
    const total = this.calculateTotalPayment();
    const fin = this.calculateFinalHomePayment();
    return parseFloat(total+fin).toFixed(2);
  }
  rentOrBuy(){
    if (this.finalCalc() > this.calculateRentPayment()){
      return "Rent"
    } else if (this.calculateRentPayment() > this.finalCalc()){
      return "Buy"
    } else {
      return "?";
    }
  }
  render(){
    return (
     <div style={containerStyle}>
      <TopHeader title={this.rentOrBuy()} />
      <TopHeader title="Mortgage Details"/>

      <InnerDiv 
        leftChangeHandler={MortgageActions.setPurchasePrice.bind(this)} 
        labelleft="Purchase Price" 
        dollarsignleft="$" 
        valueleft={this.state.mortgage.purchasePrice} 
        rightChangeHandler={MortgageActions.setInterestRate.bind(this)}
        labelright="APR Interest Rate" 
        valueright={this.state.mortgage.interestRate} />

      <BlankRightDiv 
        leftChangeHandler={MortgageActions.setDownpayment.bind(this)}
        labelleft="Down Payment" 
        dollarsignleft="$"
        valueleft={this.state.mortgage.downpayment}/>

      <BlankLeftDiv
        rightChangeHandler={MortgageActions.setTaxes.bind(this)}
        labelright="Taxes" 
        dollarsignright="$"
        valueright={this.state.mortgage.taxes} />
      <BlankLeftDiv 
        rightChangeHandler={MortgageActions.doNothing.bind(this)}
        labelright="Total Monthly Payment(Interest and Principal)" 
        dollarsignright="$" 
        valueright={parseFloat(this.calculateTotalPayment()).toFixed(2)} />

      <TopHeader title="Rent vs Buy" />

      <HalfDiv label="Your Monthly Rent Expenses" />
      <HalfDiv label="Estimated Mortgage Expenses" />
     
      <InnerDiv 
        labelleft="Monthly Rent Payment" 
        dollarsignleft="$" 
        valueleft={this.state.rental.rentPayment}
        leftChangeHandler={RentActions.setRentPayment.bind(this)}
        labelright="Principal and Interest Payment" 
        rightChangeHandler={MortgageActions.doNothing.bind(this)}
        valueright={parseFloat(this.calculateTotalPayment()).toFixed(2)}
        dollarsignright="$" />
      
      <BlankLeftDiv 
        labelright="Estimated Monthly Taxes" 
        rightChangeHandler={MortgageActions.doNothing.bind(this)}
        valueright={parseFloat(this.state.mortgage.taxes/12).toFixed(2)}
        dollarsignright="$" />

      <InnerDiv 
        labelleft="Monthly Renter's Insurance" 
        dollarsignleft="$" 
        valueleft={this.state.rental.rentInsurance}
        leftChangeHandler={RentActions.setRentInsurance.bind(this)}
        labelright="Estimated Homeowner's Insurance" 
        valueright={this.state.mortgage.homeownersInsurance}
        rightChangeHandler={MortgageActions.setHomeownersInsurance.bind(this)}
        dollarsignright="$" />

      <BlankLeftDiv 
        rightChangeHandler={MortgageActions.doNothing.bind(this)}
        labelright="Pirvate Mortgage Insurance"  
        valueright={parseFloat(this.state.mortgage.purchasePrice*0.005/12).toFixed(2)}
        dollarsignright="$" />

      <BlankLeftDiv 
        labelright="Estimated Assessments"
        valueright={this.state.mortgage.assessments} 
        rightChangeHandler={MortgageActions.setAssessments.bind(this)}
        dollarsignright="$" />

      <InnerDiv 
        labelleft="Total Monthly Rent Payment" 
        dollarsignleft="$" 
        valueleft={this.calculateRentPayment()}
        rightChangeHandler={MortgageActions.doNothing.bind(this)}
        labelright="Total Monthly Purchase Payment"
        valueright={this.finalCalc()}
        dollarsignright="$" />
     </div>
    );
  }
}