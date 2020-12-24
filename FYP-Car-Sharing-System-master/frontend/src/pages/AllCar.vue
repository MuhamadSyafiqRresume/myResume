<template>
  <div class="background">
    <div class="container" border="3px" height="5000px">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">All Cars</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <allCarList />
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import allCarList from "./AllCarListing.vue";


export default {
  components: {
      allCarList
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