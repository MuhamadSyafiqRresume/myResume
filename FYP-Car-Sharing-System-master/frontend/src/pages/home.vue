<template>
  <div class="background">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h3>Car Sharing System</h3>
        </b-navbar-item>
      </template>
      <!-- <template slot="start">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Documentation
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template> -->
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" @click="register()">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="showDialog = true">
              <strong>Login</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section>
      <div>
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>Login</md-dialog-title>
          <form action="">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                <!-- <p class="modal-card-title">Login</p> -->
              </header>
              <section class="modal-card-body">
                <b-field label="Username">
                  <b-input
                    @keyup.native.enter="login"
                    type="name"
                    :value="name"
                    placeholder="Your email"
                    required
                    v-model="name"
                  >
                  </b-input>
                </b-field>

                <b-field label="Password">
                  <b-input
                    @keyup.native.enter="login"
                    type="password"
                    :value="password"
                    v-model="password"
                    password-reveal
                    placeholder="Your password"
                    required
                  >
                  </b-input>
                </b-field>
                <!-- {{name}}
                {{password}} -->
                <!-- <b-checkbox>Remember me</b-checkbox> -->
              </section>
            </div>
          </form>
          <md-tabs md-dynamic-height>
            <!-- <md-tab md-label="General"> -->
            <!-- </md-tab> -->
          </md-tabs>

          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false"
              >Close</md-button
            >
            <md-button class="md-primary" @click="login()"
              >Login</md-button
            >
          </md-dialog-actions>
        </md-dialog>


      </div>
    </section>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js

export default {
  data() {
    return {
      name: "syafiqrazak",
      password: "password",
      showDialog: false,
      formProps: {
        email: "evan@you.com",
        password: "testing"
      }
    };
  },
  async created() {
    try {
      const clog = await user.check_logged();
      if (!clog.err) {
        // this.$router.push({ path: `/home2/${clog.id}` });
        this.$router.push({ path: `/home2` });
      }
    } catch (err) {
      // alert(err);
      console.log(err);
    }
  },
  methods: {
    // login() {
    //   // this.$router.push({ path: `/test` });
    //   alert("Into login");
    //   // this.isComponentModalActive = true;
    // },
    register() {
      this.$router.push({ path: `/register` });
    },
    async login() {
      try {
        this.isLoading = true;
        const login = await user.login(this.name, this.password);
        console.log(login);
        if (await login.hasOwnProperty("err")) {
          this.isLoading = false;
          alert("wrong");
          this.error = login.err;
        } else if (await login.hasOwnProperty("id")) {
          localStorage.username = login.username;
          console.log(login);
          localStorage.userInfo = login;
          localStorage.userId = login.id;
          localStorage.isLoggedin = true;
          localStorage.isHost = login.isHost;
          localStorage.isGuest = login.isGuest;
          localStorage.isAdmin = login.isAdmin;
          console.log("User ID:" + localStorage.userId);
          if (login.isAdmin == true) {
            this.$router.push({ path: `/admin` });
          } else {
            this.$router.push({ path: `/home2` });
          }
        } else if (await login.hasOwnProperty("message")) {
          alert(login.message);
        }
        this.isLoading = false;
        console.log("Login Data");
        console.log(login); //can be ignored
      } catch (err) {
        // document.getElementsByClassName("alert alert-danger").style.display = 'block';
        // var x = document.getElementsByClassName("alert alert-danger");
        // x[0].style.visibility = 'visible';
        this.isLoading = false;
        alert("Enter error " + err);
        this.isShow = true;
        console.log("error:");
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #7FDBFF;
  height: 100vh;
}
</style>
