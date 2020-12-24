<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">Users Profile</h1>
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
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Username</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.username}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Designation</b></md-table-head>
        <md-table-head width="70%"    v-if="users.acct_t"><b>Account Department</b></md-table-head>
        <md-table-head width="70%"    v-if="users.t1"><b>User T1</b> </md-table-head>
        <md-table-head width="70%"    v-if="users.t2"><b>User T2</b> </md-table-head>
        <md-table-head width="70%"    v-if="users.t3"><b>User T3</b> </md-table-head>
        <md-table-head width="70%"    v-if="users.t4"><b>User T4</b> </md-table-head>
        <md-table-head width="70%"    v-if="users.is_admin"><b>System Admin</b> </md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>First Name</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.firstname}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Last Name</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.lastname}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Branch</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.branch.cd}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row  v-if="users.department"> 
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Department</b></md-table-head>
        <md-table-head v-if="users.department.cd == 'MAR'" width="70%"><b>Marine</b></md-table-head>
        <md-table-head v-else-if="users.department.cd == 'CCT'" width="70%"><b>Commercial and Contract</b></md-table-head>
        <md-table-head v-else-if="users.department.cd == 'ACCT'" width="70%"><b>Account</b></md-table-head>
        <md-table-head v-else-if="users.department.cd == 'ADM'" width="70%"><b>Admin</b></md-table-head>
        <md-table-head v-else-if="users.department.cd == 'TGD'" width="70%"><b>Trading</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Email</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.email}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Contact Number</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.contact_no}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"><b>Address</b></md-table-head>
        <md-table-head width="70%"   ><b>{{users.address_1}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"></md-table-head>
        <md-table-head width="70%"   ><b>{{users.address_2}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"></md-table-head>
        <md-table-head width="70%"   ><b>{{users.address_3}}</b></md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="30%" style="border-right:1px solid #D3D3D3"></md-table-head>
        <md-table-head width="70%"   ><b>{{users.address_4}}</b></md-table-head>
      </md-table-row>

    </md-table>
    <!-- <md-card-actions md-alignment="left">
          <b-button  type="is-alert"  @click.prevent="deleteUser()" style="margin-right:1em" >Reset Password</b-button>
    </md-card-actions> -->
    <md-card-actions md-alignment="right">
          <b-button  type="is-alert"  @click.prevent="resetPassword()" style="margin-right:1em" >Reset Password</b-button>
          <b-button  type="is-danger"  @click.prevent="deleteUser()" style="margin-right:1em" >Delete</b-button>
          <b-button  type="is-warning"  @click.prevent="isEdit = true">Edit</b-button>
    </md-card-actions>
        
      </md-card-content>
      <md-card-content v-if="isEdit" style="width:98%; padding-left:5%;">
                <br><br>
                <table cls="clsForm" width="80%:">
                    <col width="20%">
                    <col width="70%">
                    <tr>
                        <td class="clsLabel">
                            First Name:
                        </td>
                        <td class="clsValue">
                            <b-input v-model="firstname" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.firstname.required && isPosted">Firstname is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Last Name:
                        </td>
                        <td class="clsValue">
                            <b-input v-model="lastname" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.lastname.required && isPosted">Lastname is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Email Address: 
                        </td>
                        <td class="clsValue">
                            <b-input v-model="email" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.email.required && isPosted">Email Address is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Username:
                        </td>
                        <td class="clsValue">
                            <b-input v-model="username" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.username.required && isPosted">Username is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Role:
                        </td>
                        <td class="clsValue">
                            <div class="block" style="border: 1px solid #dbdbdb; border-radius:4px; padding-left:1em; height:8.5em; width:98%; verticle-align:middle;">
                                    <!-- <label>Role</label><p>&nbsp</p> -->
                                    <md-radio v-model="tier" value="usert1" class="md-primary">User Tier 1</md-radio>
                                    <md-radio v-model="tier" value="usert2" class="md-primary">User Tier 2</md-radio>
                                    <md-radio v-model="tier" value="usert3" class="md-primary">User Tier 3</md-radio>
                                    <md-radio v-model="tier" value="usert4" class="md-primary">User Tier 4</md-radio>
                                    <md-radio v-model="tier" value="acct_t" class="md-primary">Accountant Tier</md-radio>
                                    <md-radio v-model="tier" value="is_admin" class="md-primary">Admin</md-radio>
                            </div>
                            <div class="error" v-if="!$v.tier.required && isPosted">Designation is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Branch:
                        </td>
                        <td class="clsValue">
                            <b-select v-model="branch" expanded="" style="width:98%;">
                                <option value= "DJSB"> DJSB</option>
                            </b-select>
                            <div class="error" v-if="!$v.branch.required && isPosted">Branch is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Department:
                        </td>
                        <td class="clsValue">
                            <b-select v-model="department" expanded="" style="width:98%;">
                                <option value= "MAR"> Marine</option>
                                <option value="CCT">Commercial and Contract </option>
                                <option value="ACCT">Account</option>
                                <option value="ADM">Admin</option>
                                <option value="TGD">Trading</option>
                            </b-select>
                            <div class="error" v-if="!$v.department.required && isPosted">Department is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Home Address:
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_1" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.address_1.required && isPosted">Field is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_2" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.address_2.required && isPosted">Field is required</div>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_3" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_4" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Contact Number:
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input v-model="contact_no" style="width:98%" ></b-input>
                            </b-field>
                            <div class="error" v-if="!$v.contact_no.required && isPosted">Contact Number is required</div>
                        </td>
                    </tr>
                </table>
                <br><br>
                <md-card-actions md-alignment="center">
                            <md-button
                                class="md-raised md-success"
                                @click="update()" style=" margin-left:40%; "
                                >Update</md-button  >
                            <md-button
                                class="md-raised md-accent"
                                @click="isEdit = false" style=" margin-right:40%; "
                                >Back</md-button  >
                  </md-card-actions>
            </md-card-content>
    </md-card>
  </div>
</template>

<script>
import admin from "@/js/admin.js"; //directory to leave.js
import userClass from "@/js/class/user_class.js"; //directory to user_class.js
import { required, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
export default {
  name: "notify-leave",
  data() {
    return {
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
      firstname: '',
      lastname:'',
      username: '',
      email:'',
      address_1:'',
      address_2:'',
      address_3:'',
      address_4:'',
      contact_no:'',
      password:'',
      confirmPassword:'',
      tier:'',
      department: '',
      branch: '',
      isPosted: false,
      validateDepartment: false
    };
  },
  validations: {
    department: {
      required : requiredUnless('validateDepartment')
    },branch: {
      required
    },firstname: {
      required
    },lastname: {
      required
    },username: {
      required
    },email: {
      required
    },tier: {
      required
    },address_1: {
      required
    },address_2: {
      required
    },contact_no: {
      required
    },
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
      this.lastname =this.users.lastname;
      this.username = this.users.username;
      this.email =this.users.email;
      this.address_1 =this.users.address_1;
      this.address_2 =this.users.address_2;
      this.address_3 =this.users.address_3;
      this.address_4 =this.users.address_4;
      this.contact_no =this.users.contact_no;
      this.tier =this.users.tier;
      // this.department = this.users.department;
      // this.branch = this.users.branch;
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = err.message;
      alert(err);
    }
  },
  methods: {
    detail(value) {
      console.log(value.id);
      this.$router.push({
        path: `/userProfile/${this.id}`
      });
    },
    async deleteUser(){
      try {
      this.isLoading = true;
      this.userObj.id = this.$route.params.user_id;
      // alert(this.userObj.id);
      const data = await admin.del_user(this.userObj.toJson());
      console.log("Deleting User:");
      localStorage.message = "User Profile Deleted";
      this.isLoading =  false;
      // this.$router.push({ path: `/message/${this.id}` });
      this.$router.push({ path: `/user/${this.id}` });
      this.isLoading = false;
      this.deleteAction();
      } catch (err) {
        this.isLoading = false;
        this.error = err.message;
        alert(err);
      }
    },
    async resetPassword(){
        try{
          this.userObj.id = this.$route.params.user_id;
          const data = await admin.random_password(this.userObj.toJson());
          // this.$router.push({ path: `/passwordRecovery/${localStorage.id}/${data.new_pwd} `});
          localStorage.newPassword = data.new_pwd;
          this.$router.push({ path: `/passwordRecovery/${localStorage.id}/${this.userObj.id}`});
          console.log(data.new_pwd);
        } catch (err) {
          this.isLoading = false;
          this.error = err.message;
          alert(err);
        }
    },
    sendEmail(){
      
    },
    mapObj(){
      if(this.tier == "acct_t")
        this.department = "acct";
      if(this.tier == "is_admin")
        this.department = "adm";
      if(this.tier == "usert4")
      this.validateDepartment = true;
      this.userObj.id = this.$route.params.user_id;
      this.userObj.firstname = this.firstname;
      this.userObj.lastname = this.lastname;
      this.userObj.username = this.username;
      this.userObj.email = this.email;
      this.userObj.contact_no = this.contact_no;
      this.userObj.address_1 = this.address_1;
      this.userObj.address_2 = this.address_2;
      this.userObj.address_3 = this.address_3;
      this.userObj.address_4 = this.address_4;
      this.userObj.department = this.department;
      this.userObj.branch = this.branch;
      // reset designation values to false
      this.userObj.t1 = false;
      this.userObj.t2 = false;
      this.userObj.t3 = false;
      this.userObj.t4 = false;
      this.userObj.acct_t = false;
      this.userObj.is_admin = false;
      
        if(this.tier == "usert1")
            this.userObj.t1 = true;
        else if(this.tier == "usert2")
            this.userObj.t2 = true;
        else if(this.tier == "usert4")
            this.userObj.t4 = true;
        else if(this.tier == "usert3")
            this.userObj.t3 = true;
        else if(this.tier == "acct_t")
            this.userObj.acct_t = true;
        else
            this.userObj.is_admin = true;
    },
    async update() {
      alert("Updating");
      this.userObj.id = this.$route.params.user_id;
      this.mapObj();
      // this.userObj = this.users;
        console.log(this.userObj);
        this.isPosted = true;
        if (!this.$v.$invalid){
          try {
              this.isLoading =  true;
              // const users = await admin.user_upd(this.userObj.toJson());
              const users = await admin.admin_upd(this.userObj.toJson());
              console.log(users); //can be ignored
              this.posted = true;
              localStorage.message = "User Profile Updated";
              this.isLoading =  false;
              this.$router.push({ path: `/message/${this.id}` });
              //add redirect to other page here
          } catch (err) {
              this.isLoading =  false;
              alert(err);
              this.error = err.message;
          }
        }
        else
            alert("Fill all the required fields");
    },
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 1000);
    },
    deleteAction() {
        this.$buefy.snackbar.open({
            duration: 3000,
            message: 'User Has Been Deleted',
            type: 'is-warning',
            position: 'is-top',
            actionText: 'OK',
        })
        
    },
    rerouteToUser(){
      this.$router.push({ path: `/user/${localStorage.id}` });
      this.isLoading = false;
    }
  }
};
</script>

<style src="@/assets/style/style.css">

</style>

<style scoped > 
  .content table td, .content table th {
      border:0;
      border-width: 0 0 1px;
      padding: 0.5em 0.75em;
      vertical-align: top;
  }
</style>
