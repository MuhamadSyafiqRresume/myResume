<template>
  <div class="background">
    <div class="container" border="3px" height="5000px">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">System Admin Approval</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <b-tabs type="is-toggle" size="is-medium" expanded>
            <b-tab-item :visible="true" label="Guest">
              <md-card-content style="display:block;overflow:auto;">
                <guestToApprove />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Host">
              <md-card-content style="display:block;overflow:auto;">
                <hostToApprove />
              </md-card-content>
            </b-tab-item>

            <b-tab-item :visible="true" label="Cars">
              <md-card-content style="display:block;overflow:auto;">
                <carToApprove />
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
import guestToApprove from "./GuestToApprove.vue";
import hostToApprove from "./HostToApprove.vue";
import carToApprove from "./CarToApprove.vue";

export default {
  components: {
    guestToApprove,
    hostToApprove,
    carToApprove
  },
  data() {
    return {
      name: null,
      carObj: new carClass(),
      dataBackgroundColor: "blue"
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