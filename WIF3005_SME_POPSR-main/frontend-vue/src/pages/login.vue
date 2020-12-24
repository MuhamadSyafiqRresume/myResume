<template>
  <!-- Material form login -->

  <div class="background" :style="sidebarStyle">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <md-card>
      <!-- <div  v-show="isShow" class="alert alert-danger"  style="display:inline-block; margin-left: 15%; top: 50px;  width: 70%; opacity: 30%;">
        <span><b>Warning: </b>{{ error }}</span>
      </div> -->
      <form v-on:submit="login">
        <!-- <b-modal :active.sync="isImageModalActive">
            <p class="image is-4by3"> -->
        <div id="clsImage">
          <img class="logo" src="@/assets/img/dinastiaLogo.png" />
        </div>
        <!-- </p>
        </b-modal> -->
        <b-field label="Username:" style="color:#FAFAFA;" center>
          <md-field>
            <md-input v-model="name"></md-input>
          </md-field>
        </b-field>
        <b-field label="Password:" style="color:#FAFAFA;">
          <md-field>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
        </b-field>
        <br />
        <md-button
          class="md-raised md-success"
          @click="login()"
          style=" margin:auto; display:block;"
          >Submit</md-button
        >

        {{ password }}
        {{ name }}
        {{ error }}
      </form>
    </md-card>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js

export default {
  data() {
    imageURL: "@/assets/img/sidebar-2.jpg";
    return {
      // nama: null,
      isShow: false,
      name: null,
      password: "password",
      error: "",
      id: "",
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      is_admin: "",
      staffName: "",
      isLoading: false
    };
  },
  props: {
    backgroundImage: {
      type: String,
      default: require("@/assets/img/jetty.jpg")
    }
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage}) `,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `cover`
        // backgroundColor: "linear-gradient(to right, #ff4b1f, #1fddff)",
      };
    }
  },
  async created() {
    try {
      const clog = await user.check_logged();
      if (!clog.err) {
        this.$router.push({ path: `/psrListing/${clog.id}` });
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  },
  methods: {
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
          this.isLoading = false;
          localStorage.user = login;
          localStorage.id = login.id;
          try {
            localStorage.department = login.department.cd;
            localStorage.branch = login.branch.cd;
          } catch {
            console.log("Admin or Account");
          }
          localStorage.t1 = login.t1;
          localStorage.t2 = login.t2;
          localStorage.t4 = login.t4;
          localStorage.t3 = login.t3;
          localStorage.is_admin = login.is_admin;
          localStorage.acct_t = login.acct_t;
          localStorage.staffName = login.firstname + " " + login.lastname;

          if (login.department) localStorage.department = login.department.cd;
          else localStorage.department = null;
          if (login.branch) localStorage.branch = login.branch.cd;

          this.isLoading = false;
          if (localStorage.acct_t == "true")
            this.$router.push({ path: `/poListing/${login.id}` });
          else if (localStorage.is_admin == "true")
            this.$router.push({ path: `/register/${login.id}` });
          else if (
            localStorage.t2 == "true" ||
            localStorage.t3 == "true" ||
            localStorage.t4 == "true"
          )
            this.$router.push({ path: `/notification/${login.id}` });
          else this.$router.push({ path: `/psrListing/${login.id}` });
        }
        this.isLoading = false;
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
form {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.md-card {
  background-color: #07b5e6;
  margin: auto;
  /* margin-top: 10%; */
  margin-bottom: 10%;
  margin-left: 25%;
  margin-right: 25%;
  width: 40%;
  height: 80vh;
  border: 1px;
  border-radius: 16px;
}
.background {
  width: 100%;
  height: 100;
  background-color: #add8d0;
  background-image: url(/src/asset/img/new_logo.png);
  padding-top: 5%;
  padding-left: 16%;
}
.md-card.md-theme-default {
  /* padding-top: 10%; */
  padding-left: 1em;
  opacity: 0.9;
  margin-left: 20%;
  padding-right: 1em;
  /* background-color: #363537; */
  /* color: #FAFAFA; */
  /* margin-right: 30%; */
}
.md-card img {
  width: 100%;
  /* height: 20%; */
  /* padding-left: 33%; */
}
#clsImage {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
}
/* .label{
  color: #FAFAFA !important;
} */
</style>
