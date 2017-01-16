import { EventEmitter } from 'events';
import dispatcher from "../dispatcher"; 

class MortgageStore extends EventEmitter { 
  constructor(){
    super()
    this.mortgage = {
      purchasePrice: "200000.00",
      interestRate: "3.25",
      taxes: "4500.00", 
      downpayment: "10000.00",
      homeownersInsurance: "37.50",
      assessments: "200.00"
    };
  }
  mortgageDetails(){
    return this.mortgage;
  }
  setPurchasePrice(purchasePrice){
    this.mortgage.purchasePrice=purchasePrice;
  }
  setInterestRate(interestRate){
    this.mortgage.interestRate=interestRate;
  }
  setTaxes(taxes){
    this.mortgage.taxes=taxes;
  }
  setDownpayment(downpayment){
    this.mortgage.downpayment=downpayment;
  }
  setHomeownersInsurance(homeownersInsurance){
    this.mortgage.homeownersInsurance=homeownersInsurance;
  }
  setAssessments(assessments){
    this.mortgage.assessments=assessments;
  }
  handleActions(action){
    switch(action.type){
      case "PURCHASE_PRICE": {
        this.setPurchasePrice(action.purchasePrice);
        this.emit("change");
        break; 
      }
      case "INTEREST_RATE":{
        this.setInterestRate(action.interestRate);
        this.emit("change");
        break;
      }
      case "TAXES":{
        this.setTaxes(action.taxes);
        this.emit("change");
        break;
      }
      case "DOWNPAYMENT":{
        this.setDownpayment(action.downpayment);
        this.emit("change");
        break;
      }
      case "HOMEOWNERS_INSURANCE":{
        this.setHomeownersInsurance(action.homeownersInsurance);
        this.emit("change");
        break;
      }
      case "ASSESSMENTS": {
        this.setAssessments(action.assessments);
        this.emit("change");
        break;
      }
    }
  }
}
const mortgageStore = new MortgageStore;

dispatcher.register(mortgageStore.handleActions.bind(mortgageStore));
export default mortgageStore;