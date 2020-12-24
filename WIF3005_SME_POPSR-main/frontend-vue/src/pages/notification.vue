<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">APPROVAL</h1>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content>
        <b-tabs type="is-toggle" size="is-medium" expanded>
          <b-tab-item :visible="true" label="PSR">
            <md-card-content>
              <notify-PSR></notify-PSR>
            </md-card-content>
          </b-tab-item>

          <b-tab-item :visible="true" label="PO">
            <md-card-content>
              <notify-PO></notify-PO>
            </md-card-content>
          </b-tab-item>

          <!-- <b-tab-item label="Leave Application">
            <md-card-content>
              <notify-leave></notify-leave>
            </md-card-content>
          </b-tab-item> -->
        </b-tabs>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import { SimpleTable,  notifyPO, notifyPSR } from "@/components"; //notifyLeave,

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
    SimpleTable,
    // notifyLeave,
    notifyPO,
    notifyPSR
  }
};
</script>
