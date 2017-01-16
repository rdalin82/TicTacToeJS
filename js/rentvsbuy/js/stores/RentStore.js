import { EventEmitter } from 'events';
import dispatcher from "../dispatcher";

class RentStore extends EventEmitter {
  constructor(){
    super()
    this.rent = {
      rentPayment: "1500.00", 
      rentInsurance: "15.83"
    };
  }
  rentDetails(){
    return this.rent;
  }
  setRentPayment(rentPayment){
    this.rent.rentPayment = rentPayment;
  }
  setRentInsurance(rentInsurance){
    this.rent.rentInsurance = rentInsurance;
  }
  handActions(action){
    switch(action.type){
      case "RENT_PAYMENT": {
        this.setRentPayment(action.rentPayment);
        this.emit("change");
        break;
      }
      case "RENT_INSURANCE": {
        this.setRentInsurance(action.rentInsurance);
        this.emit("change");
        break;
      }
    }
  }
}
const rentStore = new RentStore;

dispatcher.register(rentStore.handActions.bind(rentStore));
export default rentStore;