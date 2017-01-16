import dispatcher from "../dispatcher";

export function setRentPayment(rentPayment){
  dispatcher.dispatch({
    type:"RENT_PAYMENT",
    rentPayment,
  });
}
export function setRentInsurance(rentInsurance){
  dispatcher.dispatch({
    type:"RENT_INSURANCE",
    rentInsurance,
  });
}