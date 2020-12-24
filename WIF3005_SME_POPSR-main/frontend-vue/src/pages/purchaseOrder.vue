<template>
  <div v-if="PSRAvailable" id="app">
    <!-- <div class="content"> -->
      <form action="https://postman-echo.com/post" method="post">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase Order Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content style="width:100%;">
            <div v-show="step === 1">
              <md-card-content>
              <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                <!-- <tr>
                        <td class="clsLabel">
                            <h4>Date:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="date" style="width:98%"></b-input>
                        </td>
                    </tr>-->
                     <tr>
                        <td class="clsLabel">
                            <h4>Our Reference: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="reference" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.reference.required && isPosted">Reference is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Your Quotation:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="quotation" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.quotation.required && isPosted">Quotation is required</div>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <h4>Delivery Due Date:</h4>
                        </td>
                        <td class="clsValue">
                          <div class="block" style="border: 1px solid #dbdbdb; border-radius:4px; padding-left:1em; height:3.5em; width:98%; verticle-align:middle;">
                            <!-- <b-field label="Select datetime"> -->
                              <md-datepicker v-model="dueDate" style="padding-top: 0px;" md-immediately />
                            <div class="error" v-if="!$v.dueDate.required && isPosted">Due Date is required</div>
                          </div>
                        </td>
                    </tr>
                  <tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Mode of Shipment</h4>
                        </td>
                        <td class="clsValue">
                          <b-field>
                            <b-select v-model="modeOfShipment" expanded style="width:98%;">
                                <option value="Land">Land </option>
                                <option value="Ship">Ship</option>\
                                <option value="Air">Air</option>
                            </b-select>
                        </b-field>
                            <div class="error" v-if="!$v.modeOfShipment.required && isPosted">Mode of Shipment is required</div>
                        </td>
                    </tr>
                  <tr>
                        <td class="clsLabel">
                            <h4>CCA No.:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="CCANo" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.CCANo.required && isPosted">CCA Number is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Mode of Payment:</h4>
                        </td>
                        <td class="clsValue">
                          <b-field>
                            <b-select v-model="paymentMode" expanded style="width:98%;">
                                <option value="Debit">Debit </option>
                                <option value="Credit">Credit</option>
                                <option value="As per Invoice">As per Invoice</option>
                            </b-select>
                        </b-field>  
                            <div class="error" v-if="!$v.paymentMode.required && isPosted">Payment Mode is required</div>
                        </td>
                    </tr>
                  <tr>
                        <td class="clsLabel">
                            <h4>To:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="client_name" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.client_name.required && isPosted">Client Name is required</div>
                        </td>
                    </tr>
                  <tr>
                        <td class="clsLabel">
                            <h4>Company:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="company" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.company.required && isPosted">Client Company is required</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Address:</h4>
                        </td>
                        <td class="clsValue">
                          <b-field>
                              <b-input v-model="address1" style="width:98%"></b-input>
                          </b-field>  
                          <div class="error" v-if="!$v.address1.required && isPosted">Field is required</div>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel"></td>
                        <td class="clsValue">
                            <b-input v-model="address2" style="width:98%"></b-input>
                            <div class="error" v-if="!$v.address2.required && isPosted">Field is required</div>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel"> </td>
                        <td class="clsValue">
                            <b-input v-model="address3" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel"> </td>
                        <td class="clsValue">
                            <b-input v-model="address4" style="width:98%"></b-input>
                        </td>
                    </tr>
                
              </table>

              <div class="md-layout"></div>
              <md-button
                class="md-raised md-success"
                @click.prevent="next()"
                style="float:right"
                >Next</md-button
              >
              <md-button
                class="md-raised md-success"
                @click.prevent="back()"
                style="float:right"
                >Back</md-button
              >
              <!-- </div> -->
              </md-card-content>
            </div>

            
          <div v-show="step === 2">
            <!-- <h1>Step Two</h1> -->
            <md-card-content>

              <div
                class="alert alert-info"
                style="background-color:#ffffff; color: black; overflow:yes;"
              >
                <md-card-content class="md-scrollbar">
                  <md-button
                    class="md-raised md-danger"
                    @click="remove()"
                    style="float:right"
                    >Remove</md-button
                  >
                  <md-button
                    class="md-raised md-success"
                    @click="clone()"
                    style="float:right"
                    >Add</md-button
                  >
                  <br /><br /><br />
                </md-card-content>
                <table>
                  <tr>
                    <th style="width:3%">No.</th>
                    <th style="width:40%">Item Description</th>
                    <th style="width:20%">Unit Price(RM)</th>
                    <th style="width:15%">Quantity</th>
                    <th style="width:10%">Total(RM)</th>
                  </tr>
                  <tr v-for="items in desc" :key="items">
                    <td>{{ items.index }}.</td>
                    <td>
                      <b-field>
                        <b-input v-model="items.description" placeholder="">
                        </b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        <b-input
                          v-model="items.unitPrice"
                          placeholder=""
                          type="number"
                        >
                        </b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        <b-input
                          v-model="items.quantity"
                          placeholder=""
                          type="number"
                        >
                        </b-input>
                      </b-field>
                    </td>
                    
                    <td>
                      <b-field>
                        <!-- <b-input disabled type="number" value=items.unitPrice * items.quantity>
                            </b-input> --> </b-field
                      >
                      {{ (items.unitPrice * items.quantity) | numeral("0.00") }}
                    </td>
                    <!-- <td>
                        <div @click="remove()">
                          <md-icon>cancel</md-icon>
                        </div>
                      </td> -->
                  </tr>
                  <br>
                </table>
              </div>
            </md-card-content>
            {{ item }}
            <md-button
              class="md-raised"
              @click.prevent="po_addpo()"
              style="float:right"
              >Submit</md-button
            >
            <md-button
              class="md-raised"
              @click="back()"
              style="float:right"
              >Previous</md-button
            >
            {{ error }}
            <!-- <input type="submit" value="Save"> -->
          </div>
          </md-card-content>
        </md-card>
      </form>
    <!-- </div> -->
  </div>
  <div v-else>
    
  </div>
