<template>
  <div class="table">
    <!-- <b-table :data="data" :columns="columns"> </b-table> -->
    <div>
      <md-dialog :md-active.sync="isEditModalActive">
        <md-dialog-title>Approve This Car?</md-dialog-title>
        <form action="" style="padding:20px">
          <div class="modal-card" style="width: auto">
            <!-- <table class="classForm" width="100%">
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
          </table> -->
            <!-- <h4>Approve This User?</h4> -->
          </div>
        </form>
        <md-tabs md-dynamic-height>
          <!-- <md-tab md-label="General"> -->
          <!-- </md-tab> -->
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-dense md-accent" @click="decline()"
            >Decline</md-button
          >
          <md-button class="md-dense md-primary" @click="approve()">
            Approve
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <b-table
      :data="isEmpty ? [] : data"
      :narrowed="true"
      :hoverable="true"
      :mobile-cards="true"
    >
      <template slot-scope="props">
        <b-table-column field="carModel" label="Car Model" searchable="true">
          {{ props.row.carModel }}
        </b-table-column>

        <b-table-column field="username" label="Car Owner" searchable="true">
          {{ props.row.user.username }}
        </b-table-column>

        <b-table-column field="registrationNumber" label="Registration Number">
          <a @click="approval(props.row)">
            {{ props.row.registrationNumber }}
          </a>
        </b-table-column>

        <b-table-column field="availableTo" label="Approval" centered>
          <a @click="approval(props.row)">
            Approval >>>
          </a>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>Relax. No Car to Approve.</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import car from "@/js/car.js";
import userClass from "@/js/class/user_class.js"; //directory to po_class.js
import carClass from "@/js/class/car_class.js";
export default {
  data() {
    return {
      userObj: new userClass(),
      carObj: new carClass(),
      data: [],
      carId: null,
      username: null,
      isEditModalActive: false,
      isActive: null
    };
  },
  async created() {
    this.getPendingCar();
  },
  methods: {
    async getPendingCar() {
      try {
        const clog = await user.check_logged();
        if (!clog.err) {
          const result = await car.getPendingCar(this.carObj);
          console.log(result);
          this.data = result;
        } else {
          this.$router.push({ path: `/home` });
        }
      } catch (err) {
        alert(err);
        console.log("Error: ", err);
      }
    },
    approval(data) {
      this.isEditModalActive = true;
      this.carId = data.id;
      this.username = data.username;
      this.isActive = data.isActive;
      console.log("carId in approval: ", this.userId);
    },
    async approve() {
      console.log("Userid: ", this.userId);
      this.carObj._id = this.carId;
      this.carObj._paramIn_1 = localStorage.userId;
      console.log("car Object: ", this.carObj);
      try {
        const result = await car.approveCar(this.carObj);
        console.log(result);
        this.isEditModalActive = false;
        // location.reload();
        this.getPendingCar();
        this.isLoading = false;
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
    async decline() {
      this.isLoading = true;
      this.carObj._id = this.carId;
      this.carObj._paramIn_1 = localStorage.userId;
      console.log(this.carObj);
      try {
        const result = await car.declineCar(this.carObj);
        console.log(result);
        this.isEditModalActive = false;
        // location.reload();
        this.getPendingCar();
        this.isLoading = false;
      } catch (err) {
        alert(err);
        console.log(err);
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
