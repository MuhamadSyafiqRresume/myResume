<template>
  <div class="background">
    <div class="container" border="3px" style="padding:20px">
      <md-dialog-confirm
      :md-active.sync="confirmPaymentDialog"
      md-title="Make Payment Now?"
      md-content=""
      md-confirm-text="Sure"
      md-cancel-text="Cancel"
      @md-cancel="confirmPaymentDialog = false"
      @md-confirm="makePayment()" />

      <grid-layout
        :layout.sync="layout"
        :col-num="8"
        :row-height="50"
        :is-draggable="false"
        :is-resizable="false"
        :responsive="true"
        :vertical-compact="true"
        :use-css-transforms="false"
      >
        <grid-item
          v-for="(item, index) in reservationList"
          v-bind:key="index"
          :x="layout[index].x"
          :y="layout[index].y"
          :w="8"
          :h="5"
          :i="item.i"
        >
          <div
            class="card"
            style="width:200%;margin-top:10px;float:center; margin-left: auto;margin-right: auto;"
          >
            <div class="card-content">
              <div class="content">
                <!-- <p>{{ item.car }}</p>
                <p>{{ index }}</p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <a href="#">@bulmaio</a>. <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->

                <table style="width:100%" class="resultTable">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">

                    <tr>
                        <td rowspan="6" style="width:100px;border:none;">
                            <figure class="cardImage" >
                                <img :src="item.car.carImage" />
                            </figure>
                        </td>
                        <td colspan="3" class="clsValue" style="text-align:center;">
                            <h3>{{item.car.carModel}}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsValue">
                            <h5>Registration Number:</h5>
                        </td>
                        <td class="clsValue2">
                            <h5>{{item.car.registrationNumber}}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsValue">
                            <h5>Rent From:</h5>
                        </td>
                        <td class="clsValue2">
                            <h5>{{item.dateFrom}}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsValue">
                            <h5>Rent From: </h5>
                        </td>
                        <td class="clsValue2">
                            <h5>{{item.dateTo}}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsValue">
                            <h5>Location:</h5>
                        </td>
                        <td class="clsValue2">
                            <h5>{{item.car.city}}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsValue">
                            <h5>Total Price:</h5>
                        </td>
                        <td class="clsValue2">
                            <h5>RM {{item.price}}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="clsValue">
                            <div
                            style=" float:right;"
                            ><md-card-actions md-alignment="space-between">     
                            <b-button icon-left="account" type="is-light" 
                                >Chat
                            </b-button> 
                                &nbsp;
                            <b-button v-if="item.isPaid == false" type="is-success" @click.prevent="confirmPayment(item)"
                                >Make Payment</b-button
                                >
                                <b-button v-if="item.isPaid == true" type="is-success" @click.prevent="returnCar(item.id)"
                                >Return Car</b-button
                                >
                            </md-card-actions>
                            </div>
                        </td>
                    </tr>
                </table>
              </div>
            </div>
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import rentClass from "@/js/class/rent_class.js"; //directory to rent_class.js
import rent from "@/js/rent.js"; //directory to rent.js
export default {
  data() {
    return {
      name: null,
      dataBackgroundColor: "blue",
      billId: null,
      confirmPaymentDialog: false,
      rentObj: new rentClass(),
      reservationList: [
        { x: 0, y: 0, w: 2, h: 5, i: "0" },
        { x: 2, y: 0, w: 2, h: 5, i: "1" },
        { x: 4, y: 0, w: 2, h: 5, i: "2" },
        { x: 6, y: 0, w: 2, h: 5, i: "3" },
        { x: 8, y: 0, w: 2, h: 5, i: "4" },
        { x: 12, y: 0, w: 2, h: 5, i: "4" },

        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 5, w: 2, h: 5, i: "9" },
        { x: 8, y: 5, w: 2, h: 5, i: "10" },
        { x: 12, y: 5, w: 2, h: 5, i: "4" }
      ],
      layouts: [
        { x: 0, y: 0, w: 2, h: 5, i: "0" },
        { x: 2, y: 0, w: 2, h: 5, i: "1" },
        { x: 4, y: 0, w: 2, h: 5, i: "2" },
        { x: 6, y: 0, w: 2, h: 5, i: "3" },
        { x: 8, y: 0, w: 2, h: 5, i: "4" },
        { x: 12, y: 0, w: 2, h: 5, i: "4" },

        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 5, w: 2, h: 5, i: "9" },
        { x: 8, y: 5, w: 2, h: 5, i: "10" },
        { x: 12, y: 5, w: 2, h: 5, i: "4" }
      ]
    };
  },
  async created() {
    this.reservationList = [
      { x: 0, y: 0, w: 2, h: 5, i: "0" },
      { x: 2, y: 0, w: 2, h: 5, i: "1" },
      { x: 4, y: 0, w: 2, h: 5, i: "2" },
      { x: 6, y: 0, w: 2, h: 5, i: "3" },
      { x: 8, y: 0, w: 2, h: 5, i: "4" },
      { x: 12, y: 0, w: 2, h: 5, i: "4" }
    ];
    this.rentObj.guestId = localStorage.userId;
    const result = await rent.approvedReservation(this.rentObj);
    // const result = await rent.approvedReservation(this.rentObj);
    this.reservationList = result;
    console.log(result)
    this.layout = [
      { x: 0, y: 0, w: 2, h: 5, i: "0" },
        { x: 2, y: 0, w: 2, h: 5, i: "1" },
        { x: 4, y: 0, w: 2, h: 5, i: "2" },
        { x: 6, y: 0, w: 2, h: 5, i: "3" },
        { x: 8, y: 0, w: 2, h: 5, i: "4" },
        { x: 12, y: 0, w: 2, h: 5, i: "4" },

        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 5, w: 2, h: 5, i: "9" },
        { x: 8, y: 5, w: 2, h: 5, i: "10" },
        { x: 12, y: 5, w: 2, h: 5, i: "4" },

        { x: 0, y: 10, w: 2, h: 5, i: "6" },
        { x: 2, y: 10, w: 2, h: 5, i: "7" },
        { x: 4, y: 10, w: 2, h: 5, i: "8" },
        { x: 6, y: 10, w: 2, h: 5, i: "9" },
        { x: 8, y: 10, w: 2, h: 5, i: "10" },
        { x: 12, y: 10, w: 2, h: 5, i: "4" }
    ];
  },
  methods: {
    confirmPayment(item){
      localStorage.price = item.price;
      localStorage.rentId = item.id;
      this.confirmPaymentDialog = true;
    },
    async makePayment(){
      var url;
      var billId = 121;
      var totalPrice = parseFloat(localStorage.price) * 100;
      console.log(totalPrice)

      const Billplz = require('billplz')
      const billplz = new Billplz({
        'key': '8eb413b8-5bea-47af-999e-b2e8cb9da708',
        'endpoint': 'https://www.billplz-sandbox.com/api/',
        'sandbox': true
      })
      try{
        // billplz.registration_check('345169621288', function(err, res) {
        //   console.log(res.name);
        //   alert("Check")
        // });
        billplz.create_bill({
          'collection_id': '3_k20woq',
          'description': 'FYP Car Sharing',
          'email': 'afixrazak@gmail.com',
          'name': 'Syafiq Car Sharing',
          'amount': totalPrice, //RM100
          'callback_url': "http://localhost:8081/#/myreservation",
          'redirect_url': "http://localhost:8081/#/thankyou",
          'due_at': '2021-08-31'
        }, function(err, res) {
          console.log(res)
          url = res.url;
          billId = res.id;
          // alert(billId)
          window.location.href = url;
        })
        setTimeout(function(){
          localStorage.billId = billId;
          localStorage.rentId = rentId;
          localStorage.price = item.price;
          // alert("Setting Bill")
          alert(localStorage.price)
        },3000)

      } catch(err) {
        alert(err)
      }
    },
    async returnCar(rentId){
      this.rentObj.id = rentId;
      try{
        const result = await rent.complete(this.rentObj);
        location.reload();
      } catch(err){
        console.log(err)
        alert(err)
      }
    },
  }
};
</script>

<style scoped>
.background {
  background-color: #fafafa;
  height: 100vh;
}
/* .container {
    height
} */
.card {
  max-width: 100%;
  width: 100%;
}
.cardImage {
    width:300px;
}
.clsValue {
    padding: 1px;
    border: none;
    margin-bottom: 40px;
}
.clsValue2 {
    padding: 1px;
    border: none;
    margin-bottom: 40px;
    margin-right:50px
}
.resultTable {
    border: none;
}
.card-content {
    width:1130px;
    height: auto;
}
h3 {
    margin: 5px;
    color: blue;
    font-weight: 1000;
    font-size: 30px;
}
h5 {
    margin: 5px;
    color: rgb(145, 145, 155);
}
.button {
    margin-right:5px;
}
</style>
