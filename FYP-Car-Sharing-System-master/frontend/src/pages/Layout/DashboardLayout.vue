<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/host">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link> -->
      <sidebar-link to="/rentalrequest">
        <i class="fa fa-list-ul" aria-hidden="true"></i>
        <p>Rental Request</p>
      </sidebar-link>
      <sidebar-link to="/myCars">
        <i class="fa fa-car" aria-hidden="true"></i>
        <p>My Cars</p>
      </sidebar-link>
      <sidebar-link to="/myCars/addCar">
        <i class="fa fa-plus" aria-hidden="true"></i>
        <p>Add Car</p>
      </sidebar-link>
      <sidebar-link to="/template">
        <md-icon>dashboard</md-icon>
        <p>Template</p>
      </sidebar-link>
      <sidebar-link to="/home2">
        <!-- <md-icon>dashboard</md-icon> -->
        <i class="fa fa-home" aria-hidden="true"></i>
        <p>Home</p>
      </sidebar-link>
      <section @click="logout()" class="logout">
        <!-- <md-icon>dashboard</md-icon> -->
        <i class="fa fa-sign-out" aria-hidden="true"></i>
        <!-- <i class="fa fa-home" aria-hidden="true"></i> -->
        <p style="color:#FFFFFF">Logout</p>
      </section>
      <!-- <sidebar-link @click="logout()">
        <md-icon>dashboard</md-icon>
        <p>Logout</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import user from "@/js/user.js"; //directory to user.js

// import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    // TopNavbar,
    DashboardContent,
    // ContentFooter,
    // MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  },
  methods: {
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
.logout {
  margin-left: 10%;
  margin-top: 5px;
  padding: 10px 10px;
  width: 85%;
}
.logout:hover {
  background-color: red;
}
</style>
