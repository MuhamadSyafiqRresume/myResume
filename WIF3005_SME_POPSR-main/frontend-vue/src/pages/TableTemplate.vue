<template>
    <div id="container">
        <md-card style="padding-left:10px">
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Register</h4>
                <!-- <p class="category">Complete your profile</p> -->
            </md-card-header>
            <md-card-content style="width:98%; padding-left:5%;">
                <br><br>
                <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                    <tr>
                        <td class="clsLabel">
                            <h4>First Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="firstName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Last Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="lastName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Email Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="email" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Username:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Confirm Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Role:</h4>
                        </td>
                        <td class="clsValue">
                            <!-- <b-field type="is-danger"> -->
                            <div class="block" style="border: 1px solid #dbdbdb; border-radius:4px; padding-left:1em; height:3.5em; verticle-align:middle;">
                                    <!-- <label>Role</label><p>&nbsp</p> -->
                                    <md-radio v-model="tier" value="usert1" class="md-primary">User Tier 1</md-radio>
                                    <md-radio v-model="tier" value="usert2" class="md-primary">User Tier 2</md-radio>
                                    <md-radio v-model="tier" value="usert3" class="md-primary">User Tier 3</md-radio>
                                    <md-radio v-model="tier" value="usert4" class="md-primary">User Tier 4</md-radio>
                                    <md-radio v-model="tier" value="is_admin" class="md-primary">Admin</md-radio>
                            </div>
                            <!-- </b-field> -->
                        </td>
                    </tr>
                </table>
            </md-card-content>
        <br><br>
        </md-card>
    </div>
</template>


<script>
import admin from "@/js/admin.js"; //directory to admin.js
export default {
    name: "edit-profile-form",
  data() {
    return {
      firstName: '',
      lastName:'',
      userName: '',
      email:'',
      tier:'',
      password:'',
      confirmPassword:'',
      role:'',
      usert1: false,
      usert2: false,
      usert4: false,
      usert3: false,
      is_admin: false,
      
    };
  },
  methods: {
    async new_user() {
        if(this.tier == "usert1")
            this.usert1 = true;
        else if(this.tier == "usert2")
            this.usert2 = true;
        else if(this.tier == "usert4")
            this.usert4 = true;
        else if(this.tier == "usert3")
            this.usert3 = true;
        else
            this.is_admin = true;

        console.log(this.email);
        console.log(this.usert2);
        try {
            const users = await admin.new_user(this.userName, this.password, this.firstName, this.lastName, this.email, this.is_admin, this.usert1, this.usert2, this.usert3);
            console.log(users); //can be ignored
            alert("Success");
            //add redirect to other page here
        } catch (err) {
            alert(err);
            this.error = err.message;
        }
    }
  }
    
}
</script>



<style scoped>
.clsLabel{
    /* background-color: #969191; */
    /* color: #ffffff; */
    height: 65px;
    vertical-align: middle;
    padding-left: 1em;
    font-weight: 700;
    font-size: 150%;
    text-align: right;
    /* border-right:8px solid #ffffff; */
    /* border-bottom: 5px solid #ffffff; */
    border-radius: 10px;
    /* border-right: 7px; */
}
.clsLabel h4{
    font-weight: 500;

}
.clsValue{
    /* background-color: #f3f3f3; */
    /* background-color: #ffffff; */
    color: black;
    height: 20px;
    vertical-align: middle;
    padding-left: 5%;
    font-weight: 400;
    border-bottom: 5px solid #ffffff;
    /* border: 5px solid red; */
    border-radius: 10px;
}
.clsForm{
    border-radius: 30px;
    border: 1px solid #ffffff;
}
</style>>
