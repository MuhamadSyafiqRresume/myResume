<template>
    <div v-if="!posted" class="content">
        <md-card style="padding-left:10px">
            <md-card-header :data-background-color="dataBackgroundColor">
                <h1 class="title">Reset Password</h1>
                <!-- <p class="category">Complete your profile</p> -->
            </md-card-header>
            <md-card-content style="width:98%; padding-left:3%;">
                <br><br>
                <table cls="clsForm" width="80%:" border="0">
                    <col width="25%">
                    <col width="70%">
                    <tr>
                        <td class="clsLabel">
                            Old Password:
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="originalPassword"  style="width:70%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            New Password:
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="password"  style="width:70%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Confirm New Password:
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="confirmPassword" style="width:70%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    
                </table>
                <br><br>
                <md-button
                    class="md-raised md-success"
                    @click="resetPassword()" style=" margin:auto; display:block;"
                    >Submit</md-button  >
            </md-card-content>
        <br><br>
        </md-card>
    </div>
    <div v-else>
        <h1>Success</h1>
    </div>

</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import userClass from "@/js/class/user_class.js"; //directory to psr_class.js
// import admin from "@/js/admin.js"; //directory to admin.js
export default {
    data(){
        return{
        userObj: new userClass(),
        originalPassword: '',
        password: '',
        confirmPassword: '',
        posted:false,
        dataBackgroundColor: "blue"
        };
    },
  async created() {
    try {
      const clog = await user.check_logged();
      if (clog.err) {
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
  },
    methods: {
        async resetPassword(){
            if(this.password == this.confirmPassword){
                // try {
                //     alert("1232");
                //     const data = await admin.get_user(localStorage.id);
                //     alert("Test 1");
                //     console.log(data);
                //     // const user = data.result[0]
                //     //     this.total_page = data.result[1]
                //     //     this.pos = pos1.map(pos => ({
                //     //         ...pos
                //     //     }))
                    
                // }
                //     catch{
                //         alert(err);
                //         this.error = err.message;
                //     }
                this.mapObj();
                console.log(this.userObj);
                try {
                    const users = await user.reset_password(this.userObj);
                    console.log(users); //can be ignored
                    if(users.err){
                        alert(users.err);
                    }
                    else{
                        // this.posted = true;
                        // alert("Success");
                        this.$buefy.snackbar.open({
                            duration: 5000,
                            message: 'Password Reset',
                            type: 'is-warning',
                            position: 'is-top',
                            actionText: 'Logout',
                            onAction: () => {
                                this.logout();
                            }
                        })
                            this.$router.push({ path: `/psrListing/${localStorage.id}` });
                    }
                    //add redirect to other page here
                } catch (err) {
                    alert(err);
                    this.error = err.message;
                }
            }
            else{
                alert("Error: Password not identical!")
            }
            
        },
        async logout() {
            try {
                const logout = await user.logout();
                // console.log(logout); //can be ignored
                var scripts = document.getElementsByTagName("script");
                var torefreshs = ["myscript.js", "myscript2.js"]; // list of js to be refresh
                var key = 1; // change this key every time you want force a refresh
                for (var i = 0; i < scripts.length; i++) {
                for (var j = 0; j < torefreshs; j++) {
                    if (scripts[i].src && scripts[i].src.indexOf(torefreshs[j]) > -1) {
                    new_src = scripts[i].src.replace(
                        torefreshs[j],
                        torefreshs[j] + "k=" + key
                    );
                    scripts[i].src = new_src; // change src in order to refresh js
                    }
                }
                }
                if (logout) {
                console.log("Logout success");
                localStorage.clear();
                this.$router.push({ path: "/login" }); //add redirect to other page here
                } else alert("Logout Fail");
            } catch (err) {
                this.error = err.message;
            }
            },
        mapObj(){
            this.userObj.id = localStorage.id;
            this.userObj.in_param_1 = this.originalPassword;
            this.userObj.in_param_2 = this.password;
            this.userObj.in_param_3 = this.confirmPassword;
        }
    }
}
</script>

<style scoped src="@/assets/style/style.css">

</style>
<style scoped > 
  .content table td, .content table th {
      border:0;
      border-width: 0 0 1px;
      padding: 0.5em 0.75em;
      vertical-align: top;
  }
</style>