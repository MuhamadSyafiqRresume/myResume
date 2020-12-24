<template>
  <div v-if="PSRAvailable" id="app">
    <div class="container is-fluid">
    <b-navbar fixed-top style="padding-left:10px">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h3>Car Sharing System</h3>
        </b-navbar-item>
      </template>

    </b-navbar>
      <br><br>
      <form action="https://postman-echo.com/post" method="post">
      <div class="card-content">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">New User Registration</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content style="width:100%;">
            <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div v-show="step === 1">
              <md-card-content>
              <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                <!-- <tr>
                        <td class="clsLabel">
                            <h4>Date:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="date" style="width:98%"></b-input>
                        </td>
                    </tr>-->
                    <tr>
                        <td class="clsLabel">
                            <h4>Upload Licence Image: </h4>
                        </td>
                        <td class="clsValue">
                            <b-field class="file">
                            </b-field>
                            <b-field>
                                <b-upload v-model="dropFiles" multiple drag-drop expanded>
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
                                <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                                    {{file.name}}
                                    <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                                </span>
                            </div>
                            <p>***The expected result after extracting data may differ from the actual result because of image data 
                              noise. Please double check this form contents. This is BETA version for OCR.
                            </p>
                            <md-button
                                class="md-raised md-success"
                                @click.prevent="extractData()"
                                style="float:right"
                                >Extract Data</md-button
                            ><md-button
                                class="md-raised md-success"
                                @click.prevent="quickstart()"
                                style="float:right"
                                >Google Vision</md-button
                            >
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <h4>Full Name: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="fullName" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.fullName.required && isPosted">Full Name is required</div> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Username: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="username" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.username.required && isPosted">Username is required</div> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Email: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="email" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.email.required && isPosted">Email is required</div> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Identity Card Number:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="ICNumber" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.ICNumber.required && isPosted">Identity Card Number is required</div> -->
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <h4>Licence Class:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="licenceClass" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.licenceClass.required && isPosted">Licence Class is required</div> -->
                        </td>
                    </tr>
                  <tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Expiry Date</h4>
                        </td>
                        <td class="clsValue">
                          <b-input v-model="expiryDate" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.expiryDate.required && isPosted">Expired Date is required</div> -->
                        </td>
                    </tr>
                  <tr>
                        <td class="clsLabel">
                            <h4>Full Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="fullAddress" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.fullAddress.required && isPosted">Full Address is required</div> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input type="password" v-model="password" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.fullAddress.required && isPosted">Full Address is required</div> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Confirm Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input type="password" v-model="confirmPassword" style="width:98%"></b-input>
                            <!-- <div class="error" v-if="!$v.fullAddress.required && isPosted">Full Address is required</div> -->
                        </td>
                    </tr>
                
              </table>

              <div class="md-layout"></div>
              <md-button
                class="md-raised md-success"
                @click.prevent="register()"
                style="float:right"
                >Register</md-button
              >
              <!-- </div> -->
              </md-card-content>
            </div>

            
          </md-card-content>
        </md-card>
      </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to po.js
