<template>
  <div class="background">
    <div class="container" border="3px" style="padding:20px">
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
                        <td rowspan="5" style="width:100px;border:none;">
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
                        <td colspan="4" class="clsValue">
                            <div
                            style=" float:right;"
                            ><md-card-actions md-alignment="space-between">     
                            <b-button icon-left="account" type="is-light" 
                                >Chat
                            </b-button> 
                                &nbsp;
                            <b-button type="is-success" @click.prevent="printPDF()"
                                >Approve</b-button
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
        { x: 12, y: 0, w: 2, h: 5, i: "4" },

        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 5, w: 2, h: 5, i: "9" },
        { x: 8, y: 5, w: 2, h: 5, i: "10" },
        { x: 12, y: 5, w: 2, h: 5, i: "4" }
    ];
    this.rentObj.hostId = localStorage.userId;
    const result = await rent.approvedRequest(this.rentObj);
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
  methods: {}
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
    width:1040px;
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
