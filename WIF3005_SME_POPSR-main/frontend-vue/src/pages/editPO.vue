<template>
  <div id="app">
    <div class="content">
      <form action="https://postman-echo.com/post" method="post">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase Order Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content>
            <div v-show="step === 1">
              <table style="width:100%">
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <td class="desc">Date:</td>
                  <td>
                    <md-field>
                      <md-input type="date" v-model="details.dates"
                        >Date</md-input
                      >
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Our Reference:</td>
                  <td>
                    <md-field>
                      <md-input v-model="details.reference"></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Your Quotation:</td>
                  <td>
                    <md-field>
                      <md-input v-model="details.quotation"></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Delivery Due Date:</td>
                  <td>
                    <md-field>
                      <md-input
                        type="date"
                        v-model="details.dueDate"
                      ></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Mode of Payment:</td>
                  <td>
                    <md-field>
                      <select v-model="details.paymentMode">
                        <option disabled value>Please select one</option>
                        <option>Land</option>
                        <option>Ship</option>
                        <option>Air</option>
                      </select>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">PSR No.:</td>
                  <td>
                    <md-field>
                      <md-input v-model="details.PSRNo"></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">CCA No.:</td>
                  <td>
                    <md-field>
                      <md-input v-model="details.CCANo"></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Mode of Payment:</td>
                  <td>
                    <md-field>
                      <!-- <label>Company (disabled)</label> -->
                      <select>
                        <option disabled value>Please select one</option>
                        <option>Debit</option>
                        <option>Credit</option>
                        <option>As per invoice</option>
                      </select>
                    </md-field>
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
              {{ details }}
              <!-- </div> -->
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

              <md-button
                class="md-raised md-success"
                @click.prevent="po_add()"
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
              {{ item }}
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import user from "@/js/po.js"; //directory to po.js
export default {
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      step: 1,
      index: 2,
      details: {
        date: new Date(),
        reference: null,
        quotation: null,
        dueDate: null,
        modeOfShipment: null,
        PSRNo: null,
        paymentMode: null,
        CCANo: null,
        po_no: null,
        address: null
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
    async po_add() {
      try {
        const po = await po.po_add(
          this.details.po_no,
          this.date,
          this.details.reference,
          this.details.dueDate,
          this.details.modeOfShipment,
          this.details.PSRNo,
          this.details.CCANo,
          this.details.paymentMode,
          this.details.address,
          this.details.quotation,
          this.item
        );
        console.log(po); //can be ignored
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
