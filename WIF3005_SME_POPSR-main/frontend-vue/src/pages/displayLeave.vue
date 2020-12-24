<template>
  <div class="container" border="3px" height="5000px">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Leave Application Details</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
    <md-card-content>
        <div v-if="action == 'status' || action == 'audit'" style="width:80%; margin-left:10%;">
          <div
            v-if="leaves.approver_id == null && leaves.decline_id == null"
            @click="showDialog = true"
            class="alert alert-warning"
            style="border-radius:30px;"
          >
            <h4>
              <center><strong> Status: Pending </strong></center>
            </h4>
          </div>
          <div
            v-else-if="leaves.decline_status == true"
            @click="showDialog = true"
            class="alert alert-danger"
            style="border-radius:30px;"
          >
            <h4>
              <center><strong> Status: Declined </strong></center>
            </h4>
          </div>
          <div
            v-else
            class="alert alert-success"
            style="border-radius:30px;"
            @click="showDialog = true"
          >
            <h4>
              <center><strong> Status: Approved </strong></center>
            </h4>
          </div>
        </div>
        <!-- <div class="alert alert-info" style="background-color:white; color:black;" centered> -->
            <!-- <br><br> -->
            <table cls="clsForm" width="80%:">
                <col width="25%">
                <col width="70%">
                <tr>
                    <td class="clsLabel">
                        <h4>Created By:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.user_leave.firstname}} {{leaves.user_leave.lastname}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Company Group:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.group}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Branch:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.branch}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Designation:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.designation}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Leave Type:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.leave_type}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Start Date:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.date_from}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>End Date:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.date_to}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Reason:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.reason}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Emergency Contact:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.emergency_contact}} </h4>
                    </td>
                </tr>
                <tr v-if="hasReplacement">
                    <td class="clsLabel">
                        <h4>Replacement:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{leaves.replace_user.username}} </h4>
                    </td>
                </tr>
            </table>

        <!-- </div> -->
        <!-- <div
          class="alert alert-info"
          style="background-color:white; color:black;"
          centered
        >
          <h4><strong> Start Date:</strong> {{ date_from }}</h4>
        </div>
        <div
          class="alert alert-info"
          style="background-color:white; color:black;"
          centered
        >
          <h4><strong> End Date:</strong> {{ date_to }}</h4>
        </div>
        <div
          class="alert alert-info"
          style="background-color:white; color:black;"
          centered
        >
          <h4>Reasons:</h4>
          <h4>{{ reason }}</h4>
        </div> -->
        <div
          v-if="action == 'approval'"
          style=" margin-left: 42%; margin-right: 42%;"
        >
          <b-button
            style="float:left;"
            type="is-success"
            @click.prevent="approve_leave()"
            >Approve</b-button
          >
          <b-button
            style="float:right;"
            type="is-danger"
            @click.prevent="decline_leave()"
            >Decline</b-button
          >
          {{ error }}
        </div>
        <br /><br />
        <div style=" float:right;" >
            <md-card-actions md-alignment="space-between">       
              <b-button type="is-light" @click="$router.go(-1)"
                  >Back</b-button> 
                  &nbsp;
            </md-card-actions>
          </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import leaves from "@/js/leave.js"; //directory to leave.js
import leaveClass from "@/js/class/leave_class.js"; //directory to leave_class.js
export default {
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      id: localStorage.id,
      leaveObj: new leaveClass(),
      leave_id: this.$route.params.leave_id, //vue-router - to get leave_id
      po_no: this.$route.params.po_no,
      action: this.$route.params.action,
      date_from: "",
      date_to: "",
      reason: "",
      status: "",
      error: "",
      hasReplacement:false,
      leaves: [],
    };
  },
  async created() {
    try {
      this.leaveObj.id = this.leave_id;
      this.leaveObj.in_page = 1;
      const leave = await leaves.report(this.leaveObj);
      this.leaves = leave;
      console.log("Data");
      console.log(this.leaves);
      this.date_from = leave.date_from;
      this.date_to = leave.date_to;
      this.reason = leave.reason;
      if(leaves.replace_id)
        this.hasReplacement = true;
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async approve_leave() {
      try {
        this.leaveObj.id = this.leave_id;
        this.leaveObj.in_page = 1;
        const leave = await leaves.approve_leave(this.leaveObj);
        this.status = leave.status;
        // localStorage.message = "Leave Application Approved";
        // this.$router.push({ path: `/message/${this.id}` });
        this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Leave Application Declined',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
        })
        this.$router.push({ path: `/notification/${this.id}` });
      } catch (err) {
        this.error = err.message;
      }
    },
    async decline_leave() {
      try {
        this.leaveObj.id = this.leave_id;
        this.leaveObj.in_page = 1;
        const leave = await leaves.decline_leave(this.leaveObj);
        // console.log(data); //can be ignored
        // localStorage.message = "Leave Application Declined";
        // this.$router.push({ path: `/message/${this.id}` });
        this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Leave Application Declined',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
        })
        this.$router.push({ path: `/notification/${this.id}` });
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped src="@/assets/style/style.css">

</style>
