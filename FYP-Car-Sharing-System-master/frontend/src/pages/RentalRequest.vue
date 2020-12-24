<template>
  <div class="background">
    <div class="container" border="3px" height="5000px">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Rental Request</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <b-tabs type="is-toggle" size="is-medium" expanded>
            <b-tab-item :visible="true" label="Pending">
              <md-card-content style="display:block;overflow:auto;">
                <pendingRequest />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Approved">
              <md-card-content style="display:block;overflow:auto;">
                <approvedRequest />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Completed">
              <md-card-content style="display:block;overflow:auto;">
                <completedRequest />
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

export default {
  components: {
    pendingRequest,
    approvedRequest,
    // completedRequest
  },
  data() {
    return {
      name: null
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
