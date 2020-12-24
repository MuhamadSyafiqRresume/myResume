import axios from "axios";
import { CONST } from "./const";
const url = CONST.CONST_URL.concat("/rent/");

class rent {
  static requestCar(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}requestCar`,
          {
            rentObj
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
  static approveRental(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}approveRental`,
          {
            rentObj
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
  static declineRental(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}declineRental`,
          {
            rentObj
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
  static pendingReservation(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}pendingReservation`,
          {
            rentObj
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
  static approvedReservation(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}approvedReservation`,
          {
            rentObj
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
  static completedReservation(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}completedReservation`,
          {
            rentObj
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
  static pendingRequest(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}pendingRequest`,
          {
            rentObj
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
  static approvedRequest(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}approvedRequest`,
          {
            rentObj
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
  static completedRequest(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}completedRequest`,
          {
            rentObj
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
  static pay(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}pay`,
          {
            rentObj
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
  static complete(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}complete`,
          {
            rentObj
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
  static rate(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}rate`,
          {
            rentObj
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
  static getRental(rentObj) {
    console.log(rentObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}getRental`,
          {
            rentObj
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

export default rent;
