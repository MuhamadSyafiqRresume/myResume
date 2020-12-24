<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h3 id="title">Car Sharing System</h3>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="#/home2">
          Rent A Car
        </b-navbar-item>
        <b-navbar-item href="#/myreservation">
          My Reservation
        </b-navbar-item>
        <b-navbar-item href="#">
          Be a Host
        </b-navbar-item>
        <!-- <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown> -->
        <!-- <b-navbar-item v-if="isHost == 'true'"> -->
        <b-navbar-item v-if="isHost == 'true'">
          <b-button
            rounded
            type="is-success"
            :to="{ name: 'Host' }"
            @click="toHost()"
            >Go To Host Page
          </b-button>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <!-- <div class="buttons is-danger" @click="logout()">
            <a class="button is-danger" @click="logout()">
              <strong>Logout</strong>
            </a>
          </div> -->
          <b-button type="is-danger" @click="logout()">Logout</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js

export default {
  data() {
    return {
      name: null,
      isHost: null,
    };
  },
  async created() {
    this.isHost = localStorage.isHost;
  },
  methods: {
    toHost() {
      this.$router.push({ path: `/host/` });
    },
    async logout() {
      try {
        const logout = await user.logout();
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
        localStorage.clear();
        if (logout) {
          console.log("Logout success");
          localStorage.clear();
          this.$router.push({ path: `/` }); //add redirect to other page here
        } else alert("Logout Fail");
      } catch (err) {
        this.error = err.message;
        alert(this.error);
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
.navbar-item {
  font-size: 18px;
  padding: 0px 12px;
}
#title {
  font-weight: 800;
  margin-bottom: 18px;
}
</style>
