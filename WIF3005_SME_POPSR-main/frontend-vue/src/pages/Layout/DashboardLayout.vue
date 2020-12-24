<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-if="is_admin == 'true'" :to="{ name: 'Staff Registration', params: { id: this.id } }">
        <!-- <md-icon>dashboard</md-icon> -->
        <p>Register</p>
      </sidebar-link>
      <sidebar-link v-if="is_admin == 'true'" :to="{ name: 'User', params: { id: this.id } }">
        <!-- <md-icon>dashboard</md-icon> -->
        <p>User</p>
      </sidebar-link>
      <sidebar-link v-if="t2 == 'true' || t4 == 'true' || t3 == 'true' || t4 == 'true' " :to="{ name: 'Notification', params: { id: this.id } }">
        <!-- <md-icon>thumb_up</md-icon> -->
        <p>Approval</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'PSR Listing', params: { id: this.id } }">
        <!-- <md-icon>dashboard</md-icon> -->
        <p>PSR List</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Purchase Order Listing', params: { id: this.id } }">
        <!-- <md-icon>dashboard</md-icon> -->
        <p>Purchase Order List</p>
      </sidebar-link>
      <sidebar-link  v-if="t2 == 'true' || t4 == 'true' || t3 == 'true' || t1 == 'true'" :to="{ name: 'PSR', params: { id: this.id } }">
        <!-- <md-icon>thumb_up</md-icon> -->
        <p>PSR</p>
      </sidebar-link>
      <sidebar-link  v-if="t2 == 'true' || t4 == 'true' || t3 == 'true' || t1 == 'true'" :to="{ name: 'Enter PSR', params: { id: this.id } }">
        <!-- <md-icon>dashboard</md-icon> -->
        <p>Purchase Order</p>
      </sidebar-link>
      <!-- <sidebar-link  v-if="t2 == 'true' || t4 == 'true' || t3 == 'true' || t1 == 'true'" :to="{ name: 'Leave Application', params: { id: this.id } }" > -->
        <!-- <md-icon>thumb_up</md-icon> -->
        <!-- <p>Leave Application</p>
      </sidebar-link> -->
      <sidebar-link v-if="t2 == 'true' || t4 == 'true' || t3 == 'true' || t1 == 'true' " :to="{ name: 'My Applications', params: { id: this.id } }">
        <!-- <md-icon>bubble_chart</md-icon> -->
        <p>My Applications</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Reset Password', params: { id: this.id } }">
        <!-- <md-icon>bubble_chart</md-icon> -->
        <p>Reset Password</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer>Pdis -->
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      t1: localStorage.t1,
      t2: localStorage.t2,
      t3: localStorage.t3,
      t4: localStorage.t4,
      is_admin: localStorage.is_admin,
      is_acct: localStorage.acct_t,
    };
  },
  // created() {
  //         this.id = this.$route.params.id;
  //     },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
