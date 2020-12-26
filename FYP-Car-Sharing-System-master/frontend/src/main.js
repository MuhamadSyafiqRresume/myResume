// =========================================================
// * Vue Material Dashboard - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.Vue = require("vue");
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vuelidate from "vuelidate";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import firebase from "firebase";
// import vuetify from '@/plugins/vuetify' // path to vuetify export

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

//fonts
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(require("vue-moment"));

//Firebase Configurations
// Required for side-effects
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "<YOUR-API-KEY>",
  authDomain: "car-sharing-system.firebaseapp.com",
  databaseURL: "https://car-sharing-system-default-rtdb.firebaseio.com",
  projectId: "car-sharing-system",
  storageBucket: "car-sharing-system.appspot.com",
  messagingSenderId: "571734133741",
  appId: "1:571734133741:web:5d459af4ae944f685bb5e4",
  measurementId: "G-Q85BXLFWHW"
};
const firebaseConfig2 = {
  apiKey: "<Enter-Api-Key>s",
  authDomain: "car-sharing-system-2.firebaseapp.com",
  databaseURL: "https://car-sharing-system-2-default-rtdb.firebaseio.com",
  projectId: "car-sharing-system-2",
  storageBucket: "car-sharing-system-2.appspot.com",
  messagingSenderId: "314442660940",
  appId: "1:314442660940:web:1a1f175263c9356ad948e9",
  measurementId: "G-MN18DJ9VN2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig2);
firebase.analytics();
//Initialize Cloud Firetore through Firebase
var db = firebase.database();
// var database = firebase.database();
//Disable deprecated features
// db.settings({
//   timestampsSnapshots: true
// });
window.db = db;

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
  customIconPacks: {
    fas: {
      sizes: {
        default: "lg",
        "is-small": "1x",
        "is-medium": "2x",
        "is-large": "3x"
      },
      iconPrefix: ""
    }
  }
});
// Vue.use(Vuetify);
Vue.use(Vuelidate);
// Vue.user(VueGoogleAutocomplete);
Vue.use(VueGoogleMaps, {
  load: {
    // key: '<YOUR-API-KEY>',
    key: "<Enter-Api-Key>",
    libraries: "places" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  // vuetify,
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
