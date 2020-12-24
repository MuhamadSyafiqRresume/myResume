<template>
  <div class="background">
    <TopNavbarGuest />
    <div class="container" border="3px" height="5000px">
      <md-card >
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">My Reservation</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content >
          <b-tabs type="is-toggle" size="is-medium" expanded>
            <b-tab-item :visible="true" label="Pending">
              <md-card-content style="display:block;overflow:auto;">
                <pendingReservation />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Approved">
              <md-card-content style="display:block;overflow:auto;">
                <approvedReservation />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Completed">
              <md-card-content style="display:block;overflow:auto;">
                <completedReservation />
              </md-card-content>
            </b-tab-item>

          </b-tabs>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import pendingReservation from "./PendingReservation.vue";
import approvedReservation from "./ApprovedReservation.vue";
import completedReservation from "./CompletedReservation.vue";
import TopNavbarGuest from "./Layout/TopNavBarGuest.vue";

export default {
  components: {
    pendingReservation,
    TopNavbarGuest,
    approvedReservation,
    completedReservation
  },
  data() {
    return {
      name: null,
      dataBackgroundColor: "blue",
      carObj: new carClass()
    };
  },
  async created() {},
  methods: {}
};
</script>

<style scoped>
.background {
  background-color: #fafafa;
  height: 100vh;
}
.md-card .md-card-header {
  background-color: rgb(20, 141, 246);
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(194, 171, 171); 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #584c4c; 
}
</style>
