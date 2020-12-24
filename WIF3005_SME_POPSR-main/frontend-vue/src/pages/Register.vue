<template>
    <div class="container">
        <md-card style="padding-left:10px">
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Register</h4>
                <!-- <p class="category">Complete your profile</p> -->
            </md-card-header>
            <md-card-content style="width:98%; padding-left:5%;">
                <br><br>
                <b-loading
                  :is-full-page="false"
                  :active.sync="isLoading"
                  :can-cancel="false"
                ></b-loading>
                <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                    <tr>
                        <td class="clsLabel">
                            <h4>First Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="firstname" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.firstname.required && isPosted">Firstname is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Last Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="lastname" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.lastname.required && isPosted">Lastname is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Email Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="email" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.email.required && isPosted">Email Address is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Username:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="username" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.username.required && isPosted">Username is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Designation:</h4>
                        </td>
                        <td class="clsValue">
                            <!-- <b-field type="is-danger"> -->
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
                            <!-- </b-field> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Branch:</h4>
                        </td>
                        <td class="clsValue">
                            <b-select v-model="branch" expanded="" style="width:98%;">
                                <option value= "DJSB"> DJSB</option>
                            </b-select>
                            <div class="error" v-if="!$v.branch.required && isPosted">Branch is required</div>
                        </td>
                    </tr>
                    <tr v-if="tier != 'usert4' && tier != 'is_admin' && tier != 'acct_t'">
                        <td class="clsLabel">
                            <h4>Department:</h4>
                        </td>
                        <td class="clsValue">
                            <b-select v-model="department" expanded="" style="width:98%;">
                                <option value= "mar"> Marine</option>
                                <option value="cct">Commercial and Contract </option>
                                <option value="acct">Account</option>
                                <option value="adm">Admin</option>
                                <option value="tgd">Trading</option>
                            </b-select>
                            <div class="error" v-if="!$v.department.required && isPosted">Department is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Home Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_1" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.address_1.required && isPosted">Field is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_2" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.address_2.required && isPosted">Field is required</div>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_3" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="address_4" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Contact Number:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="number" v-model="contact_no" style="width:98%" ></b-input>
                            </b-field>
                            <div class="error" v-if="!$v.contact_no.required && isPosted">Contact Number is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="password" style="width:98%"  password-reveal></b-input>
                            </b-field>
                            <div class="error" v-if="!$v.password.required && isPosted">Password is required</div>
                            <div class="error" v-if="!$v.password.minLength && isPosted">Password must at least 5 characters</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Confirm Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="confirmPassword" style="width:98%"  password-reveal></b-input>
                            </b-field>
                            <div class="error" v-if="!$v.confirmPassword.required && isPosted">Password is required</div>
                            <div class="error" v-if="!$v.confirmPassword.sameAsPassword">Passwords must be identical.</div>
                        </td>
                    </tr>
                </table>
                <br><br>
                <md-button
                    class="md-raised md-success"
                    @click="new_user()" style=" margin:auto; display:block;"
                    >Submit</md-button  >
            </md-card-content>
        <br><br>
        </md-card>
    </div>
</template>


<script>
import user from "@/js/user.js"; //directory to user.js
import admin from "@/js/admin.js"; //directory to admin.js
import userClass from "@/js/class/user_class.js"; //directory to admin.js
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
    name: "edit-profile-form",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
        userObj: new userClass(),
        posted: false,
        tier:'',
        department:'',
        branch:'',
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
        t1: false,
        t2: false,
        t3: false,
        t4: false,
        is_admin: false,
        isPosted : false,
        dataBackgroundColor : 'blue',
        validateDepartment: true,
        isLoading: false
    };
  },
  async created() {
    try {
      const clog = await user.check_logged();
      if (clog.err) {
        alert(clog.error);
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },confirmPassword: {
      required,
      connfirmPassword: minLength(8),
      sameAsPassword: sameAs('password')
    },department: {
      required
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
  methods: {
    async new_user() {
        this.mapObj();
        console.log(this.userObj.toJson());
        // if(this.register.username && this.register.password)
        this.isPosted = true;
        if (!this.$v.$invalid){
            try {
                this.isLoading = true;
                const users = await admin.new_user(this.userObj.toJson());
                console.log(users); //can be ignored
                this.posted = true;
                localStorage.message = "New User Created";
                // this.$router.push({ path: `/message/${this.id}` });
                this.$router.push({ path: `/user/${this.id}` });
                this.isLoading = false;
                this.registered();
                //add redirect to other page here
            } catch (err) {
                this.isLoading = false;
                alert(err);
                this.error = err.message;
            }
        }
        else
            alert("Fill all the required fields");
        
    },
    mapObj(){
      if(this.tier == "acct_t")
        this.department = "acct";
      if(this.tier == "is_admin")
        this.department = "adm";
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
      this.userObj.password = this.password;
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
    registered() {
        this.$buefy.snackbar.open({
            duration: 3000,
            message: 'New User Registered',
            type: 'is-warning',
            position: 'is-top',
            actionText: 'OK',
            // onAction: () => {
            //             this.reroute();
            //             this.isLoading = false;
            //         }
        })
        // setTimeout(this.reroute,3000);
        
    },
    // reroute(){
    //     this.$router.push({ path: `/user/${this.id}` });
    //     this.isLoading = false;
    // }
  }
    
}
</script>



<style scoped src="@/assets/style/style.css">

</style>

<style scoped>
.newAction {
    background-color: #ebe534 !important;
    }
</style>
