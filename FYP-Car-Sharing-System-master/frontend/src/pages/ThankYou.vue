<template>
  <div class="background">
    <TopNavbarGuest />
    <div class="container" border="3px" height="5000px">
      <h1>Thank you for the payment</h1>
    </div>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import rentClass from "@/js/class/rent_class.js"; //directory to rent_class.js
import rent from "@/js/rent.js"; //directory to rent.js
import paymentClass from "@/js/class/payment_class.js"; //directory to rent_class.js
import payment from "@/js/payment.js"; //directory to rent.js
import sleep from "await-sleep";
import TopNavbarGuest from "./Layout/TopNavBarGuest.vue";

export default {
  components: {
    TopNavbarGuest
  },
  data() {
    return {
      name: null,
      rentObj: new rentClass(),
      paymentObj: new paymentClass(),
      results: null
    };
  },
  async created() {
    var result;
    const Billplz = require("billplz");
    try {
      const billplz = new Billplz({
        key: "8eb413b8-5bea-47af-999e-b2e8cb9da708",
        endpoint: "https://www.billplz-sandbox.com/api/",
        sandbox: true
      });
      billplz.get_bill(localStorage.billId, function(err, res) {
        console.log("Res:",res);
        result = res;
        //   setTimeout(gotoReservation,5000);
      });
      //   setTimeout(async function() {
      //     this.results = result;
      //     console.log(this.results)
      //     this.paymentCompleted();
      //   }, 3000);
      await sleep(3000);
      this.results = result;
      console.log("Results: ",this.results);
      this.paymentCompleted();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },
  methods: {
    gotoReservation() {
      this.$router.push({ path: `/myreservation` });
    },
    async paymentCompleted() {
      this.rentObj.id = localStorage.rentId;
      this.paymentObj.rentId = localStorage.rentId;
      this.paymentObj.amount = localStorage.price;
      this.paymentObj.billId = localStorage.billId;
      if (this.results.state == "paid") {
        try {
          this.paymentObj.status = "Success";
          const result = await rent.pay(this.rentObj);
          const result2 = await payment.addPayment(this.paymentObj);
          this.$router.push({ path: `/myreservation` });
        } catch (err) {
          alert(err);
        }
      } else {
        try {
          this.paymentObj.status = "Fail";
          const result = await rent.pay(this.rentObj);
          this.$router.push({ path: `/myreservation` });
        } catch (err) {
          alert(err);
        }
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
</style>
