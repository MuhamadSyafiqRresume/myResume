<template>
  <div class="background">
    <!-- <TopNavbarGuest /> -->
    <div class="container">
      <!-- <h3 class=" text-center">Messaging</h3> -->
      <div class="messaging">
        <div class="inbox_msg">
          <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
              <div
                class="md-toolbar-section-start"
                style="margin-left:5%;color:white"
              >
                <b-navbar-item tag="div">
                  <h4 class="title">{{ guestName }}</h4>
                </b-navbar-item>
              </div>
            </div>
            <div class="md-toolbar-row">
              <div
                class="md-toolbar-section-start"
                style="margin-left:5%;color:white"
              >
                <b-navbar-item tag="div">
                  <h5 class="description">
                    {{ carModel }} || {{ registrationNumber }} 
                  </h5>
                </b-navbar-item>
              </div>
            </div>
          </md-toolbar>
          <div class="mesgs">
            <div class="msg_history">
              <div
                v-for="message in messages"
                :key="message"
                class="incoming_msg"
              >
                <!-- <div class="incoming_msg_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div> -->
                <!-- <div class="received_msg"> -->
                <div
                  :class="[
                    message.authorId != hostId ? 'received_msg' : 'sent_msg'
                  ]"
                >
                  <div
                    :class="[
                      message.authorId != hostId
                        ? 'received_width_msg'
                        : 'sent_width_msg'
                    ]"
                  >
                    <p>{{ message.message }}</p>
                    <!-- <span class="time_date">
                      {{ message.createdAt.toDate() | date: 'dd MMM hh:mm'}}
                    </span> -->
                    <!-- <span class="time_date"> {{ message.createdAt }} </span> -->
                    <span class="time_date"> {{ message.createdAt | moment("MMMM Do YYYY, h:mm:ss a") }} </span>
                  </div>
                </div>
              </div>
              <!-- <div class="outgoing_msg">
                <div class="sent_msg">
                  <p>Test which is a new approach to have all solutions</p>
                  <span class="time_date"> 11:01 AM | June 9</span>
                </div>
              </div> -->
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <input
                  type="text"
                  v-model="inputMessage"
                  class="write_msg"
                  placeholder="Type a message"
                  @keyup.enter="sendMessage"
                />
                <button class="msg_send_btn" type="button">
                  <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import userClass from "@/js/class/user_class.js"; //directory to po_class.js
import rentClass from "@/js/class/rent_class.js"; //directory to rent_class.js
import rent from "@/js/rent.js"; //directory to rent.js
import firebase from "firebase/app";
import "firebase/database";
import sleep from "await-sleep";
import TopNavbarGuest from "./Layout/TopNavBarGuest.vue";

export default {
  components: {
    // TopNavbarGuest
  },
  data() {
    return {
      name: null,
      rentId: this.$route.params.rentid,
      rentObj: new rentClass(),
      userObj: new userClass(),
      hostId: localStorage.userId,
      hostName: localStorage.username,
      guestId: null,
      guestName: null,
      chatId: null,
      carModel: null,
      registrationNumber: null,
      messages: [],
      inputMessage: null
    };
  },
  computed: {
    sortedItems() {
      return this.messages
        .slice(0)
        .sort((a, b) =>
          a.name < b.createdAt ? this.createdAt : -this.sorting
        );
    }
  },
  async created() {
    this.rentId = this.$route.params.rentid;
    console.log(this.rentId);
    this.rentObj.id = this.rentId;
    console.log("RentObj", this.rentObj);
    try {
      var result = await rent.getRental(this.rentObj);
      this.carModel = result[0].car.carModel;
      this.registrationNumber = result[0].car.registrationNumber;
      //   var hostId = result[0].hostId;
      //   this.userObj._id = hostId;
      //   result = await user.getUser(this.userObj);
      //   this.hostName = result[0].username;

      this.getRentChat();
      await sleep(1000);
      this.fetchMessage();
      await sleep(500);
      this.scrollToBottom();
      // while (true) {
      //   this.scrollToBottom();
      // }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  },
  methods: {
    getRentChat() {
      var rentId = this.rentId;
      // firebase
      //   .database()
      //   .ref('/chat/' )
      //   .on("value", snap => {
      //     console.log(snap.val());
      //   });

      firebase
        .database()
        .ref("/chat/")
        .orderByChild("rentId")
        .equalTo(rentId)
        .on("value", snap => {
          var snap = snap.val();
          var key = Object.keys(snap);
          var custdata = snap[key];
          this.chatId = snap[key].id;
          this.hostName = snap[key].hostName;
          this.guestName = snap[key].guestName;
        });
    },
    scrollToBottom(){
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight + 200;
      // alert(box.scrollHeight)
      // alert(box.scrollTop)
    },
    fetchMessage() {
      try {
        firebase
          .database()
          .ref("/chatContent/")
          .orderByChild("chatid")
          .equalTo(this.chatId)
          .on("value", snap => {
            console.log(snap.val());
            let allMessage = [];
            snap.forEach(doc => {
              allMessage.push(doc.val());
            });
            console.log("All Message", allMessage);
            var messageArray = allMessage;
            this.messages = allMessage;
            console.log("This messages: ", this.messages);

            var arraySort = require("array-sort");
            console.log(arraySort(this.messages, "createdAt"));
            this.scrollToBottom();
          });
      } catch (err) {
        console.log("Error fetching messages: ", err);
      }
    },
    sendMessage() {
      // console.log()
      if (this.inputMessage != null) {
        try {
          firebase
            .database()
            .ref("chatContent/" + this.getUUID())
            .set({
              chatid: this.chatId,
              message: this.inputMessage,
              authorId: this.hostId,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            });
          this.scrollToBottom();
        } catch (err) {
          console.log(err);
          alert("Error");
        }
      }
      this.inputMessage = null;
    },
    getUUID() {
      const { v4: uuidv4 } = require("uuid");
      var uuid = uuidv4();
      console.log(uuid);
      return uuid;
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #fafafa;
  height: 100vh;
}
.title {
  color: #ebebeb;
}
.description {
  color: #ebebeb;
}
.navbar-item {
  padding: 0px;
}
.md-toolbar-section-start {
  margin: 0px;
}
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  width: 170%;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
  padding: ;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
  padding-right: 10px;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_width_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  /* width: 100%; */
  display: inline-block;
}
.sent_width_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  /* width: 100%; */
  display: inline-block;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
  padding-right: 30px;
}
.received_width_msg {
  display: inline-block;
  /* width: auto; */
  /* float: right; */
}
.sent_width_msg {
  display: inline;
  /* width: auto; */
  float: right;
  padding-left: 50px;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  margin-left: -30px;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent_msg {
  /* display: inline-block; */
  padding: 0 0 0 10px;
  vertical-align: top;
  float: right;
  width: 60%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
  width: 170%;
}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
  /* width: 70%; */
}
.msg_history {
  height: 516px;
  width: 170%;
  overflow-y: auto;
  padding-left: 10px;
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
