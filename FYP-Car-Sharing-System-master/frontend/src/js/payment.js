import axios from "axios";
import { CONST } from "./const";
const url = CONST.CONST_URL.concat("/payment/");

class payment {
  static addPayment(paymentObj) {
    console.log(paymentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}addPayment`,
          {
            paymentObj
          },
          {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default payment;
