<template>
  <md-toolbar class="md-primary">
    <div class="md-toolbar-row">
      
      <div class="md-toolbar-section-end">
        <b-navbar-item tag="div">
          <b-button type="is-danger" @click="logout()">Logout</b-button>
        </b-navbar-item>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }
  }
};
</script>

<style lang="css">
.md-sidenav-left .md-theme-indigo, .md-sidenav-left .nav-theme {
    background-color: #34495e;
}
</style>
