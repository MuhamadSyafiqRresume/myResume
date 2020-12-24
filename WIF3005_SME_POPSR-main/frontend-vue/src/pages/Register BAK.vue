<template>
    <div id="app">
        <div class="content">
            <form action="https://postman-echo.com/post" method="post">
            <md-card style="width:150%;">
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Register</h4>
                    <!-- <p class="category">Complete your profile</p> -->
                </md-card-header>
                <md-card-content style="width:95%;">
                    <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                    <!-- <div class="alert alert-info" style="border:1px; background-color:white; color:black;"> -->
                        <md-field style="display:inline-block; float:left; width:47%">
                            <label>First Name</label>
                            <md-input v-model="firstName" md-counter="30"></md-input>
                        </md-field>

                         <md-field style="display:inline-block; float:right; width:47%">
                            <label>Last Name</label>
                            <md-input v-model="regular" ></md-input>
                        </md-field>

                        <md-field style="display:inline-block; float:left; width:70%;">
                            <label>Email Address</label>
                            <md-input v-model="email" ></md-input>
                        </md-field>
                        <md-field style="display:inline-block; float:left; width:70%;">
                            <label>Username</label>
                            <md-input v-model="userName" ></md-input>
                        </md-field><br>
                        <!-- <div class="alert alert-info" style="border:1px; background-color:white; color:black; width:30%;"> -->
                        <!-- <md-field> -->
                            
                        
                        <!-- </md-field> -->
                        <md-field  style="display:inline-block;  width:70%;">
                            <label>Password</label>
                            <md-input v-model="password" type="password"></md-input>
                        </md-field>
                        <md-field  style="display:inline-block;  width:70%;">
                            <label>Confirm Password</label>
                            <md-input v-model="confirmPassword" type="password"></md-input>
                        </md-field>
                        <div class="alert alert-info" style="border:1px; background-color:white; color:black; width:90%;">
                        <b-field id="roleLabel" horizontal label="Role" type="is-danger"  style="width:100%;padding-left:0; padding-top:0%;align:left;">
                                    <!-- <label>Role</label><p>&nbsp</p> -->
                                    <md-radio v-model="tier" value="usert1" class="md-primary">User Tier 1</md-radio>
                                    <md-radio v-model="tier" value="usert2" class="md-primary">User Tier 2</md-radio>
                                    <md-radio v-model="tier" value="usert2_2" class="md-primary">User Tier 2_2</md-radio>
                                    <md-radio v-model="tier" value="usert3" class="md-primary">User Tier 3</md-radio>
                                    <md-radio v-model="tier" value="is_admin" class="md-primary">Admin</md-radio>
                            </b-field>
                        </div>
                        <md-button
          class="md-raised md-success"
          @click="new_user()" style=" margin:auto; display:block;"
          >Submit</md-button
        >
              </div>
              {{error}}
              
                    <!-- </div> -->
                </md-card-content>
            </md-card>
            </form>
        </div>
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
#roleLabel{
    padding-left:0px;

}

</style>