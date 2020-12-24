<template>
  <div class="table">
    <!-- <b-table :data="data" :columns="columns"> </b-table> -->
    <div>
      <md-dialog :md-active.sync="isEditModalActive">
        <md-dialog-title>Approve This User?</md-dialog-title>
        <form action="" style="padding:20px">
          <div class="modal-card" style="width: auto">
            <!-- <table class="classForm" width="100%">
              <col width="70%">
              <col width="70%">

              <tr>
                <td class="clsLabel">
                    <h4>Is Active: </h4>
                </td>
                <td class="clsValue" style="width:100%">
                <b-switch v-model="isActive" style="margin-top:10px;margin-left:80px">
                    {{ isActive }}
                </b-switch>
                </td>
            </tr>
          </table> -->
            <!-- <h4>Approve This User?</h4> -->
          </div>
        </form>
        <md-tabs md-dynamic-height>
          <!-- <md-tab md-label="General"> -->
          <!-- </md-tab> -->
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-dense md-accent" @click="decline()"
            >Decline</md-button
          >
          <md-button class="md-dense md-primary" @click="approve()">
            Approve
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <b-table
      :data="isEmpty ? [] : data"
      :narrowed="true"
      :hoverable="true"
      :mobile-cards="true"
    >
      <template slot-scope="props">
        <b-table-column field="username" label="Username" searchable="true">
          {{ props.row.username }}
        </b-table-column>

        <b-table-column field="id" label="User ID">
          <a @click="approval(props.row)">
            {{ props.row.id }}
          </a>
        </b-table-column>

        <b-table-column field="availableTo" label="Approval" centered>
          <a @click="approval(props.row)">
            Approval >>>
          </a>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>Relax. No Host to Approve.</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import userClass from "@/js/class/user_class.js"; //directory to po_class.js
export default {
  data() {
    return {
      userObj: new userClass(),
      data: [],
      userId: null,
      username: null,
      isEditModalActive: false,
      isActive: null
    };
  },
  async created() {
    this.getPendingHost();
  },
  methods: {
    async getPendingHost() {
      try {
        const clog = await user.check_logged();
        if (!clog.err) {
          const result = await user.getPendingHost(this.userObj);
          console.log(result);
          this.data = result;
        } else {
          this.$router.push({ path: `/home` });
        }
      } catch (err) {
        alert(err);
        console.log("Error: ", err);
      }
    },
    approval(data) {
      this.isEditModalActive = true;
      this.userId = data.id;
      this.username = data.username;
      this.isActive = data.isActive;
      console.log("UserId in approval: ", this.userId);
    },
    async approve() {
      console.log("Userid: ", this.userId);
      this.userObj._id = this.userId;
      this.userObj._username = this.username;
      console.log("User Object: ", this.userObj);
      try {
        const result = await user.approveUser(this.userObj);
        console.log(result);
        this.isEditModalActive = false;
        // location.reload();
        this.getPendingHost();
        this.isLoading = false;
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
    async decline() {
      this.isLoading = true;
      this.userObj.id = this.userId;
      this.userObj._username = this.username;
      console.log(this.userObj);
      try {
        const result = await user.declineUser(this.userObj);
        console.log(result);
        this.isEditModalActive = false;
        // location.reload();
        this.getPendingHost();
        this.isLoading = false;
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #fafafa;
  height: 100vh;
}
#addCar:hover {
  cursor: pointer;
}
.description {
  margin: 0px 0px 1px;
  margin-left: 5px;
}
.subtitle {
  margin-bottom: 1px;
  margin-left: 5px;
}
.tile.is-child.notification {
  padding: 0px 0px 5px 0px;
  border-radius: 20px;
  border: 2px solid #d2ddd2;
}
#cardImage {
  border-radius: 50%;
}
</style>
