<template>
  <div class="table">
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <b-tooltip style="float:right;" label="Reload Data">
      <md-button class="md-icon-button md-dense md-raised md-primary" @click="myInactiveCar()">
          <md-icon>cached</md-icon>
      </md-button>
    </b-tooltip>
    <b-table
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
          <b-tooltip label="Click to activate car" type="is-dark">
            <a @click="setting(props.row)">
              {{ props.row.carModel }}
            </a>
          </b-tooltip>
        </b-table-column>

        <b-table-column field="registrationNumber" label="Registration Number">
          {{ props.row.registrationNumber }}
        </b-table-column>

        <b-table-column field="ratePerDay" label="Rate/Day" centered>
          RM {{ props.row.ratePerDay }}
        </b-table-column>

        <b-table-column field="availability" label="Edit Availability" centered>
          <b-tooltip label="Click to activate car" type="is-dark">
            <a @click="setting(props.row)">
              Edit >>>
            </a>
          </b-tooltip>
        </b-table-column>
        
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>No cars available..</p>
          </div>
        </section>
      </template>
    </b-table>
    <div>
      <md-dialog :md-active.sync="isEditModalActive">
        <md-dialog-title>Car Activation</md-dialog-title>
        <form action="" style="padding:20px">
          <div class="modal-card" style="width: auto">
            <table class="classForm" width="100%">
              <col width="70%">
              <col width="70%">

              <tr>
                <td class="clsLabel">
                    <h4>Is Active: </h4>
                </td>
                <td class="clsValue" style="width:100%">
                <b-switch v-model="isActive" style="margin-top:10px;margin-left:80px">
                    {{ isActive }}
                </b-switch>
                </td>
            </tr>
            <tr v-if="isActive">
                <td class="clsLabel">
                    <h4>Date From: </h4>
                </td>
                <td class="clsValue" style="width:100%">
                <md-datepicker v-model="dateFrom" :md-disabled-dates="disabledDates" :format="DatePickerFormat" md-immediately style="margin-top:-10px;margin-left:20px">
                  <label>Select date</label>
                </md-datepicker>
                </td>
            </tr>
            <tr  v-if="isActive">
                <td class="clsLabel">
                    <h4>Date To: </h4>
                </td>
                <td class="clsValue" style="width:100%">
                <md-datepicker v-model="dateTo" :md-disabled-dates="disabledDates" :format="DatePickerFormat" md-immediately style="margin-top:-10px;margin-left:20px">
                  <label>Select date</label>
                </md-datepicker>
                </td>
            </tr>
            </table>
          </div>
        </form>
        <md-tabs md-dynamic-height>
          <!-- <md-tab md-label="General"> -->
          <!-- </md-tab> -->
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="isEditModalActive = false"
            >Close</md-button
          >
          <md-button class="md-primary" @click="activate()">Update</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>

  <!-- <div class="md-toolbar-section-end">
    <b-navbar-item tag="div">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <div id="addCar" @click="toAddCarPage()">
        <md-icon class="md-size-2x fa fa-plus-circle"></md-icon>
      </div>
    </b-navbar-item>
  </div> -->
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import car from "@/js/car.js"; //directory to car.js
import carClass from "@/js/class/car_class.js"; //directory to car_class.js
import Datepicker from "vuejs-datepicker";

import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  components: {
    // Datepicker
  },
  name: "inactive-car",
  data() {
    return {
      isLoading: false,
      name: null,
      carId: null,
      isEditModalActive: false,
      dateFrom: null,
      dateTo: null,
      isActive: false,
      carObj: new carClass(),
      password: null,
      showDialog: false,
      formProps: {
        email: "evan@you.com",
        password: "testing"
      },
      DatePickerFormat: "dd/MM/yyyy",
      disabledDates: date => {
        return new Date() >= date
      },
      carListing: [],
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
    };
  },
  async created() {
    this.carObj.ownerId = localStorage.userId;
    this.myInactiveCar();
  },
  methods: {
    async myInactiveCar(){
      try {
        const clog = await user.check_logged();
        if (!clog.err) {
          const result = await car.myCarInactive(this.carObj);
          console.log(result);
          this.carListing = result;
        } else {
          this.$router.push({ path: `/home` });
        }
      } catch (err) {
        alert(err);
        console.log("Error: ", err);
      }
    },
    toAddCarPage() {
      this.$router.push({ path: `/mycars/addcar` });
    },
    setting(data) {
      this.isEditModalActive = true;
      this.carId = data.id;
    },
    async activate() {
      this.isLoading = true;
      this.carObj.id = this.carId;
      this.carObj.availableFrom = this.dateFrom;
      this.carObj.availableTo = this.dateTo;
      try {
        const result = await car.activateCar(this.carObj);
        console.log(result);
        this.isEditModalActive = false;
        this.myInactiveCar();
        this.isLoading = false;
      } catch(err) {
        alert(err)
        console.log(err)
      }
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #fafafa;
  height: 100vh;
}
#addCar:hover {
  cursor: pointer;
}
.description {
  margin: 0px 0px 1px;
  margin-left: 5px;
}
.subtitle {
  margin-bottom: 1px;
  margin-left: 5px;
}
.tile.is-child.notification {
  padding: 0px 0px 5px 0px;
  border-radius: 20px;
  border: 2px solid #d2ddd2;
}
#cardImage {
  border-radius: 50%;
}
</style>
