export default class carClass {
  constructor() {
    var id = null;
    var registrationNumber = null;
    var ownerId = null;
    var images = null;
    var locationLatitude = null;
    var locationLongitude = null;
    var city = null;
    var carImage = null;
    var carModel = null;
    var gpsId = null;
    var isActive = null;
    var ratePerDay = null;
    var availableFrom = null;
    var availableTo = null;
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

  get registrationNumber() {
    return this._registrationNumber;
  }
  set registrationNumber(in_registrationNumber) {
    this._registrationNumber = in_registrationNumber;
  }
  get ownerId() {
    return this._ownerId;
  }
  set ownerId(in_ownerId) {
    this._ownerId = in_ownerId;
  }
  get images() {
    return this._images;
  }
  set images(in_images) {
    this._images = in_images;
  }
  
  get city() {
    return this._city;
  }
  set city(in_city) {
    this._city = in_city;
  }

  get locationLatitude() {
    return this._locationLatitude;
  }
  set locationLatitude(in_locationLatitude) {
    this._locationLatitude = in_locationLatitude;
  }

  get locationLongitude() {
    return this._locatinLongitude;
  }
  set locationLongitude(in_locatinLongitude) {
    this._locationLongitude = in_locatinLongitude;
  }

  get carImage() {
    return this._carImage;
  }
  set carImage(in_carImage) {
    this._carImage = in_carImage;
  }

  get carModel() {
    return this._carModel;
  }
  set carModel(in_carModel) {
    this._carModel = in_carModel;
  }

  get gpsId() {
    return this._gpsId;
  }
  set gpsId(in_gpsId) {
    this._gpsId = in_gpsId;
  }

  get isActive() {
    return this._isActive;
  }
  set isActive(in_isActive) {
    this._isActive = in_isActive;
  }

  get ratePerDay() {
    return this._ratePerDay;
  }
  set ratePerDay(in_ratePerDay) {
    this._ratePerDay = in_ratePerDay;
  }

  get availableFrom() {
    return this._availableFrom;
  }
  set availableFrom(in_availableFrom) {
    this._availableFrom = in_availableFrom;
  }

  get availableTo() {
    return this._availableTo;
  }
  set availableTo(in_availableTo) {
    this._availableTo = in_availableTo;
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
