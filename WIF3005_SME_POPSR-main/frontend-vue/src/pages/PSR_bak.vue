<template>
  <div id="app">
    <div class="content">
      <form action="https://postman-echo.com/post" method="post">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase, Service and Requisition Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content>
            <div v-show="step === 1" class="container is-fullhd">
              <md-card-content>
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                      <p><strong>Purchase Classifiaction: </strong></p>
                      <b-radio v-model="purchaseClassification"
                          name="name"
                          native-value="OPEX">
                          OPEX
                      </b-radio>
                      <b-radio v-model="radio"
                          name="name"
                          native-value="CAPEX">
                          CAPEX
                      </b-radio>
                  
                </section>
              </div>
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                  <div class="inline" style="border:1px">
                      <p><strong>Purchase Type: </strong></p>
                      <b-radio v-model="purchaseType"
                          name="name"
                          native-value="PROJECT VALUE">
                          PROJECT VALUE
                      </b-radio>
                      <b-radio v-model="purchaseType"
                          name="name"
                          native-value="PROJECT CONSUMABLES">
                          PROJECT CONSUMABLES
                      </b-radio>
                      <b-radio v-model="purchaseType"
                          name="name"
                          native-value="TOOLS AND EQUIPMENT">
                          TOOLS AND EQUIPMENT
                      </b-radio>
                      <b-radio v-model="purchaseType"
                          name="name"
                          native-value="C">
                          TOOLS AND EQUIPMENT
                      </b-radio>
                      <b-radio v-model="purchaseType"
                          name="name"
                          native-value="SERVICES">
                          SERVICES
                      </b-radio>
                  </div>
                </section>
              </div>
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                      <p><strong>Justification of Purchase: </strong></p>
                      <div  style="border:1px; display:block;">
                      <b-radio v-model="purchaseJustification"
                          name="name"
                          native-value="PROJECT USE(CONSUMABLES)">
                          PROJECT USE(CONSUMABLES)
                      </b-radio>
                      <b-radio v-model="purchaseJustification"
                          name="name"
                          native-value="OPERTATIONS">
                          OPERTATIONS
                      </b-radio>
                      <b-radio v-model="purchaseJustification"
                          name="name"
                          native-value="CONTINUE RENTALS">
                          CONTINUE RENTALS
                      </b-radio>
                      </div>
                      <div style="border:1px;">
                      <b-radio v-model="purchaseJustification"
                          name="name"
                          native-value="CLIENT MATERIALS">
                          CLIENT MATERIALS
                      </b-radio>
                      <b-radio v-model="purchaseJustification"
                          name="name"
                          native-value="SINGLE SOURCE">
                          SINGLE SOURCE
                      </b-radio>
                      <b-radio v-model="purchaseJustification"
                          name="name"
                          native-value="OTHERS">
                          OTHERS
                      </b-radio>
                      </div>
                  
                </section>
              </div>
              <div class="alert alert-info" style="background-color:white;">
                  <section>
                    <md-datepicker v-model="dateRequired">
                      <label>Select date</label>
                    </md-datepicker>
                  </section>
              </div>
              </md-card-content>
            <!-- </div> -->
            <div class="alert alert-info" style="background-color:white;">
              <section>
                <b-field horizontal label="Subject" type="is-danger" message="Please enter a subject" style="align:left; ">
                    <b-input name="subject" ></b-input>
                </b-field>
              </section>
            </div>
            <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                      <p><strong>IS APPLICABLE:{{isApplicable}}</strong></p>
                      <b-radio v-model="isApplicable"
                          name="name"
                          native-value="1">
                          APPLICABLE
                      </b-radio>
                      <b-radio v-model="isApplicable"
                          name="name"
                          native-value="0">
                          NOT APPLICABLE
                      </b-radio>
                </section>
              </div>
              <div class="md-layout" v-show="isApplicable === '1'" style="float:right;">
                  <md-button
                    class="md-raised md-success"
                    @click.prevent="next()"
                    style="float:right"
                    >Next</md-button>
                  </div>
                </div>
            <div v-show="step === 2">
              <md-card-content>
                <md-button
                  class="md-raised md-success"
                  @click="clone()"
                  style="float:left"
                  >Add</md-button
                >
                <br /><br /><br />
              </md-card-content>
              <!-- <h1>Step Two</h1> -->
              <md-card-content>
                <table>
                  <tr>
                    <th>No.</th>
                    <th>Item Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                  <tr v-for="items in item" :key="items.desccription">
                    <td>{{ items.index }}</td>
                    <td>
                      <md-field>
                        <!-- <label>Company (disabled)</label> -->
                        <md-input v-model="items.description"></md-input>
                      </md-field>
                    </td>
                    <td>
                      <md-field>
                        <!-- <label>Company (disabled)</label> -->
                        <md-input v-model="items.unitPrice"></md-input>
                      </md-field>
                    </td>
                    <td>
                      <md-field>
                        <!-- <label>Company (disabled)</label> -->
                        <md-input v-model="items.quantity"></md-input>
                      </md-field>
                    </td>
                    <td>{{ items.unitPrice * items.quantity }}</td>
                    <td>
                      <div @click="remove()">
                        <md-icon>cancel</md-icon>
                      </div>
                    </td>
                  </tr>
                </table>
              </md-card-content>
              {{ item }}
              <md-button
                class="md-raised md-success"
                @click.prevent="psr_add()"
                style="float:right"
                >Save</md-button
              >
              <md-button
                class="md-raised md-success"
                @click.prevent="prev()"
                style="float:right"
                >Previous</md-button
              >
              <!-- <input type="submit" value="Save"> -->
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
export default {
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      error: "",
      step: 1,
      index: 2,
        isApplicable: '0',
      details: {
        psr_no: null,
        services: null,
        purchaseClassification: null,
        purchaseType: null,
        purchaseJustification: null,
        dateRequired: null,
        delivery: null,
        projectTitle: null,
        vesselCode: null,
        date: new Date(),
        psr_data: null,
      },
      item: [
        {
          index: 1,
          description: null,
          quantity: 0,
          unitPrice: 0
          //   price:(quantity*unitPrice)
        }
      ]
    };
  },
  async created() {},
  methods: {
    async psr_add() {
      try {
        const psr = await psr.psr_add(
          this.details.psr_no,
          this.details.date,
          this.details.psr_data,
          this.details.purchaseClassification,
          this.details.purchaseType,
          this.details.purchaseJustification,
          this.details.dateRequired,
          this.details.projectTitle,
          this.details.vesselCode,
          this.details.delivery,
          this.item
        );
        console.log(psr); //can be ignored
        //add redirect to other page here
      } catch (err) {
        this.error = err.message;
      }
    },
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
      this.item.push({
        index: this.index,
        description: null,
        quantity: 0,
        unitPrice: 0
      });
      this.index++;
    },
    remove() {
      this.item.pop({
        description: this.index,
        quantity: 0,
        unitPrice: 0
      });
      this.index--;
    }
  }
};
</script>

<style scoped>
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
