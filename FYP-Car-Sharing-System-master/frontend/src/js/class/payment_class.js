export default class paymentClass {
  constructor() {
    var id = null;
    var rentId = null;
    var status = null;
    var amount = null;
    var billId = null;
  }

  get id() {
    return this._id;
  }
  set id(in_id) {
    this._id = in_id;
  }
  get rentId() {
    return this._rentId;
  }
  set rentId(in_rentId) {
    this._rentId = in_rentId;
  }

  get status() {
    return this._status;
  }
  set status(in_status) {
    this._status = in_status;
  }

  get amount() {
    return this._amount;
  }
  set amount(in_amount) {
    this._amount = in_amount;
  }

  get billId() {
    return this._billId;
  }
  set billId(in_billId) {
    this._billId = in_billId;
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
