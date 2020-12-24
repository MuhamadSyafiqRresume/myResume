<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">My Cars</h1>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content>
        <b-tabs type="is-toggle" size="is-medium" expanded>
          <b-tab-item :visible="true" label="All Cars">
            <md-card-content>
              <AllCar />
            </md-card-content>
          </b-tab-item>
          <b-tab-item :visible="true" label="Active">
            <md-card-content>
              <MyActiveCars />
            </md-card-content>
          </b-tab-item>

          <b-tab-item :visible="true" label="Inactive">
            <md-card-content>
              <MyInactiveCars />
            </md-card-content>
          </b-tab-item>

        </b-tabs>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import car from "@/js/car.js"; //directory to car.js
import carClass from "@/js/class/car_class.js"; //directory to car_class.js
import AllCar from "./AllMyCar.vue";

// import MyInactiveCars from "@/components/Tables/InactiveCars.vue";
import {
  MyInactiveCars,
  MyActiveCars,
  SimpleTable,
  OrderedTable
} from "@/components";

export default {
  components: {
    MyInactiveCars,
    MyActiveCars,
    AllCar
  },
  data() {
    return {
      name: null,
      carObj: new carClass(),
      password: null,
      showDialog: false,
      formProps: {
        email: "evan@you.com",
        password: "testing"
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
      layout: [
        { x: 0, y: 0, w: 2, h: 5, i: "0" },
        { x: 2, y: 0, w: 2, h: 5, i: "1" },
        { x: 4, y: 0, w: 2, h: 5, i: "2" },
        { x: 6, y: 0, w: 2, h: 5, i: "3" },
        { x: 8, y: 0, w: 2, h: 5, i: "4" },
        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 4, w: 2, h: 5, i: "9" },
        { x: 8, y: 4, w: 2, h: 5, i: "10" }
      ]
    };
  },
  async created() {
    this.carObj.ownerId = localStorage.userId;
    try {
      const clog = await user.check_logged();
      if (!clog.err) {
        const result = await car.myCar(this.carObj);
        console.log(result);
        this.carListing = result;
        console.log("CarListing", this.carListing);
      } else {
        this.$router.push({ path: `/home` });
      }
    } catch (err) {
      alert(err);
      console.log("Error: ", err);
    }
  },
  methods: {
    toAddCarPage() {
      this.$router.push({ path: `/mycars/addcar` });
    }
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
