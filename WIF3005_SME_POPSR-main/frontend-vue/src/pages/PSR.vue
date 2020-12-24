<template>
  <!-- <div id="app"> -->
  <div class="content">
    <form action="https://postman-echo.com/post" method="post">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h1 class="title">Purchase, Service and Requisition Application</h1>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>

        <md-card-content>
          <div v-show="step === 1">
            <md-card-content>
              <div
                class="alert alert-info"
                style="border:1px; background-color:white; color:black;"
              >
                <section>
                  <p><strong>Purchase Classifiaction: </strong></p>
                  <md-radio v-model="pur_class" value="OPEX" class="md-primary"
                    >OPEX</md-radio
                  >
                  <md-radio v-model="pur_class" value="CAPEX" class="md-primary"
                    >CAPEX</md-radio
                  >
                </section>
              </div>
              <div
                class="alert alert-info"
                style="border:1px; background-color:white; color:black;"
              >
                <section>
                  <div class="inline" style="border:1px">
                    <p><strong>Purchase Type: </strong></p>
                    <md-radio
                      v-model="pur_typ"
                      value="PROJECT MATERIALS"
                      class="md-primary"
                      >PROJECT MATERIALS</md-radio
                    >
                    <md-radio
                      v-model="pur_typ"
                      value="PROJECT CONSUMABLES"
                      class="md-primary"
                      >PROJECT CONSUMABLES</md-radio
                    >
                    <md-radio
                      v-model="pur_typ"
                      value="TOOLS AND EQUIPMENT"
                      class="md-primary"
                      >TOOLS AND EQUIPMENT</md-radio
                    >
                    <md-radio
                      v-model="pur_typ"
                      value="TOOLS(CONSUMERABLES)"
                      class="md-primary"
                      >TOOLS(CONSUMERABLES)</md-radio
                    >
                    <md-radio
                      v-model="pur_typ"
                      value="SERVICES"
                      class="md-primary"
                      >SERVICES</md-radio
                    >
                  </div>
                </section>
              </div>
              <div
                class="alert alert-info"
                style="border:1px; background-color:white; color:black;"
              >
                <section>
                  <p><strong>Justification of Purchase: </strong></p>
                  <md-radio
                    v-model="pur_just"
                    value="PROJECT USE(CONSUMERABLES)"
                    class="md-primary"
                    >PROJECT USE(CONSUMERABLES)</md-radio
                  >
                  <md-radio
                    v-model="pur_just"
                    value="OPERATION"
                    class="md-primary"
                    >OPERATION</md-radio
                  >
                  <md-radio
                    v-model="pur_just"
                    value="CONTINUE RENTALS"
                    class="md-primary"
                    >CONTINUE RENTALS</md-radio
                  >
                  <md-radio
                    v-model="pur_just"
                    value="CLIENT MATERIALS"
                    class="md-primary"
                    >CLIENT MATERIALS</md-radio
                  >
                  <md-radio
                    v-model="pur_just"
                    value="SINGLE SOURCE"
                    class="md-primary"
                    >SINGLE SOURCE</md-radio
                  >
                  <md-radio v-model="pur_just" value="OTHERS" class="md-primary"
                    >OTHERS</md-radio
                  >
                </section>
              </div>
              <div style="width:100%;">
                <div
                  class="alert alert-info"
                  style="background-color:white;width:49%; display: inline-block;"
                >
                  <md-datepicker v-model="date_req" md-immediately>
                    <label>Required Date</label>
                  </md-datepicker>
                </div>
                <div
                  class="alert alert-info"
                  style="background-color:white;width:49%; height:120px; display: inline-block; float:right"
                >
                  <section>
                    <p><strong>Delivery: </strong></p>
                    <b-field>
                      <b-select v-model="delv" expanded style="width:98%;">
                        <option value="CIF">CIF </option>
                        <option value="Ex-World">Ex-World</option>\
                        <option value="FOB">FOB</option>
                      </b-select>
                    </b-field>
                  </section>
                </div>
              </div>
              <!-- </div> -->
              <div style="width:100%; ">
                <div
                  class="alert alert-info"
                  style="color: black; background-color:white;width:49%; display: inline-block; float:left"
                >
                  <section>
                    <p><strong>Cost Type: </strong></p>
                    <md-radio
                      v-model="costType"
                      value="UNIT RATE"
                      class="md-primary"
                      >UNIT RATE</md-radio
                    >
                    <md-radio
                      v-model="costType"
                      value="AT COST"
                      class="md-primary"
                      >AT COST</md-radio
                    >
                    <md-radio
                      v-model="costType"
                      value="OVERHEAD"
                      class="md-primary"
                      >OVERHEAD</md-radio
                    >
                    <md-radio
                      v-model="costType"
                      value="COST PLUS"
                      class="md-primary"
                      >COST PLUS</md-radio
                    >
                  </section>
                </div>
                <div
                  class="alert alert-info"
                  style="color: black; background-color:white;width:49%; display: inline-block; float:right"
                >
                  <section>
                    <p><strong>IS APPLICABLE:</strong></p>
                    <md-radio
                      v-model="isApplicable"
                      value="1"
                      class="md-primary"
                      >APPLICABLE</md-radio
                    >
                    <md-radio
                      v-model="isApplicable"
                      value="2"
                      class="md-primary"
                      >NOT APPLICABLE</md-radio
                    >
                  </section>
                </div>
              </div>

              <div
                class="md-layout"
                v-show="isApplicable === '1'"
                style="float:right;"
              >
                <md-button
                  class="md-raised md-success"
                  @click.prevent="next()"
                  style="float:right"
                  >Next</md-button
                >
              </div>
              <div
                class="md-layout"
                v-show="isApplicable === '2'"
                style="float:right;"
              >
                <md-button
                  class="md-raised md-success"
                  @click.once="psr_adds()"
                  style="float:right"
                  >Submit</md-button
                >
              </div>
            </md-card-content>
            {{ costType }}
          </div>
          <div v-show="step === 2">
            <!-- <h1>Step Two</h1> -->
            <md-card-content>
              <div class="alert alert-info" style="background-color:white;">
                <section>
                  <b-field label="Project Title:">
                    <b-input v-model="p_title"></b-input>
                  </b-field>
                </section>
                <!-- </div>
                <div class="alert alert-info" style="background-color:white;"> -->
                <section>
                  <b-field label="Vessel Code">
                    <b-input v-model="vessel_cd"></b-input>
                  </b-field>
                </section>
              </div>

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
                    <th>No.</th>
                    <th style="width:1600px">Item Description</th>
                    <th style="width:250px">Unit Price(RM)</th>
                    <th style="width:250px">Quantity</th>
                    <th style="width:250px">Cost Code</th>
                    <th style="width:250px">Remarks</th>
                    <th>Total(RM)</th>
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
                        <b-input v-model="items.costCode" placeholder="">
                        </b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        <b-input v-model="items.remarks" placeholder="">
                        </b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        <!-- <b-input disabled type="number" value=items.unitPrice * items.quantity>
                            </b-input> -->
                      </b-field>
                      {{
                        (items.unitPrice * items.quantity) | numeral("0,0.00")
                      }}
                    </td>
                    <!-- <td>
                        <div @click="remove()">
                          <md-icon>cancel</md-icon>
                        </div>
                      </td> -->
                  </tr>
                </table>
              </div>
            </md-card-content>
            {{ item }}
            <md-button
              class="md-raised md-success"
              @click.prevent="psr_adds()"
              style="float:right"
              >Submit</md-button
            >
            <md-button
              class="md-raised"
              @click.prevent="prev()"
              style="float:right"
              >Previous</md-button
            >
            {{ error }}
            <!-- <input type="submit" value="Save"> -->
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
  <!-- </div> -->
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import psrs from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to admin.js
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    let dateFormat = this.$material.locale.dateFormat || "yyyy-MM-dd";
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      costType: "",
      radio: "",
      radio2: "",
      error: "",
      step: 1,
      index: 2,
      isApplicable: "0",
      psr_no: "",
      date: new Date().toJSON().slice(0, 10),
      psr_data: "",
      pur_class: "",
      pur_typ: "",
      pur_just: "",
      date_req: "",
      p_title: "",
      vessel_cd: "",
      delv: "",
      psrObj: new psrClass(),
      desc: [
        //must be in json format
        {
          index: 1,
          description: null,
          quantity: "",
          unitPrice: "",
          costCode: "",
          remarks: ""
          //   price:(quantity*unitPrice)
        }
      ]
    };
  },
  async created() {
    try {
      const clog = await user.check_logged();
      if (clog.err) {
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
  },
  validations: {
    pur_class: {
      required
    },
    pur_typ: {
      required
    },
    pur_just: {
      required
    },
    date_req: {
      required
    },
    delv: {
      required
    },
    costType: {
      required
    }
  },

  methods: {
    async psr_adds() {
      if (!this.$v.$invalid) {
        try {
          this.mapObj();
          console.log(this.psrObj);
          console.log(localStorage.branch);
          console.log(localStorage.department);
          const psr = await psrs.psr_add(this.psrObj);
          // console.log("PSR");
          console.log(psr); //can be ignored
          //add redirect to other page here
          // alert("Success");
          localStorage.message = "PSR Application Submitted";
          // this.$router.push({ path: `/message/${this.id}` });
          this.$router.push({ path: `/myApplication/${this.id}` });
          this.psrCreated();
        } catch (err) {
          this.error = err.message;
          alert("Error!!!" + err);
        }
      } else alert("Fill all fields");
    },
    prev() {
      this.step--;
    },
    next() {
      // To calculate the time difference of two dates
      var today = new Date();
      var Difference_In_Time = new Date(this.date_req) - today;
      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (!this.$v.$invalid) {
        if (Difference_In_Time > 0) this.step++;
        else alert("Required date must later than todays date");
      } else alert("Fill all fields");
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
    mapObj() {
      this.psrObj.purchase_class = this.pur_class;
      this.psrObj.purchase_typ = this.pur_typ;
      this.psrObj.purchase_just = this.pur_just;
      this.psrObj.cost_typ = this.costType;
      this.psrObj.date_req = this.date_req;
      this.psrObj.project_title = this.p_title;
      this.psrObj.vessel_code = this.vessel_cd;
      this.psrObj.delv = this.delv;
      this.psrObj.psr_desc = this.desc;
      this.psrObj.branch = localStorage.branch;
      this.psrObj.department = localStorage.department;
    },
    deleteRow(index) {
      this.inputs.splice(index, 1);
    },
    clone() {
      if (this.desc[this.index - 2].description) {
        this.desc.push({
          index: this.index,
          description: null,
          quantity: null,
          unitPrice: null
        });
        this.index++;
      } else {
        alert("Cannot add row.");
      }
    },
    remove() {
      this.desc.pop({
        description: this.index,
        quantity: 0,
        unitPrice: 0
      });
      this.index--;
    },
    psrCreated() {
      this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Purchase, Service and Requisition Created',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
      })
    },
  }
};
</script>

<style scoped>
.md-card {
  width: 100%;
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
