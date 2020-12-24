export default class rentClass {
  constructor() {
    var id = null;
    var carId = null;
    var price = null;
    var isPaid = null;
    var guestId = null;
    var hostId = null;
    var dateFrom = null;
    var dateTo = null;
    var rate = null;
    var paramIn_1 = null;
    var paramIn_2 = null;
    var paramIn_3 = null;
    var paramIn_4 = null;
  }

  get id() {
    return this._id;
  }
  set id(in_id) {
    this._id = in_id;
  }
  get carId() {
    return this._carId;
  }
  set carId(in_carId) {
    this._carId = in_carId;
  }
  get price() {
    return this._price;
  }
  set price(in_price) {
    this._price = in_price;
  }

  get isPaid() {
    return this._isPaid;
  }
  set isPaid(in_isPaid) {
    this._isPaid = in_isPaid;
  }

  get guestId() {
    return this._guestId;
  }
  set guestId(in_guestId) {
    this._guestId = in_guestId;
  }
  
  get hostId() {
    return this._hostId;
  }
  set hostId(in_hostId) {
    this._hostId = in_hostId;
  }

  get dateFrom() {
    return this._dateFrom;
  }
  set dateFrom(in_dateFrom) {
    this._dateFrom = in_dateFrom;
  }

  get dateTo() {
    return this._dateTo;
  }
  set dateTo(in_dateTo) {
    this._dateTo = in_dateTo;
  }
  get rate() {
    return this._rate;
  }
  set rate(in_rate) {
    this._rate = in_rate;
  }
  get paramIn_1() {
    return this._paramIn_1;
  }
  set paramIn_1(in_paramIn_1) {
    this._paramIn_1 = in_paramIn_1;
  }

  get paramIn_2() {
    return this._paramIn_1;
  }
  set paramIn_2(in_paramIn_2) {
    this._paramIn_2 = in_paramIn_2;
  }

  get paramIn_3() {
    return this._paramIn_3;
  }
  set paramIn_3(in_paramIn_3) {
    this._paramIn_3 = in_paramIn_3;
  }

  get paramIn_4() {
    return this._paramIn_4;
  }
  set paramIn_4(in_paramIn_1) {
    this._paramIn_4 = in_paramIn_4;
  }

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
