import dispatcher from "../dispatcher";

export function setPurchasePrice(purchasePrice){
  dispatcher.dispatch({
    type: "PURCHASE_PRICE",
    purchasePrice,
  });
}

export function setInterestRate(interestRate){
  dispatcher.dispatch({
    type: "INTEREST_RATE",
    interestRate,
  });
}
export function setTaxes(taxes){
  dispatcher.dispatch({
    type: "TAXES",
    taxes,
  });
}
export function setDownpayment(downpayment){
  dispatcher.dispatch({
    type: "DOWNPAYMENT",
    downpayment,
  });
}
export function setHomeownersInsurance(homeownersInsurance){
  dispatcher.dispatch({
    type: "HOMEOWNERS_INSURANCE",
    homeownersInsurance,
  });
}
export function setAssessments(assessments){
  dispatcher.dispatch({
    type: "ASSESSMENTS",
    assessments,
  });
}
export function doNothing(){
  dispatcher.dispatch({
    type:"NOTHING"
  })
}