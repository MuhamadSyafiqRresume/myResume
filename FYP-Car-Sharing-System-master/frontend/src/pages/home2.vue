<template>
  <div class="background">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <TopNavbarGuest />

    <b-carousel
      :autoplay="true"
      with-carousel-list
      :indicator="true"
      :overlay="gallery"
      @click="switchGallery(true)"
    >
      <b-carousel-item v-for="(item, i) in items" :key="i">
        <figure class="image">
          <img :src="item.image" />
        </figure>
      </b-carousel-item>
      <span
        v-if="gallery"
        @click="switchGallery(false)"
        class="modal-close is-large"
      />
    </b-carousel>

    <div class="searchBar">
      <div class="container">
        <table>
          <tr>
            <th>
              <section style="margin-top:21px; padding-right:10px">
                <label>
                  <gmap-autocomplete
                    @place_changed="setPlace"
                    class="form-control"
                  >
                  </gmap-autocomplete>
                  <!-- <button @click="addMarker">Add</button> -->
                </label>
              </section>
            </th>
            <th>
              <section style="padding-right:10px">
                <md-datepicker md-immediately v-model="selectedDate">
                  <label>Pick-up Date</label>
                </md-datepicker>
              </section>
            </th>
            <th>
              <section style="padding-right:40px">
                <md-datepicker md-immediately v-model="returnDate">
                  <label>Return Date</label>
                </md-datepicker>
              </section>
            </th>
            <th>
              <section>
                <b-button type="is-success" size="is-large" @click="search()">
                  Search
                </b-button>
              </section>
            </th>
          </tr>
        </table>
      </div>
      <br /><br />
      <!-- <div class="content" v-if="carListing != []">
        <b-table :data="isEmpty ? [] : carListing" :hoverable="true" :columns="columns"></b-table>
      </div> -->
      <!-- <b-table
        :data="isEmpty ? [] : carListing"
        :bordered="true"
        :striped="true"
        :narrowed="true"
        :hoverable="true"
        :focusable="true"
        :mobile-cards="true"
      >
        <template slot-scope="props">
          <b-table-column field="carModel" label="Car Model">
            {{ props.row.carModel }}
          </b-table-column>

          <b-table-column
            field="registrationNumber"
            label="Registration Number"
          >
            {{ props.row.registrationNumber }}
          </b-table-column>

          <b-table-column field="ratePerDay" label="Rate/Day" centered>
            RM {{ props.row.ratePerDay }}
          </b-table-column>

          <b-table-column field="availableFrom" label="Available From" centered>
            <span class="tag is-success">
              {{ new Date(props.row.availableFrom).toLocaleDateString() }}
            </span>
          </b-table-column>

          <b-table-column field="availableTo" label="Available To" centered>
            <span class="tag is-success">
              {{ new Date(props.row.availableTo).toLocaleDateString() }}
            </span>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
              </p>
              <p>No Query Result. Please select new location or Date.</p>
            </div>
          </section>
        </template>
      </b-table> -->
      <div style="margin-top:10px;" id="results">
        <grid-layout
          :layout.sync="layout"
          :col-num="8"
          :row-height="50"
          :is-draggable="false"
          :is-resizable="false"
          :responsive="true"
          :vertical-compact="true"
          :use-css-transforms="false"
        >
          <grid-item
            v-for="(item, index) in carListing"
            v-bind:key="index"
            :x="layout[index].x"
            :y="layout[index].y"
            :w="2"
            :h="5"
            :i="item.i"
          >
            <div class="tile is-parent" @click="select(item)">
              <article class="tile is-child notification">
                <figure class="image is-4by3" id="cardImage">
                  <img :src="carImages[index]" id="cardImage" />
                </figure>
                <p class="subtitle">{{ item.carModel }}</p>
                <p class="description">RM {{ item.ratePerDay }}</p>
                <p class="description">{{ item.city }}</p>
              </article>
            </div>
          </grid-item>
        </grid-layout>
      </div>

      <div>
        <md-dialog :md-active.sync="isSelectModalActive">
          <md-dialog-title>View Car</md-dialog-title>
          <md-dialog-content>
            <form action="" style="padding:20px">
              <div class="modal-card">
                <figure class="image is-4by3" id="cardImage2">
                  <img :src="carImage" id="cardImage" />
                </figure>
              </div>
            </form>
            <table class="classForm"  id="infoTable">
              <col width="50%">
              <col width="50%">

              <tr>
                <td id="clsLabel">
                    <h4>Car Modal: </h4>
                </td>
                <td id="clsValue">
                  <h4>{{carModel}} </h4>
                </td>
            </tr>
            <tr>
                <td id="clsLabel">
                    <h4>Registration Number: </h4>
                </td>
                <td id="clsValue">
                  <h4>{{registrationNumber}} </h4>
                </td>
            </tr>
            <tr>
                <td id="clsLabel">
                    <h4>From: </h4>
                </td>
                <td id="clsValue">
                  <h4>{{city}} </h4>
                </td>
            </tr>
            <tr>
                <td id="clsLabel">
                    <h4>Rate Per Day: </h4>
                </td>
                <td id="clsValue">
                  <h4>RM {{pricePerDay}} </h4>
                </td>
            </tr>
            
            <tr v-if="dayNumber =='0'">
                <td id="clsLabel">
                    <h4>Price: </h4>
                </td>
                <td id="clsValue">
                  <h4>RM {{price}} </h4>
                </td>
            </tr>
            <tr style="background-color:#FFF; border-top: 2px solid #dddddd;">
                <td id="clsLabel">
                    <h4>Pickup Date: </h4>
                </td>
                <td id="clsValue">
                  <md-datepicker style="margin-top:0px" v-model="selectedDate" @input="calculatePrice" md-immediately />
                </td>
            </tr>
            <tr style="background-color:#FFF; border-top: 2px solid #dddddd;">
                <td id="clsLabel">
                    <h4>Return Date: </h4>
                </td>
                <td id="clsValue">
                  <md-datepicker style="margin-top:0px;" v-model="returnDate" @input="calculatePrice" md-immediately />
                </td>
            </tr>
          </table>
          </md-dialog-content>

          <!-- <md-tabs md-dynamic-height>
          <md-tab md-label="General"> 
         </md-tab> 
        </md-tabs> -->

          <md-dialog-actions style="margin-left:auto; margin-right: auto;">
            <md-button class="md-danger" @click="isSelectModalActive = false"
              >Close</md-button
            >
            <md-button class="md-success" @click="request()"
              >Request Car</md-button
            >
          </md-dialog-actions>
        </md-dialog>
      </div>
      <!-- <h1>{{ selectedDate }}</h1> -->
      <!-- {{ carListing }} -->
    </div>
  </div>
