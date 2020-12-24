import axios from "axios";
import { CONST } from "./const";
const url = CONST.CONST_URL.concat("/car/");

class car {
  static search(carObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}search`,
          {
            carObj
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
  static myCarInactive(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}myCarInactive`,
          {
            carObj
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
  static myCarActive(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}myCarActive`,
          {
            carObj
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
  static activateCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}activateCar`,
          {
            carObj
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
  static deactivateCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}deactivateCar`,
          {
            carObj
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
  static allCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}allCar`,
          {
            carObj
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
  static allMyCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}allMyCar`,
          {
            carObj
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
  static myCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}myCar`,
          {
            carObj
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
  static addCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}addCar`,
          {
            carObj
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
  static getPendingCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}getPendingCar`,
          {
            carObj
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
  static approveCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}approveCar`,
          {
            carObj
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
  static declineCar(carObj) {
    console.log(carObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}declineCar`,
          {
            carObj
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

export default car;
