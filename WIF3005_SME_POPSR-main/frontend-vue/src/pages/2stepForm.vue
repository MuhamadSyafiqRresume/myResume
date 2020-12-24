<template>
  <div id="app">
    <div class="content">
      <form action="https://postman-echo.com/post" method="post">
        <div v-show="step === 1">
          <h1>Step One</h1>
          <h5>
            <legend for="name">Your Name:</legend>
            <input id="name" name="name" v-model="registration.name" />
          </h5>

          <h5>
            <legend for="email">Your Email:</legend>
            <input
              id="email"
              name="email"
              type="email"
              v-model="registration.email"
            />
          </h5>

          <button @click.prevent="next()">Next</button>
        </div>

        <div v-show="step === 2">
          <h1>Step Two</h1>
          <div class="md-layout-item md-size-100 text-left">
            <md-button class="md-raised md-success" @click="clone()"
              >Add Rows</md-button
            >
          </div>
          <md-card-content>
            <!-- <p v-for="msg in messages" v-bind:key>{{msg}}</p> -->
            <div class="md-layout" v-for="user in users" :key="user.username">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field
                  >Company
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
            </div>
          </md-card-content>

          <button @click.prevent="prev()">Previous</button>
          <input type="submit" value="Save" />
        </div>
      </form>

      <br /><br />Debug: {{ registration }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      registration: {
        name: null,
        email: null,
        street: null,
        city: null,
        state: null,
        numtickets: 0,
        shirtsize: "XL",
        inputs: []
      },
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
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    submit() {
      alert("Submit to blah and show blah and etc.");
    },
    addRow() {
      this.inputs.push({
        one: "",
        two: ""
      });
    },
    deleteRow(index) {
      this.inputs.splice(index, 1);
    },
    clone() {
      this.users.push({
        username: null,
        disabled: null,
        emailadress: null
      });
    }
  }
};
</script>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: white;
}
#body {
  background-color: #120136;
}
h1 {
  color: blue;
}
.leave-form {
  width: 50%;
  /* background-color: yellow; */
  width: 70%;
  display: inline-block;
  border: 20px;
  text-align: center;
}
#left-colm {
  width: 10%;
  float: right;
  text-align: right;
}
#right-colm {
  width: 30%;
  float: left;
  text-align: left;
}
</style>
