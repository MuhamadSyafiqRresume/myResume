<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <!-- <h3 class="md-title">{{ $route.name }}</h3> -->
      </div>
      <div class="md-toolbar-section-end">
        <md-list>
          <!-- <md-list-item href="#/user"> -->
          <md-list-item @click="test()">
            <i class="material-icons">person</i>
            <p style="padding-top:10px; color:#07a8e3;">Hi, {{ staffName }}</p>
          </md-list-item>
          <md-list-item @click="logout()">
            <i class="fas fa-power-off"></i>
            <p style="padding:5px 10px; padding-top:10px; color:#07a8e3;">
              Logout
            </p>
          </md-list-item>
          <md-button
            class="md-just-icon md-simple md-toolbar-toggle"
            :class="{ toggled: $sidebar.showSidebar }"
            @click="toggleSidebar"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </md-button>
        </md-list>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
export default {
  data() {
    return {
      selectedEmployee: null,
      staffName: localStorage.staffName
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    test() {
      alert("HI " + this.staffName);
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
    }
  }
};
</script>

<style lang="css"></style>
