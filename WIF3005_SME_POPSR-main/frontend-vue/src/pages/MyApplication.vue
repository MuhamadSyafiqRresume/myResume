<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">My Application</h1>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content>
        <b-tabs type="is-toggle" size="is-medium" expanded>
          <b-tab-item label="PSR">
            <md-card-content>
              <my-PSR></my-PSR>
            </md-card-content>
          </b-tab-item>

          <b-tab-item :visible="true" label="Purchase Order">
            <md-card-content>
              <my-PO></my-PO>
            </md-card-content>
          </b-tab-item>

          <!-- <b-tab-item :visible="true" label="Leave">
            <md-card-content>
              <my-leave></my-leave>
            </md-card-content>
          </b-tab-item> -->
        </b-tabs>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import { myLeave, myPO, myPSR } from "@/components";

export default {
  data() {
    return {
      dataBackgroundColor: "blue"
    };
  },
  async created() {
    try {
      const clog = await user.check_logged();
      if (clog.err) {
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
  },
  components: {
    myLeave,
    myPO,
    myPSR
  }
};
</script>
