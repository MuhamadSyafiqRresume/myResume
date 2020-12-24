<template>
  <div class="background">
    <div class="container" border="3px" height="5000px">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Add New Car</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div>
              <md-card-content>
                <div class="searchBar">
                    <div class="container">
                        <table cls="clsForm" width="80%:">
                            <col width="25%">
                            <col width="70%">

                            <tr>
                                <td class="clsLabel">
                                    <h4>Upload Car Image: </h4>
                                </td>
                                <td class="clsValue">
                                    <b-field class="file">
                                    </b-field>
                                    <b-field>
                                        <b-upload @input="convertImage" v-model="carImage" multiple drag-drop expanded >
                                            <section class="section">
                                            <div class="content has-text-centered">
                                                <p>
                                                <b-icon icon="upload" size="is-large"></b-icon>
                                                </p>
                                                <p>Drop your files here or click to upload</p>
                                            </div>
                                            </section>
                                        </b-upload>
                                    </b-field>
                                    <div class="tags">
                                        <span v-for="(file, index) in carImage" :key="index" class="tag is-primary">
                                            {{file.name}}
                                            <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                                        </span>
                                    </div>
                                    <md-button
                                class="md-raised md-success"
                                @click.prevent="mapObj()"
                                style="float:right"
                                >Extract Data</md-button >
                                <md-button
                                class="md-raised md-success"
                                @click.prevent="decodeBase64()"
                                style="float:right"
                                >Decode</md-button >
                                </td>
                                <br>
                            </tr>
                            <tr>
                                <td class="clsLabel">
                                    <h4>Enter Location: </h4>
                                </td>
                                <td class="clsValue" style="width:100%">
                                <section style="margin-top:1px; padding-right:10px">
                                        <label>
                                            <gmap-autocomplete
                                                @place_changed="setPlace"
                                                class="form-control"
                                            >
                                            </gmap-autocomplete>
                                        </label>
                                    </section>
                                </td>
                            </tr>
                            <tr>
                                <td class="clsLabel">
                                    <h4>Car Model: </h4>
                                </td>
                                <td class="clsValue">
                                    <b-input v-model="carModel" style="width:98%"></b-input>
                                </td>
                            </tr>
                            <tr>
                                <td class="clsLabel">
                                    <h4>Registration Number: </h4>
                                </td>
                                <td class="clsValue">
                                    <b-input v-model="registrationNumber" style="width:98%"></b-input>
                                </td>
                            </tr>
                            <tr>
                                <td class="clsLabel">
                                    <h4>Rate Per Day (RM):</h4>
                                </td>
                                <td class="clsValue">
                                    <b-input v-model="ratePerDay" style="width:98%" type="number"></b-input>
                                </td>
                            </tr>  
                    </table>

                    </div>
                </div>
                
              <div class="md-layout"></div>
               <md-button
                class="md-raised md-success"
                @click.prevent="addCar()"
                style="float:right"
                >Add Car</md-button
              >
              <md-button
                class="md-raised "
                @click.prevent="addCar()"
                style="float:right"
                >Cancel</md-button
              >
              <!-- </div> -->
              </md-card-content>
            </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import car from "@/js/car.js"; //directory to car.js
import carClass from "@/js/class/car_class.js"; //directory to car_class.js
var fs = require('fs');
export default {
  data() {
    return {
      name: null,
      isPosted: false,
      isEmpty: false,
      isLoading: false,

      registrationNumber: null,
      ownerId: localStorage.userId,
      locationLatitude: null,
      locationLongitude: null,
      city: null,
      carImage: [],
      carModel: null,
      convertedCarImage: null,
      ratePerDay: null,
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      carObj: new carClass(),
    };
  },
  async created() {},
  mounted() {
    this.geolocate();
  },
  methods: {
      deleteDropFile(index) {
          console.log(this.carImage);
          alert("test");
      this.carImage.splice(index, 1);
    },
    extractData() {
        console.log(this.carImage);
        // alert("Pause")
    },
    setPlace(place) {
      this.currentPlace = place;
      // console.log(this.currentPlace);
      console.log(this.currentPlace.address_components[0].long_name);
      this.locationLatitude = this.currentPlace.geometry.location.lat();
      this.locationLongitude = this.currentPlace.geometry.location.lng();
      this.city = this.currentPlace.address_components[0].long_name;
      console.log(this.locationLatitude);
      console.log(this.locationLongitude);
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(this.center);
      });
    },
    convertImage(e){
        let file = e[0];
        let reader = new FileReader();
        reader.onloadend = (file) => {
            // console.log("Result",reader.result)
            // alert("Reader")
            // temp = reader.result;
            this.convertedCarImage = reader.result
        }
        reader.readAsDataURL(file)
        console.log(this.convertedCarImage)
    },
    mapObj(){
        console.log(this.convertedCarImage)
        console.log(this.carObj)
        
        this.carObj.carImage = this.convertedCarImage;
        this.carObj.registrationNumber = this.registrationNumber;
        this.carObj.ownerId = this.ownerId;
        this.carObj.locationLatitude = this.locationLatitude;
        this.carObj.locationLongitude = this.locationLongitude;
        this.carObj.carModel = this.carModel;
        this.carObj.ratePerDay = this.ratePerDay;
        this.carObj.isActive = true;
        this.carObj.city = this.city;
        console.log(this.carObj)
    },
    decodeBase64(){
        // 'use strict';

        // let data = this.convertedCarImage;
        // try{
        //     let buff = new Buffer(data, 'base64');
        //     let text = buff.toString('ascii');

        //     console.log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');
        // } catch{
        //     alert("Decode fail")
        // }
        console.log(this.convertedCarImage)
        // alert("Decoding")
        // let file = this.convertedCarImage;
        // let reader = new FileReader();
        // reader.onloadend = (file) => {
        //     console.log("Result",reader.result)
        //     // alert("Reader")
        //     // temp = reader.result;
        //     this.convertedCarImage = reader.result
        // }
        // reader.readAsBinaryString(file)
        // console.log(this.convertedCarImage)
    },
    async addCar() {
      this.isLoading = true
        this.mapObj();
        console.log(this.userObj);
        // this.isPosted = true;
        try {
            const result = await car.addCar(this.carObj);
            console.log(result); //can be ignored
            // alert("New User Created")
            this.isLoading = false;
            this.$router.push({ path: `/mycars` });
        } catch (err) {
            alert("Fail");
            this.isLoading = false;
            this.error = err.message;
            console.log(this.error);
            }
        // this.isLoading = false;
      
    },
  }
};
</script>

<style scoped>
.background {
  background-color: #fafafa;
  height: 100vh;
}
.md-card .md-card-header {
  background-color: rgb(20, 141, 246);
}
.form-control {
    width: 100%;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    padding: 5px 9px;
}
</style>
