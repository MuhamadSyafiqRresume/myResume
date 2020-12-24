<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">Password Recovery</h1>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content v-if="!isEdit">
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="true"
        ></b-loading>
        <md-table md-card striped>
          <!-- <md-table-toolbar>
        <h1 class="md-title"></h1>
      </md-table-toolbar> -->

          <md-table-row>
            <md-table-head width="30%" style="border-right:1px solid #D3D3D3"
              ><b>Username</b></md-table-head
            >
            <md-table-head width="70%"><b>{{ users.username }}</b></md-table-head>
          </md-table-row>

          <md-table-row>
            <md-table-head width="30%" style="border-right:1px solid #D3D3D3"
              ><b>First Name</b></md-table-head
            >
            <md-table-head width="70%"><b>{{ users.firstname }}</b></md-table-head>
          </md-table-row>

          <md-table-row>
            <md-table-head width="30%" style="border-right:1px solid #D3D3D3"
              ><b>Last Name</b></md-table-head
            >
            <md-table-head width="70%"><b>{{ users.lastname }}</b></md-table-head>
          </md-table-row>

          <md-table-row>
            <md-table-head width="30%" style="border-right:1px solid #D3D3D3"
              ><b>Email Address</b></md-table-head
            >
            <md-table-head width="70%"><b>{{ users.email }}</b></md-table-head>
          </md-table-row>

          <md-table-row>
            <md-table-head width="30%" style="border-right:1px solid #D3D3D3"
              ><b>New Password</b></md-table-head
            >
            <md-table-head width="70%"
              ><b>{{ newPassword }}</b></md-table-head
            >
          </md-table-row>
        </md-table>

        <div style=" float:right;">
          <md-card-actions md-alignment="space-between">
            <b-button type="is-light" @click="$router.go(-1)">Back</b-button>
          </md-card-actions>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import admin from "@/js/admin.js"; //directory to leave.js
import userClass from "@/js/class/user_class.js"; //directory to user_class.js
export default {
  name: "notify-leave",
  data() {
    return {
      newPassword: localStorage.newPassword,
      dataBackgroundColor: "blue",
      isEmpty: false,
      isEdit: false,
      userObj: new userClass(),
      users: [],
      error: "",
      isLoading: false,
      id: localStorage.id,
      isEmpty: false,
      dataBackgroundColor: "blue",
      isPosted: false,
    };
  },
  async created() {
    try {
      this.isLoading = true;
      this.userObj.id = this.$route.params.user_id;
      // alert(this.userObj.id);
      const data = await admin.get_user(this.userObj.toJson());
      console.log("Users:");
      this.users = data;
      // this.users = data.map(users => ({
      //     ...users
      // }))
      // map the object to local variable
      this.firstname = this.users.firstname;
      this.lastname = this.users.lastname;
      this.username = this.users.username;
      this.email = this.users.email;
      this.address_1 = this.users.address_1;
      this.address_2 = this.users.address_2;
      this.address_3 = this.users.address_3;
      this.address_4 = this.users.address_4;
      this.contact_no = this.users.contact_no;
      this.tier = this.users.tier;
      // this.department = this.users.department;
      // this.branch = this.users.branch;
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = err.message;
      alert(err);
    }
  }

};
</script>

<style src="@/assets/style/style.css"></style>

<style scoped>
.content table td,
.content table th {
  border: 0;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}
</style>
