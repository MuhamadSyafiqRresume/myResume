<template>
  <div class="table">
    <!-- <b-table :data="data" :columns="columns"> </b-table> -->
    <div>
      <md-dialog :md-active.sync="isEditModalActive">
        <md-dialog-title>User Activation</md-dialog-title>
        <form action="" style="padding:20px">
          <div class="modal-card" style="width: auto">
            <table class="classForm" width="100%">
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
          </table>
          </div>
        </form>
        <md-tabs md-dynamic-height>
          <!-- <md-tab md-label="General"> -->
          <!-- </md-tab> -->
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="isEditModalActive = false"
            >Close</md-button
          >
          <md-button v-if="isActive"  class="md-primary" @click="activate()">Activate</md-button>
          <md-button v-else class="md-primary" @click="deactivate()">Deactivate</md-button>
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

        <b-table-column field="id" label="ID">
          <a @click="setting(props.row)">
            {{ props.row.id }}
          </a>
        </b-table-column>

        <b-table-column field="isActive" label="Activation Status" centered>
          <span v-if="props.row.isActive" style="font-size: 2em; color: #84f092;">
                <i class="far fa-check-circle"></i>
              </span>
              <span v-else style="font-size: 2em; color: #f72828;">
                <i class="far fa-times-circle"></i>
              </span>
        </b-table-column>

        <b-table-column field="availableTo" label="Setting" centered>
          <a @click="setting(props.row)">
            Edit >>>
          </a>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>No Users available.</p>
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
      isEditModalActive: false,
      isActive: null
    };
  },
  async created(){
    this.getHost();
    
  },
  methods: {
    async getHost(){
      try {
      const clog = await user.check_logged();
      if (!clog.err) {
        const result = await user.getHost(this.userObj);
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
    setting(data){
      this.isEditModalActive = true;
      this.userId = data.id;
      this.isActive = data.isActive;
      console.log("UserId in setting: ",this.userId)
    },
    async deactivate() {
      console.log("Userid: ", this.userId)
      this.userObj._id = this.userId;
      console.log("User Object: ",this.userObj)
      try {
        const result = await user.deactivateUser(this.userObj);
        console.log(result);
        this.isEditModalActive = false;
        // location.reload();
        this.getHost();
        this.isLoading = false;
      } catch(err) {
        alert(err)
        console.log(err)
      }
    },
    async activate() {
      this.isLoading = true;
      this.userObj.id = this.userId;
      console.log(this.userObj)
      try {
        const result = await user.activateUser(this.userObj);
        console.log(result);
        this.isEditModalActive = false;
        // location.reload();
        this.getHost();
        this.isLoading = false;
      } catch(err) {
        alert(err)
        console.log(err)
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