import { SimpleTable, notifyLeave, notifyPO, notifyPSR, psrSearch } from "@/components";
import userClass from "@/js/class/user_class.js"; //directory to po_class.js
import { required, minLength, sameAs, minValue } from "vuelidate/lib/validators";
import Tesseract from 'tesseract.js';
import GOOGLE_CLOUD_KEYFILE from '@/pages/cloud-vision.json'
export default {
  data() {
    return {
      isPosted: false,
      dataBackgroundColor: "blue",
      isEmpty: false,
      isLoading: false,
      userObj: new userClass(),
      psr_id: this.$route.params.psr_id,
      PSRAvailable: true,
      inputMethod: '0',
      isSearch: false,
      isEnter: false,
      error: "",
      step: 1,
      index: 2,
      // details: {
      date: new Date(),
      username: null,
      fullName: null,
      email:null,
      ICNumber: null,
      licenceClass: null,
      expiryData: null,
      fullAddress: null,
      isAdmin: false,
      password: null,
      confirmPassword: null,
      isHost: false,
      isGuest: true,
      dropFiles: [],
      text: null,
    };
  },
  validations: {
    fullname: {
      required,
    },
    ICNumber: {
      required,
    },
    fullAddress: {
      required,
    },
    licenceClass: {
      required,
    },
    expiryData: {
      required,
    },
    // dropFiles: {
    //   required,
    // }
  },
  // async created() {},
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    async quickstart() {
      // Imports the Google Cloud client library
      const vision = require('@google-cloud/vision');

      // Creates a client
      const client = new vision.ImageAnnotatorClient({
        // keyFilename: GOOGLE_CLOUD_KEYFILE,
        keyFilename: 'cloud-vision.json'
      });
      // const client = new vision.ImageAnnotatorClient();

      // Performs label detection on the image file
      const [result] = await client.labelDetection(this.dropFiles[0]);
      const labels = result.labelAnnotations;
      console.log('Labels:');
      labels.forEach(label => console.log(label.description));
    },
    async extractData(){
      this.isLoading = true;
        Tesseract.recognize(
            this.dropFiles[0],
            'eng',
            { logger: m => console.log(m) }
            ).then(({ data: { text } }) => {
            this.text = text;

            try{  
              this.getFullName();
            }catch(err){
              console.log("Failed to extract Full Name")
            }
            try{
              this.getICNumber();
            }catch(err){
              console.log("Failed to extract Identity Card Number")
            }
            try{
              this.getAddress();
            }catch(err){
              console.log("Failed to extract Full Address")
            }
            try{
              this.getExpiryDate();
            }catch(err){
              console.log("Failed to extract Expiry Date")
            }
            this.isLoading = false;
        })
    },
    getFullName(){
      var splits = this.text.split('MALAYSIA')
      splits = splits[1].split("Warganegara")
      this.fullName = splits[0]
    },
    getICNumber(){
      var splits = this.text.split('MALAYSIA')
      splits = splits[2].split(" ")
      this.ICNumber = splits[2]
    },
    getAddress(){
      var splits = this.text.split('Address')
      this.fullAddress = splits[1]
    },
    getExpiryDate(){
      var splits = this.text.split("Alamat")
      splits  = splits[0].split("-")
      console.log("Splits in ExpiryDate:")
      console.log(splits)
      this.expiryDate = splits[splits.length-1]
      console.log("Expity Date: "+this.expiryDate)
    },
    async register() {
      if(this.password == this.confirmPassword){
        this.isLoading = true
          this.mapObj();
          console.log(this.userObj);
          this.isPosted = true;
          try {
              const userpo = await user.register(this.userObj);
              console.log(userpo); //can be ignored
              // alert("New User Created")
              this.isLoading = false;
              this.$router.push({ path: `/` });
          } catch (err) {
            alert("Fail");
            this.isLoading = false;
            this.error = err.message;
            console.log(this.error);
          }
          this.isLoading = false;
        }
        else {
          alert("Password and Confirm Password must be the same")
        } 
      
    },async googleVisionAPI() {
      var url =
        "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +
        origin1 +
        "&destinations=" +
        destinationB +
        "&key=<YOUR-API-KEY>";
      console.log(url);
      let response = await fetch(url);
      let commits = await response.json(); // read response body and parse as JSON
      console.log(commits);
      distance = commits.rows[0].elements[0].distance.value / 1000;
      // alert(distance);
    },
    mapObj(){
          this.userObj.username = this.username;
          this.userObj.fullName = this.fullName;
          this.userObj.ICNumber = this.ICNumber;
          this.userObj.password = this.password;
          this.userObj.email = this.email;
          this.userObj.licenceClass = this.licenceClass;
          this.userObj.expiryDate = this.expiryDate;
          this.userObj.fullAddress = this.fullAddress;
          this.userObj.isHost = this.isHost;
          this.userObj.isGuest = this.isGuest;
          this.userObj.isAdmin = this.isAdmin;
    },
  }
};
</script>

<style scoped src="@/assets/style/style.css">
.md-card {
  width: 1200px;
}
select {
  width: 100%;
}
table td,
table th {
  vertical-align: baseline;
  font-size: 20px;
}
td,
th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}
table {
  widows: 100%;
}
/* tr:nth-child(even) {
  background-color: #59fcff;
} */
.navbar-dark .navbar-nav .nav-link {
  color: white;
}
#body {
  background-color: #120136;
}
</style>
