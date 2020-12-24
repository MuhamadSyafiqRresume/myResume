<template>
  <div class="container" border="3px">
    <!-- C
      {{error}} -->
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">PURCHASE SERVICE AND REQUISITION DETAILS</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content>
        <div v-if="action == 'status' || action == 'audit'" style="width:80%; margin-left:10%;">
          <div
            v-if="psrs.status_decline == false && psrs.status_t2 == false"
            @click="showDialog = true"
            class="alert alert-warning"
            style="border-radius:30px;"
          >
            <h4>
              <center><strong> Status: Pending </strong></center>
            </h4>
          </div>
          <div
            v-else-if="psrs.status_decline == true"
            @click="showDialog = true"
            class="alert alert-danger"
            style="border-radius:30px;"
          >
            <h4>
              <center><strong> Status: Declined </strong></center>
            </h4>
          </div>
          <div
            v-else
            class="alert alert-success"
            style="border-radius:30px;"
            @click="showDialog = true"
          >
            <h4>
              <center><strong> Status: Approved </strong></center>
            </h4>
          </div>
        </div>
        <br />
        <table cls="clsForm" width="80%:">
                <col width="35%">
                <col width="60%">
                <tr>
                    <td class="clsLabel">
                        <h4>Purchase Classification:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.purchase_class }} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Purchase Type:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.purchase_typ }} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Justification of Purchase:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.purchase_just }} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Required Date:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.date_req | moment("Do MMMM YYYY")}} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4>Delivery:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.delv }} </h4>
                    </td>
                </tr>
                <tr>
                    <td class="clsLabel">
                        <h4> COST TYPE:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.cost_typ }} </h4>
                    </td>
                </tr>
                <tr v-if="psrs.project_title">
                    <td class="clsLabel">
                        <h4> Project Title:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.project_title }} </h4>
                    </td>
                </tr>
                <tr v-if="psrs.vessel_code">
                    <td class="clsLabel">
                        <h4> Vessel Code:</h4>
                    </td>
                    <td class="clsValue">
                       <h4> {{ psrs.vessel_code }} </h4>
                    </td>
                </tr>
            </table>

        <!-- <div>Passed: {{psrs}}</div> -->
        <div
          class="alert alert-info"
          style="background-color:#ffffff;width:100%; display: inline-block;"
        >
          <b-table
            :data="isEmpty ? [] : psrs.psr_desc"
            :striped="true"
            :hoverable="true"
          >
            <template slot-scope="props">
              <b-table-column field="index" label="No" width="3%" >
                {{ props.row.index }}
              </b-table-column>
              <b-table-column
                field="description"
                label="Description"
                width="20%"
                
              >
                {{ props.row.description }}
              </b-table-column>
              <b-table-column field="unitPrice" label="Price" width="7%" centered>
                RM {{ props.row.unitPrice | numeral("0,0.00") }}
              </b-table-column>
              <b-table-column field="quantity" width="5%" label="Quantity" centered>
                {{ props.row.quantity }}
              </b-table-column>
              <b-table-column field="costCode" label="Cost Code" width="5%" centered="" >
                {{ props.row.costCode }}
              </b-table-column>
              <b-table-column field="remarks" label="Remark" width="10%" >
                {{ props.row.remarks }}
              </b-table-column>
              <b-table-column
                field="total"
                label="Total Price"
                align="right"
                width="5%"
                margin-left="0px"
                numeric
              >
                <!-- <div style="float:left;">RM</div> -->
                <!-- <div style="float=right;"> -->
                  RM {{
                    (props.row.quantity * props.row.unitPrice) | numeral("0,0.00")
                  }}
                <!-- </div> -->
              </b-table-column>
            </template>
          </b-table>
          <div style="float:right;">
            <p>-------------------------</p>
          </div>
        </div>
        <div
          v-if="action == 'approval'"
          style=" margin-left: 40%; margin-right: 40%;"
        ><md-card-actions md-alignment="space-between">
          <b-button
            style="float:left;"
            type="is-success"
            @click.prevent="approve()"
            >Approve</b-button
          >
          <b-button style="float:right;" type="is-danger" @click.prevent="decline_psr()"
            >Decline</b-button
          ></md-card-actions>
        </div>
        <div
          style=" float:right;"
        ><md-card-actions md-alignment="space-between">     
          <b-button type="is-light" @click="$router.go(-1)"
              >Back</b-button> 
              &nbsp;
          <b-button type="is-success" @click.prevent="printPDF()" v-if="action == 'audit'"
              >Generate</b-button
            >
          </md-card-actions>
        </div>
        <!-- {{ psrs }} -->
        <br /><br /><br />
        
        <md-dialog :md-active.sync="showDialog" style="width:100%; overflow:auto;">
            <md-dialog-title>Purchase Order Details</md-dialog-title>
            <md-content>
              <table cls="clsFormDetails" width="95%:" style="margin-left: 3%;">
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                    <!-- creator -->
                    <tr>
                      <td class="clsHeader" colspan="4">
                        <h4>Creator</h4>
                      </td>
                    </tr>
                    <tr>
                        <td class="clsLabelDetails">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{psrs.create_user_psr.firstname}}{{psrs.create_user_psr.lastname}}</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Created </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{psrs.createdAt | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
                    <!-- Approver T2 -->
                    <tr v-if="psrs.t2_user_psr"> 
                      <td class="clsHeader" colspan="4">
                        <h4>Approver T2</h4>
                      </td>
                    </tr>
                    <tr v-if="psrs.t2_user_psr">
                        <td class="clsLabelDetails" colspan="2">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails" colspan="2">
                            <h4>{{psrs.t2_user_psr.firstname}}{{psrs.t2_user_psr.lastname}}</h4>
                        </td>
                    </tr>
                    <tr v-if="psrs.t2_user_psr">
                        <td class="clsLabelDetails">
                            <h4>Status </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4 v-if="psrs.status_t1_1">Approved</h4>
                            <h4 v-else>Declined</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Approved </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{psrs.date_pending_1 | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
                    <!-- Approver T3 -->
                    <tr v-if="psrs.t3_user_psr">
                      <td class="clsHeader" colspan="4">
                        <h4>Approver T3</h4>
                      </td>
                    </tr>
                    <tr v-if="psrs.t3_user_psr">
                        <td class="clsLabelDetails" colspan="2">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails" colspan="2">
                            <h4>{{psrs.t3_user_psr.firstname}}{{psrs.t3_user_psr.lastname}}</h4>
                        </td>
                    </tr>
                    <tr v-if="psrs.t3_user_psr">
                        <td class="clsLabelDetails">
                            <h4>Status </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4 v-if="psrs.status_t1_2">Approved</h4>
                            <h4 v-else>Declined</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Approved </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{psrs.date_pending_2 | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
                    <!-- Approver T4 -->
                    <tr v-if="psrs.approver_psr" >
                      <td class="clsHeader" colspan="4">
                        <h4>Approver T4</h4>
                      </td>
                    </tr>
                    <tr v-if="psrs.approver_psr">
                        <td class="clsLabelDetails" colspan="2">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails" colspan="2">
                            <h4>{{psrs.approver_psr.firstname}}{{psrs.approver_psr.lastname}}</h4>
                        </td>
                    </tr>
                    <tr v-if="psrs.approver_psr">
                        <td class="clsLabelDetails">
                            <h4>Status </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4 v-if="psrs.status_t2">Approved</h4>
                            <h4 v-else>Declined</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Approved </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{psrs.date_approve | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
              </table>
              <br><br><br>
              <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
              </md-dialog-actions>
            </md-content>
          </md-dialog>
      </md-card-content>
    </md-card>
    <!-- <div>Before: {{psr_no}}</div>
<br> -->
    <!-- <div>Passed: {{psrs}}</div> -->
  </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to psr_class.js
import generatePSR from "@/js/generatePSR.js"; //directory to generatePSR.js

export default {
  name: "display-PSR",
  data() {
    return {
      psrObj: new psrClass(),
      psrs: [],
      id: this.$route.params.id,
      psr_no: this.$route.params.psr_no,
      psr_id: this.$route.params.psr_id,
      action: this.$route.params.action,
      error: "",
      status_t1: "",
      showDialog: false,
      totalPrice: 0,
      i: 0,
      t4: localStorage.t4,
      t3: localStorage.t3,
      dataBackgroundColor: "blue",
      isEmpty: false,
    };
  },
  async created() {
    try {
      this.psrObj.in_page = 1;
      // this.psrObj._psr_no = this.psr_no;
      this.psrObj._id = this.psr_id;
      const data = await psr.report(this.psrObj);
      this.psrs = data;
      console.log(this.psrObj._id);
      console.log(data);
      for (this.i = 0; this.i < data.psr_desc.length; this.i++) {
        this.totalPrice =
          this.totalPrice +
          data.psr_desc[this.i].quantity * data.psr_desc[this.i].unitPrice;
      }
      console.log(this.totalPrice);
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
  },
  methods: {
    detail(value) {
      console.log(value.po_no);
      this.$router.push({ path: `/displayPO/${this.id}/${value.po_no}` });
    },
    printPDF() {
      generatePSR.printPDF(this.psrs);
		},
    async approve() {
      this.psrObj._id = this.psrs.id;
      if (localStorage.t2 == "true" || this.t3 == "true") {
        try {
          const psra = await psr.psr_stat_1(this.psrObj);
          this.status_t1 = psra.status_t1;
          console.log(psra); //can be ignored
          // localStorage.message = "PSR Application Approved";
          // this.$router.push({ path: `/message/${this.id}` });
        } catch (err) {
          this.error = err.message;
        }
      } else if (localStorage.t4 == "true") {
        try {
          const psra = await psr.psr_stat_2(this.psrObj);
          this.status_t2 = psra.status_t1;
          console.log(psra); //can be ignored
          // localStorage.message = "PSR Application Approved";
          // this.$router.push({ path: `/message/${this.id}` });
        } catch (err) {
          this.error = err.message;
        }
      } else {
        alert(
          "Invalid user! Only manager tier 1 & 2 can approve record. Please contact system admin for assistance."
        );
      }
      this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Purchase, Service and Requisition Approved',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
      })
      this.$router.push({ path: `/notification/${this.id}` });
    },
    async decline_psr() {
      try {
        this.psrObj._id = this.psrs.id;
        const data = await psr.psr_decline(this.psrObj);
        console.log(data); //can be ignored
        this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Purchase, Service and Requisition Declined',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
        })
        this.$router.push({ path: `/notification/${this.id}` });
      } catch (err) {
        this.error = err.message;
        alert(err);
      }
    },
    async get_pending() {
      try {
        const data = await po.get_submits(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
        return this.pos;
      } catch (err) {
        this.error = err.message;
        return this.error;
      }
    },
    async get_submits() {
      try {
        const data = await po.get_pending(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async find() {
      try {
        const data = await po.find(this.po_no);
        this.pos = data.map(pos => ({
          ...pos,
          createdAt: new Date(pos.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    //create in vue:
    // if page == 1, hide previous button, show next button
    // if page == total_page, show previous button, show next button
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) this.isNext = true;
      try {
        const data = await po.show_po_page(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async previousPage() {
      this.isNext = false;
      if (this.page <= 1) {
        this.page = 1;
        this.isPrevious = true;
      } else this.page -= 1;
      if (this.page == 1) this.isPrevious = true;
      try {
        const data = await po.show_po_page(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async pagination() {
      if (this.page >= this.total_page) {
        this.page = this.total_page;
        this.isNext = false;
      } else if (this.page < 1) {
        this.page = 1;
        this.isPrevious = false;
      } else this.page = 1;
      try {
        const data = await po.show_po_page(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    
  }
};
</script>

<style src="@/assets/style/style.css">
/* strong{
  color: white;
} */
.alert {
  padding: 2px 15px;
  color: #fff;
}
.md-card {
  display: inline-block;
  position: relative;
  /* width: 390%; */
  width: 1000px;
  margin: 25px 0;
  overflow: auto;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
}
.md-textarea {
  border: 1px solid #ccc !important;
  border-radius: 16px;
}
tr {
  border: 1px;
}
</style>
