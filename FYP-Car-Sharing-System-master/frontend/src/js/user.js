import axios from "axios";
import { CONST } from "./const";
const url = CONST.CONST_URL.concat("/users/");

class user {
  static login(username, password) {
    let userObj = JSON.stringify({
      username: username,
      password: password
    });
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}login`,
          {
            username,
            password
          },
          {
            withCredentials: true
          }
        );
        console.log("Res: ", res);
        resolve(res.data);
      } catch (err) {
        console.log("enter error:")
        console.log(err);
        reject(err);
      }
    });
  }

  static check_logged() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}check_logged`,
          { checked: "checked" },
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

  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}logout`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // static logout() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await axios.post(`${url}logout`, {
  //         withCredentials: true
  //       });
  //       resolve(res.data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  static register(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}register`,
          {
            userObj
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

  static reset_password(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${userObj._id}/reset_password`,
          {
            userObj
            // ori_password - in_param_1
            // new_password - in_param_2
            // repeat_password - in_param_3
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static find_user(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/search_user`,
          {
            userObj
            //username - in_param_1
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_all_user() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/get_all_user`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getUser(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/getUser`,
          {
            userObj
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getGuest(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/getGuest`,
          {
            userObj
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getHost(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/getHost`,
          {
            userObj
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static activateUser(userObj) {
    console.log(userObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}activateUser`,
          {
            userObj
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

  static deactivateUser(userObj) {
    console.log("Userobj in userclass: ", userObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}deactivateUser`,
          {
            userObj
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

  static getPendingGuest(userObj) {
    console.log("Userobj in userclass: ", userObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}getPendingGuest`,
          {
            userObj
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

  static getPendingHost(userObj) {
    console.log("Userobj in userclass: ", userObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}getPendingHost`,
          {
            userObj
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

  static approveUser(userObj) {
    console.log("Userobj in userclass: ", userObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}approveUser`,
          {
            userObj
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
  static declineUser(userObj) {
    console.log("Userobj in userclass: ", userObj);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}declineUser`,
          {
            userObj
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

export default user;