</template>

<script>
import car from "@/js/car.js"; //directory to po.js
import user from "@/js/user.js"; //directory to po.js
import carClass from "@/js/class/car_class.js"; //directory to po_class.js
import userClass from "@/js/class/user_class.js"; //directory to po_class.js
import rentClass from "@/js/class/rent_class.js"; //directory to po_class.js
import rent from "@/js/rent.js"; //directory to po.js
import TopNavbarGuest from "./Layout/TopNavBarGuest.vue";
import firebase from "firebase/app";
import sleep from "await-sleep";
import "firebase/database";
// import TopNavbarGuest from "./Layout/TopNavbar.vue";

import { GridLayout, GridItem } from "vue-grid-layout";
export default {
  components: {
    // datepicker: Buefy.Datepicker
    GridLayout,
    GridItem,
    TopNavbarGuest
  },
  data() {
    return {
      isHost: localStorage.isHost,
      isGuest: localStorage.isGuest,
      isAdmin: localStorage.isAdmin,
      carModel: null,
      carImage: null,
      carId: null,
      city: null,
      hostId: null,
      price: 0,
      dayNumber: 0,
      pricePerDay: null,
      registrationNumber: null,
      isLoading: false,
      gallery: false,
      isSelectModalActive: false,
      al: {
        hasGrayscale: true,
        itemsToShow: 4,
        breakpoints: {
          768: {
            hasGrayscale: false,
            itemsToShow: 4
          },
          960: {
            hasGrayscale: true,
            itemsToShow: 6
          }
        }
      },
      items: [
        {
          title: "Slide 1",
          image: require("@/assets/img/carousel1.png")
        },
        {
          title: "Slide 2",
          image: require("@/assets/img/carousel2.png")
        },
        {
          title: "Slide 3",
          image: require("@/assets/img/carousel6.png")
        },
        {
          title: "Slide 4",
          image: require("@/assets/img/carousel7.png")
        }
      ],

      carObj: new carClass(),
      rentObj: new rentClass(), 
      userObj: new userClass(),
      rentId: null,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      carListing: [],
      carImages: [],
      currentPlace: null,
      selectedDate: "Mon Jun 15 2020 08:00:00 GMT+0800 (Malaysia Time)",
      returnDate: "Mon Jun 15 2020 08:00:00 GMT+0800 (Malaysia Time)",
      result: null,
      columns: [
        {
          field: "carModel",
          label: "Car Model",
          numeric: true
        },
        {
          field: "registrationNumber",
          label: "Registration Number"
        },
        {
          field: "ratePerDay",
          label: "Rate/Day"
        },
        {
          field: "availableFrom",
          label: "Availble From",
          centered: true
        },
        {
          field: "availableTo",
          label: "Available To"
        }
      ],
      layout: [
        { x: 0, y: 0, w: 2, h: 5, i: "0" },
        { x: 2, y: 0, w: 2, h: 5, i: "1" },
        { x: 4, y: 0, w: 2, h: 5, i: "2" },
        { x: 6, y: 0, w: 2, h: 5, i: "3" },
        { x: 8, y: 0, w: 2, h: 5, i: "4" },
        { x: 12, y: 0, w: 2, h: 5, i: "4" },

        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 5, w: 2, h: 5, i: "9" },
        { x: 8, y: 5, w: 2, h: 5, i: "10" },
        { x: 12, y: 5, w: 2, h: 5, i: "4" }
      ]
    };
  },
  mounted() {
    this.geolocate();
  },
  async created() {
    this.carObj.ownerId = localStorage.userId;
    try {
      const clog = await user.check_logged();
      if (!clog.err) {
        // this.$router.push({ path: `/home2/${clog.id}` });
        // this.$router.push({ path: `/home2` });
        // console.log("Logged in");
        //Get My Car(Testing)
        // const result = await car.myCar(this.carObj);
        // this.carListing = result;
        // for (var i = 0; i < this.carListing.length; i++) {
        //   this.carImages.push(this.carListing[i].carImage);
        // }
      } else {
        this.$router.push({ path: `/home` });
      }
    } catch (err) {
      alert("Please log in");
      this.$router.push({ path: `/home` });
      console.log(err);
    }
  },
  methods: {
    login() {
      this.$router.push({ path: `/login` });
    },
    getUUID(){
      const { v4: uuidv4 } = require('uuid');
      var uuid = uuidv4();
      console.log(uuid);
      return uuid;
    },
    select(item) {
      this.isSelectModalActive = true;
      console.log(item);
      this.hostId = item.ownerId;
      this.carModel = item.carModel;
      this.carImage = item.carImage;
      this.city = item.city;
      this.pricePerDay = item.ratePerDay;
      this.registrationNumber = item.registrationNumber;
      this.carId = item.id;
      this.calculatePrice();
    },
    calculatePrice() {
      var dateFormat = require('dateformat');
      var shado = require("shado");

      this.dayNumber = shado.date.set(dateFormat(this.selectedDate,"dd/mm/yyyy"), dateFormat(this.returnDate,"dd/mm/yyyy")).getDays(true);
      this.price = this.pricePerDay * this.dayNumber;
    },
    async request() {
      this.rentObj.carId = this.carId;
      this.rentObj.price = this.price;
      this.rentObj.guestId = localStorage.userId;
      this.rentObj.hostId = this.hostId;
      this.rentObj.dateFrom = this.selectedDate;
      this.rentObj.dateTo = this.returnDate;
      console.log(this.rentObj)
      try {
        const result = await rent.requestCar(this.rentObj);
        console.log(result.id);
        this.rentId =  result.id;
        this.initializeChat();
        // location.reload();
        this.$router.push({ path: `/myreservation` });
      } catch(err) {
        alert(err)
      }
    },
    async initializeChat() { 
      var uuid = this.getUUID();
      var hostName;
      try {
        this.userObj._id = this.hostId;
        console.log("UserObj: ",this.userObj)
        const result = await user.getUser(this.userObj);
        hostName =  result[0].username;
      } catch(err) {
        alert(err)
      }
      try{
        console.log("Username inside try: ", hostName)
        firebase.database().ref('chat/' + uuid).set({
          id: uuid,
          guestId: localStorage.userId,
          guestName: localStorage.username,
          hostId: this.hostId,
          hostName: hostName,
          rentId: this.rentId,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
      } catch(err) {
        console.log(err)
        alert("Error")
      }
       try{
        firebase.database().ref('chatContent/' + this.getUUID()).set({
          chatid: uuid,
          message: "Hi, is the car still available?",
          authorId: localStorage.userId,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
      } catch(err) {
        console.log(err)
        alert("Error")
      }

    },
   async getUser(id){
     var username;
      try {
        console.log("ID: ",id)
        this.userObj._id = id;
        console.log("UserObj: ",this.userObj)
        alert(id)
        const result = await user.getUser(this.userObj);
        // await sleep(1000);
        // console.log("Username: ",result[0].username);
        username =  result[0].username;
      } catch(err) {
        alert(err)
      }
      return username;
    },
    register() {
      this.$router.push({ path: `/register` });
    },
    async logout() {
      try {
        const logout = await user.logout();
        var scripts = document.getElementsByTagName("script");
        var torefreshs = ["myscript.js", "myscript2.js"]; // list of js to be refresh
        var key = 1; // change this key every time you want force a refresh
        for (var i = 0; i < scripts.length; i++) {
          for (var j = 0; j < torefreshs; j++) {
            if (scripts[i].src && scripts[i].src.indexOf(torefreshs[j]) > -1) {
              new_src = scripts[i].src.replace(
                torefreshs[j],
                torefreshs[j] + "k=" + key
              );
              scripts[i].src = new_src; // change src in order to refresh js
            }
          }
        }
        localStorage.clear();
        if (logout) {
          console.log("Logout success");
          localStorage.clear();
          this.$router.push({ path: `/` }); //add redirect to other page here
        } else alert("Logout Fail");
      } catch (err) {
        this.error = err.message;
        alert(this.error);
      }
    },
    toHost() {
      this.$router.push({ path: `/host/` });
    },
    setPlace(place) {
      this.currentPlace = place;
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
    async search() {
      this.isLoading = true;
      console.log(this.carObj);
      this.carListing = [];
      // this.isPosted = true;
      try {
        this.carObj.paramIn_1 = this.selectedDate;
        this.carObj.paramIn_2 = this.returnDate;
        const result = await car.search(this.carObj);
        this.result = result;
        this.carImages = [];
        console.log(result); //can be ignored
        for (var i = 0; i < result.length; i++) {
          this.getDistance(
            this.currentPlace.geometry.location.lat(),
            this.currentPlace.geometry.location.lng(),
            result[i].locationLatitude,
            result[i].locationLongitude,
            i
          );
        }
        // for (var i = 0; i < this.carListing.length; i++) {
        //   this.carImages.push(this.carListing[i].carImage);
        // }
        console.log(this.carListing);
        // var result2 = this.getDistance();
        this.isLoading = false;
      } catch (err) {
        alert("Fail");
        this.error = err.message;
        console.log(this.error);
        this.isLoading = false;
      }
      document.getElementById("results").scrollIntoView();
    },
    async getDistance(
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      index
    ) {
      // var origin1 = new google.maps.LatLng(55.930385, -3.118425);
      var origin1 = originLat + "," + originLng;
      var origin2 = "Greenwich, England";
      var destinationA = "Stockholm, Sweden";
      // var destinationB = new google.maps.LatLng(50.087692, 14.42115);
      var destinationB = destinationLat + "," + destinationLng;
      console.log(origin1);
      // var url =
      //   "https://localhost:8081/maps/api/distancematrix/json?units=metric&origins=" +
      //   origin1 +
      //   "&destinations=" +
      //   destinationB +
      //   "&key=<YOUR-API-KEY>";
      var url =
        "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +
        origin1 +
        "&destinations=" +
        destinationB +
        "&key=<Enter-Api-Key>";
        // "&key=<YOUR-API-KEY>";
      console.log(url);
      let response = await fetch(url);
      let commits = await response.json(); // read response body and parse as JSON
      console.log(commits);
      distance = commits.rows[0].elements[0].distance.value / 1000;
      // alert(distance);
      if (distance < 10) {
        this.carListing.push(this.result[index]);
        console.log("this.carListing");
        console.log(this.carListing);
        this.carImages.push(this.result[index].carImage);
        // alert("within distance");
      }
      // alert("URL");
      var distance = null;
      // fetch(
      //   "http://localhost:8081/maps/api/distancematrix/json?units=metric&origins=" +
      //     origin1 +
      //     "&destinations=" +
      //     destinationB +
      //     "&key=<YOUR-API-KEY>"
      // )
      //   .then(response => {
      //     console.log(response);
      //     return response.json();
      //   })
      //   .then(data => {
      //     // Work with JSON data here
      //     console.log(data);
      //     // alert(data.rows[0].elements[0].distance.value)
      //     distance = data.rows[0].elements[0].distance.value / 1000;
      //     // alert(distance);
      //     if (distance < 10) {
      //       this.carListing.push(this.result[index]);
      //       console.log("this.carListing");
      //       console.log(this.carListing);
      //       alert("within distance")
      //     }
      //     else {
      //       alert("Out of  distance")
      //     }
      //   })
      //   .catch(err => {
      //     // Do something for an error here
      //     console.log("Error Reading data " + err);
      //     alert(err)
      //   });
    },
    switchGallery(value) {
      this.gallery = value;
      if (value) {
        document.documentElement.classList.add("is-clipped");
      } else {
        document.documentElement.classList.remove("is-clipped");
      }
    }
  }
};
</script>

<style scoped>
.form-control {
  width: 500px;
}
.searchBar {
  height: 98vh;
  width: 80%;
  margin: auto;
  margin-top: 5%;
  /* background-color: lightblue; */
}
.navbar-menu {
  background-color: #f7fdff;
}
.background {
  background-color: #f7fdff;
  /* height: 100vh; */
}
.navbar-menu {
  background-color: #7fdbff;
}
.is-active .al img {
  border: 1px solid #fff;
  filter: grayscale(0%);
}
.al img {
  border: 1px solid transparent;
  filter: grayscale(100%);
}
.carousel {
  height: 30%;
}
.description {
  margin: 0px 0px 1px;
  padding-left: 5px;
}
.subtitle {
  margin-bottom: 1px;
  padding-left: 5px;
}
.tile.is-child.notification {
  padding: 0px 0px 5px 0px;
  border-radius: 20px;
  border: 2px solid #d2ddd2;
  border-top-color: #fafafa;
}
#cardImage {
  /* border-radius: 20px; */
  border-top-left-radius: 10px 10px;
  border-top-right-radius: 10px 10px;
  width: 102%;
  margin-left: -1px;
}
.tile.is-child.notification:hover {
  background-color: rgb(226, 175, 175);
  font-weight: normal;
  color: blue;
  cursor: pointer;
}
#cardImage2 {
  width: 600px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
#clsLabel {
  /* background-color:#cfedf8; */
  padding-left: 30px;
}
#infoTable {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(175, 170, 170);
  border-radius: 50%;
  width: 600px;
  padding-left: 1000px;
}
#clsValue {
  padding-left: 30px;
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
