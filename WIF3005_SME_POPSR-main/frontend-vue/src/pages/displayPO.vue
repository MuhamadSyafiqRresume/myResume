<template>
  <div class="container" border="3px" height="5000px" style="display:block">
    <form>
      <md-card>
        
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Purchase Order Details</h4>
        </md-card-header>
        <md-card-content>
          <b-loading
            :is-full-page="true"
            :active.sync="isLoading"
            :can-cancel="true"
          ></b-loading>
          <div v-if="action == 'status' || action == 'audit'" style="width:80%; margin-left:10%;">
            <div
              v-if="pos.status_decline == false && pos.status_t2 == false"
              @click="showDialog = true"
              class="alert alert-warning"
              style="border-radius:30px;"
            >
              <h4>
                <center><strong> Status: Pending </strong></center>
              </h4>
            </div>
            <div
              v-else-if="pos.status_decline == true"
              class="alert alert-danger"
              style="border-radius:30px;"
              @click="showDialog = true"
            >
              <h4>
                <center><strong> Status: Declined </strong></center>
              </h4>
            </div>
            <div v-else class="alert alert-success" style="border-radius:30px;" @click="showDialog = true">
              <h4>
                <center><strong> Status: Approved </strong></center>
              </h4>
            </div>
          </div>
          <div
            class="alert alert-info"
            style="background-color:white; color:black;"
          >
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
                <th></th>
                <th></th>
              </tr>
              <tr>
                <td style="width:50%">
                  <b>{{ pos.cl_company }}</b>
                </td>
                <td>
                  <p><b>Purchase Order Number:</b></p>
                </td>
                <td>
                  <p>{{ pos.po_no }}</p>
                </td>
              </tr>
              <tr>
                <td rowspan="1"><b>Address:</b></td>
                <td>
                  <p><b>Date</b></p>
                </td>
                <td>
                  <p>{{ pos.createdAt | moment("Do MMMM YYYY") }}</p>
                </td>
              </tr>
              <!-- <tr>
              <td>
                <p><b>Page:</b></p>
              </td>
              <td>
                <p>{{ Page_no }}</p>
              </td>
            </tr> -->
              <tr>
                <td rowspan="1"> {{ pos.address_1 }}</td>
                <td>
                  <p><b>Our Ref:</b></p>
                </td>
                <td>
                  <p>{{ pos.po_ref }}</p>
                </td>
              </tr>
              <tr>
                <td rowspan="1"> {{ pos.address_2 }}</td>
                <td>
                  <p><b>Your Quotation:</b></p>
                </td>
                <td>
                  <p>{{ pos.quotation }}</p>
                </td>
              </tr>
              <tr>
                <td rowspan="1"> {{ pos.address_3 }}</td>
                <td>
                  <p><b>Delivery Due Date:</b></p>
                </td>
                <td>
                  <p>{{ pos.delv_due | moment("Do MMMM YYYY") }}</p>
                </td>
              </tr>
              <tr>
                <td rowspan="3"> {{ pos.address_4 }}</td>
                <td>
                  <p><b>Mode of Shipment:</b></p>
                </td>
                <td>
                  <p>{{ pos.ship_mode }}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p><b>PSR No.:</b></p>
                </td>
                <td>
                  <p>{{ pos.psr.no }}</p>
                  <!-- <p>
                    PO/TRD-000004
                  </p> -->
                </td>
              </tr>
              <tr>
                <td>
                  <p><b>CCA No.:</b></p>
                </td>
                <td>
                  <p>{{ pos.cca_no }}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p><b>To: </b> {{ pos.cl_name }}</p>
                </td>
                <td>
                  <p><b>Mode of Payment:</b></p>
                </td>
                <td>
                  <p>{{ pos.pay_mode }}</p>
                </td>
              </tr>
            </table>
          </div>
          <!-- <div>
            <md-table
              style="width:100%"
              v-model="pos.po_desc"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              md-card
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Description">{{
                  item.description
                }}</md-table-cell>
                <md-table-cell md-label="Quantity">{{
                  item.quantity
                }}</md-table-cell>
                <md-table-cell md-label="Price">{{ item.unitPrice }}</md-table-cell>
                <md-table-cell md-label="Total Price"
                  ><b>RM {{ item.quantity * item.unitPrice }}</b></md-table-cell
                >
              </md-table-row>
            </md-table>
          </div> -->
          <div
            v-if="pos.po_desc"
            class="alert alert-info"
            style="background-color:white;"
          >
            <b-table
              :data="isEmpty ? [] : pos.po_desc"
              :striped="true"
              :hoverable="true"
            >
              <template slot-scope="props">
                <b-table-column field="index" label="No" width="5%" centered>
                  {{ props.row.index }}
                </b-table-column>
                <b-table-column
                  field="description"
                  label="Description"
                  width="45%"
                >
                  {{ props.row.description }}
                </b-table-column>
                <b-table-column field="unitPrice" label="Price" centered>
                  RM {{ props.row.unitPrice | numeral("0,0.00") }}
                </b-table-column>
                <b-table-column field="quantity" label="Quantity" centered>
                  {{ props.row.quantity }}
                </b-table-column>
                <b-table-column
                  field="total"
                  label="Total Price"
                  align="right"
                  width="15%"
                  margin-left="0px"
                >
                  <div style="float:left;">RM</div>
                  <div style="float=right;">
                    {{
                      (props.row.quantity * props.row.unitPrice)
                        | numeral("0,0.00")
                    }}
                  </div>
                </b-table-column>
              </template>
            </b-table>
          </div>
          <br /><br />
          <div
            v-if="action == 'approval'"
            style=" margin-left: 40%; margin-right: 40%;"
          ><md-card-actions md-alignment="space-between">
            <b-button type="is-success" @click.prevent="approve()"
              >Approve</b-button
            >
            <b-button type="is-danger" @click.prevent="decline_po()"
              >Decline</b-button
            >
            </md-card-actions>
          </div>
          <div style=" float:right;" >
            <md-card-actions md-alignment="space-between">       
              <b-button type="is-light" @click="$router.go(-1)"
                  >Back</b-button> 
                  &nbsp;
              <b-button type="is-success" @click.prevent="printPDF()" v-if="action == 'audit'"
                  >Generate PDF</b-button>
            </md-card-actions>
          </div>
          
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
                            <h4>{{pos.create_user_po.firstname}}{{pos.create_user_po.lastname}}</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Created </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.createdAt | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
                    <!-- Approver T2 -->
                    <tr v-if="pos.t2_user_po"> 
                      <td class="clsHeader" colspan="4">
                        <h4>Approver T2</h4>
                      </td>
                    </tr>
                    <tr v-if="pos.t2_user_po">
                        <td class="clsLabelDetails" colspan="2">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails" colspan="2">
                            <h4>{{pos.t2_user_po.firstname}}{{pos.t2_user_po.lastname}}</h4>
                        </td>
                    </tr>
                    <tr v-if="pos.t2_user_po">
                        <td class="clsLabelDetails">
                            <h4>Status </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.status_t1_1}}</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Approved </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.date_pending_1 | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
                    <!-- Approver T3 -->
                    <tr v-if="pos.t3_user_po">
                      <td class="clsHeader" colspan="4">
                        <h4>Approver T3</h4>
                      </td>
                    </tr>
                    <tr v-if="pos.t3_user_po">
                        <td class="clsLabelDetails" colspan="2">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails" colspan="2">
                            <h4>{{pos.t3_user_po.firstname}}{{pos.t3_user_po.lastname}}</h4>
                        </td>
                    </tr>
                    <tr v-if="pos.t3_user_po">
                        <td class="clsLabelDetails">
                            <h4>Status </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.status_t1_2}}</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Approved </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.date_pending_2 | moment("Do MMMM YYYY")}}</h4>
                        </td>
                    </tr>
                    <!-- Approver T4 -->
                    <tr v-if="pos.approver_po" >
                      <td class="clsHeader" colspan="4">
                        <h4>Approver T4</h4>
                      </td>
                    </tr>
                    <tr v-if="pos.approver_po">
                        <td class="clsLabelDetails" colspan="2">
                            <h4>Name </h4>
                        </td>
                        <td class="clsValueDetails" colspan="2">
                            <h4>{{pos.approver_po.firstname}}{{pos.approver_po.lastname}}</h4>
                        </td>
                    </tr>
                    <tr v-if="pos.approver_po">
                        <td class="clsLabelDetails">
                            <h4>Status </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.status_t2 }}</h4>
                        </td>
                        <td class="clsLabelDetails">
                            <h4>Date Approved </h4>
                        </td>
                        <td class="clsValueDetails">
                            <h4>{{pos.date_approve | moment("Do MMMM YYYY")}}</h4>
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
    </form>
  </div>
