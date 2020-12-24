export default class userClass {
  constructor() {
    var id = null;
    var username = null;
    var fullName = null;
    var ICNumber = null;
    var licenceClass = null;
    var expiryDate = null;
    var fullAddress = null;
    var email = null;
    var password = null;
    var isHost = null;
    var isGuest = null;
    var isAdmin = null;
    var licenceImage = null;
    var isActive = null;
    var isApproved = null;
  }

  get id() {
    return this._id;
  }
  set id(in_id) {
    this._id = in_id;
  }
  get username() {
    return this._username;
  }
  set username(in_username) {
    this._username = in_username;
  }
  get fullName() {
    return this._fullName;
  }
  set fullName(in_fullName) {
    this._fullName = in_fullName;
  }

  get ICNumber() {
    return this._ICNumber;
  }
  set ICNumber(in_ICNumber) {
    this._ICNumber = in_ICNumber;
  }

  get password() {
    return this._password;
  }
  set password(in_password) {
    this._password = in_password;
  }

  get email() {
    return this._email;
  }
  set email(in_email) {
    this._email = in_email;
  }

  get licenceClass() {
    return this._licenceClass;
  }
  set licenceClass(in_licenceClass) {
    this._licenceClass = in_licenceClass;
  }

  get expiryDate() {
    return this._expiryDate;
  }
  set expiryDate(in_expiryDate) {
    this._expiryDate = in_expiryDate;
  }

  get fullAddress() {
    return this._fullAddress;
  }
  set fullAddress(in_fullAddress) {
    this._fullAddress = in_fullAddress;
  }

  get isHost() {
    return this._isHost;
  }
  set isHost(in_isHost) {
    this._isHost = in_isHost;
  }

  get isGuest() {
    return this._isGuest;
  }
  set isGuest(in_isGuest) {
    this._isGuest = in_isGuest;
  }

  get isAdmin() {
    return this._isAdmin;
  }
  set isAdmin(in_isAdmin) {
    this._isAdmin = in_isAdmin;
  }

  get licenceImage() {
    return this._licenceImage;
  }
  set licenceImage(in_licenceImage) {
    this._licenceImage = in_licenceImage;
  }

  get isActive() {
    return this._isActive;
  }
  set isActive(in_isActive) {
    this._isActive = in_isActive;
  }

  get isApproved() {
    return this._isApproved;
  }
  set isApproved(in_isApproved) {
    this._isApproved = in_isApproved;
  }

//   get address_4() {
//     return this._address_4;
//   }
//   set address_4(in_address_4) {
//     this._address_4 = in_address_4;
//   }

//   get acct_t() {
//     return this._acct_t;
//   }
//   set acct_t(in_acct_t) {
//     this._acct_t = in_acct_t;
//   }

//   get t1() {
//     return this._t1;
//   }
//   set t1(in_t1) {
//     this._t1 = in_t1;
//   }

//   get t2() {
//     return this._t2;
//   }
//   set t2(in_t2) {
//     this._t2 = in_t2;
//   }

//   get t3() {
//     return this._t3;
//   }
//   set t3(in_t3) {
//     this._t3 = in_t3;
//   }

//   get t4() {
//     return this._t4;
//   }
//   set t4(in_t4) {
//     this._t4 = in_t4;
//   }

//   get is_admin() {
//     return this._is_admin;
//   }
//   set is_admin(in_is_admin) {
//     this._is_admin = in_is_admin;
//   }

//   get total_page() {
//     return this._total_page;
//   }
//   set total_page(in_total_page) {
//     this._total_page = in_total_page;
//   }

//   get in_page() {
//     return this._in_page;
//   }
//   set in_page(in_in_page) {
//     this._in_page = in_in_page;
//   }

//   get in_param_1() {
//     return this._in_param_1;
//   }
//   set in_param_1(in_in_param_1) {
//     this._in_param_1 = in_in_param_1;
//   }

//   get in_param_2() {
//     return this._in_param_2;
//   }
//   set in_param_2(in_in_param_2) {
//     this._in_param_2 = in_in_param_2;
//   }

//   get in_param_3() {
//     return this._in_param_3;
//   }
//   set in_param_3(in_in_param_3) {
//     this._in_param_3 = in_in_param_3;
//   }

//   get in_param_4() {
//     return this._in_param_4;
//   }
//   set in_param_4(in_in_param_4) {
//     this._in_param_4 = in_in_param_4;
//   }

//   get in_param_5() {
//     return this._in_param_5;
//   }
//   set in_param_5(in_in_param_5) {
//     this._in_param_5 = in_in_param_5;
//   }

  //methods
  toJson() {
    let temp = JSON.stringify(this);
    return JSON.parse(temp);
  }

  //set next page
  nextPage() {
    this.in_page = this.in_page + 1;
    if (this.in_page > this.total_page) {
      this.in_page = this.total_page;
    }
    return this.in_page;
  }

  //set prev page
  prevPage() {
    this.in_page = this.in_page - 1;
    if (this.in_page <= 0) {
      this.in_page = 1;
    }
    return this.in_page;
  }
}
