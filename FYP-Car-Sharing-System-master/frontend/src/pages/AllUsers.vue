<template>
  <div class="background">
    <div class="container" border="3px" height="5000px">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">All User</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <b-tabs type="is-toggle" size="is-medium" expanded>
            <b-tab-item :visible="true" label="Guest">
              <md-card-content style="display:block;overflow:auto;">
                <allGuest />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Host">
              <md-card-content style="display:block;overflow:auto;">
                <allHost />
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
import pendingRequest from "./PendingRequest.vue";
import approvedRequest from "./ApprovedRequest.vue";
import completedRequest from "./CompletedRequest.vue";
import { AllGuest } from "@/components";
import allGuest from "./AllGuest.vue";
import allHost from "./AllHost.vue";

export default {
  components: {
    allGuest,
    allHost
    // pendingRequest,
    // approvedRequest
  },
  data() {
    return {
      name: null,
      userObj: new userClass()
    };
  },
  async created() {
      
  },
  methods: {
      
  }
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
</style> 