</template>

<script>
import po from "@/js/po.js"; //directory to po.js
import generatePO from "@/js/generatePO.js"; //directory to po.js
import poClass from "@/js/class/po_class.js"; //directory to po_class.js
import jsPDF from 'jspdf';

export default {
  name: "display-PO",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      poObj: new poClass(),
      pos: [], //for po in pos {{po.[var name]}}
      page: 1,
      error: "",
      total_page: "",
      isNext: false,
      isPrevious: true,
      id: this.$route.params.id,
      action: this.$route.params.action,
      po_no: this.$route.params.po_no,
      po_id: this.$route.params.po_no,
      status_t1: "",
      showDialog: false,
      isLoading: false
      // status_t1: ""
    };
  },
  mounted() {
      let pdfScript = document.createElement('script')
      pdfScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js')
      document.head.appendChild(pdfScript)
    },
  async created() {
    try {
      this.isLoading = true;
      this.poObj.in_page = 1;
      this.poObj.po_no = this.po_no;
      this.poObj.id = this.po_no;
      const data = await po.report(this.poObj);
      this.pos = data;
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = err.message;
    }
  },
  methods: {
    detail(value) {
      console.log(value.po_no);
      this.$router.push({ path: `/displayPO/${this.id}/${value.po_no}` });
    },
    printPDF() {
      generatePO.printPDF(this.pos);
		},
    async approve() {
      this.isLoading = true;
      this.poObj.id = this.po_id;
      if (localStorage.t2 == "true" || localStorage.t3 == "true") {
        try {
          alert("Tier 2 manager");
          const pos = await po.po_stat_1(this.poObj);
          this.status_t1 = pos.status_t1;
          console.log(po); //can be ignored
          // localStorage.message = "Purchase Order Application Approved";
          // this.$router.push({ path: `/message/${this.id}` });
          this.isLoading = false;
        } catch (err) {
          alert(err);
          this.isLoading = false;
          this.error = err.message;
        }
      } else if (localStorage.t4 == "true") {
        try {
          alert("Tier 3 manager");
          const pos = await po.po_stat_2(this.poObj);
          this.status_t2 = pos.status_t1;
          console.log(pos); //can be ignored
          // localStorage.message = "Purchae Order Application Approved";
          // this.$router.push({ path: `/message/${this.id}` });
          this.isLoading = false;
        } catch (err) {
          this.isLoading = false;
          this.error = err.message;
        }
      } else {
        alert(
          "Invalid user! Only manager tier 1 & 2 can approve record. Please contact system admin for assistance."
        );
          this.isLoading = false;
      }
      this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Purchase Order Approved',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
        })
        this.$router.push({ path: `/notification/${this.id}` });
    },
    async decline_po() {
      this.poObj.id = this.po_id;
      try {
        const data = await po.po_decline(this.poObj);
        console.log(data); //can be ignored
        this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Purchase Order Declined',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
        })
        this.$router.push({ path: `/notification/${this.id}` });
      } catch (err) {
        this.error = err.message;
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
    }
  }
};
</script>

<style scoped src="@/assets/style/style.css">
strong {
  color: white;
}
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
  overflow: unset;
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
