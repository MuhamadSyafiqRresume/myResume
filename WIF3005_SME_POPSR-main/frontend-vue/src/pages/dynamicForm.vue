<template>
  <div id="app">
    <h1>Test</h1>
    {{ users }}

    <div class="md-layout-item md-size-100 text-left">
      <md-button class="md-raised md-success" @click="clone()"
        >Add Rows</md-button
      >
    </div>
    <md-card-content>
      <!-- <p v-for="msg in messages" v-bind:key>{{msg}}</p> -->
      <div class="md-layout" v-for="user in users" :key="user.username">
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Company (disabled)</label>
            <md-input v-model="user.disabled" type="date">Date</md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>User Name</label>
            <md-input v-model="user.username"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Email</label>
            <md-input v-model="user.emailadress"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <h3 @click="remove()">X</h3>
          </md-field>
        </div>
      </div>
    </md-card-content>
    {{ user }}
  </div>
</template>

<script>
export default {
  name: "edit-profile-form",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      messages: ["hello", "vue", "js"],
      users: [
        {
          username: null,
          disabled: null,
          emailadress: null
        }
      ]
    };
  },
  methods: {
    clone() {
      this.users.push({
        username: null,
        disabled: null,
        emailadress: null
      });
    },
    remove() {
      this.users.pop({
        username: null,
        disabled: null,
        emailadress: null
      });
    }
  }
};
</script>

<style scoped></style>>