</template>

<script>
import purchaseOrder from "@/js/po.js"; //directory to po.js
import { SimpleTable,  notifyPO, notifyPSR, psrSearch } from "@/components"; //notifyLeave,
import poClass from "@/js/class/po_class.js"; //directory to po_class.js
import { required, minLength, sameAs, minValue } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      isPosted: false,
      dataBackgroundColor: "blue",
      isEmpty: false,
      
      poObj: new poClass(),
      psr_id: this.$route.params.psr_id,
      PSRAvailable: true,
      inputMethod: '0',
      isSearch: false,
      isEnter: false,
      error: "",
      step: 1,
      index: 2,
      // details: {
      date: new Date(),
      reference: null,
      quotation: null,
      dueDate: null,
      modeOfShipment: null,
      PSRNo: null,
      paymentMode: null,
      CCANo: null,
      po_no: null,
      address1: null,
      address2: null,
      address3: null,
      address4: null,
      client_name: null,
      company: null,
      // },
      desc: [
        {
          index: 1,
          description: null,
          quantity: null,
          unitPrice: null,
          //   price:(quantity*unitPrice)
        }
      ]
    };
  },
  validations: {
    reference: {
      required,
    },
    quotation: {
      required,
    },
    dueDate: {
      required,
    },
    modeOfShipment: {
      required,
    },
    psr_id: {
      required,
    },
    CCANo: {
      required,
    },
    paymentMode: {
      required,
    },
    client_name: {
      required,
    },
    company: {
      required,
    },
    address1: {
      required,
    },
    address2: {
      required,
    }
  },
  // async created() {},
  methods: {
    async po_addpo() {
        alert(this.psr_id)
        this.mapObj();
        console.log(this.poObj);
        alert(this.poObj.psr_id);
        this.isPosted = true;
        if (!this.$v.$invalid){
          try {
            const po = await purchaseOrder.po_add(this.poObj);
            console.log(po); //can be ignored
              // localStorage.message = "Purchase Order Application Submitted";
              // this.$router.push({ path: `/message/${this.id}` });
              this.rerouteToMyApplication();
              this.poCreated();
          } catch (err) {
            alert("Fail");
            this.error = err.message;
            console.log(this.error);
          }
        }
        else
            alert("Fill all the required fields");
      
    },
    mapObj(){
          this.poObj.po_ref = this.reference;
          this.poObj.quotation = this.quotation;
          this.poObj.delv_due = this.dueDate;
          this.poObj.ship_mode = this.modeOfShipment;
          this.poObj.psr_id = this.psr_id;
          this.poObj.cca_no = this.CCANo;
          this.poObj.pay_mode = this.paymentMode;
          this.poObj.cl_name = this.client_name;
          this.poObj.cl_company = this.company;
          this.poObj.address_1 = this.address1;
          this.poObj.address_2 = this.address2;
          this.poObj.address_3 = this.address3;
          this.poObj.address_4 = this.address4;
          this.poObj.po_desc = this.desc;
          this.poObj.branch = localStorage.branch;
          this.poObj.department = localStorage.department;
    },
    prev() {
      this.step--;
    },
    next() {
      this.isPosted = true;
      if (!this.$v.$invalid){
        this.step++;
      }
        else
            alert("Fill all the required fields");
    },
    back(){
      this.$router.push(-1);
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
      this.desc.push({
        index: this.index,
        description: null,
        quantity: null,
        unitPrice: null
      });
      this.index++;
    },
    remove() {
      this.desc.pop({
        description: this.index,
        quantity: 0,
        unitPrice: 0
      });
      this.index--;
    },
    poCreated() {
      this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Purchase Order Created',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
      })
    },
    rerouteToMyApplication(){
      this.$router.push({ path: `/myApplication/${localStorage.id}` });
      this.isLoading = false;
    }
  }
};
</script>

<style scoped src="@/assets/style/style.css">
.md-card {
  width: 1200px;
}
select {
  width: 100%;
}
table td,
table th {
  vertical-align: baseline;
  font-size: 20px;
}
td,
th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}
table {
  widows: 100%;
}
/* tr:nth-child(even) {
  background-color: #59fcff;
} */
.navbar-dark .navbar-nav .nav-link {
  color: white;
}
#body {
  background-color: #120136;
}
</style>
