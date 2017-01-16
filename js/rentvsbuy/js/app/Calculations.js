export default class Calculations {
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
}