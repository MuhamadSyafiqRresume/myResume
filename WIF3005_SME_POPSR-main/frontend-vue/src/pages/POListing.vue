<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">PURCHASE SERVICE AND REQUISITION DETAILS</h1>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <md-card-expand-trigger>
            <md-button>Filter</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            <md-card-content>
          <div class="alert alert-info" style="color: black; background-color:white;width:100%; display: inline-block;">
            <table cls="clsForm" width="80%" style="border:0">
                    <col width="25%">
                    <col width="70%">

                    <tr>
                        <td class="clsLabel">
                            Purchase Order No: 
                        </td>
                        <td class="clsValue">
                            <b-input v-model="poNo" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Company Name: 
                        </td>
                        <td class="clsValue">
                            <b-input v-model="companyName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Date 
                        </td>
                        <td class="clsValue">
                            
                          <b-field>
                            <b-select v-model="date" style="width:13%">
                                <option value= null> </option>
                                <option value="01">1 </option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4 </option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7 </option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10 </option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13 </option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16 </option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19 </option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22 </option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25 </option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28 </option>
                                <option value="28">29</option>
                                <option value="30">30</option>
                                <option value="31">31 </option>
                            </b-select>
                            <b-select v-model="month">
                                <option value= ''> </option>
                                <option value="01">January </option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">Aptil</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </b-select>
                            <b-input v-model="year" type="number" maxlength="4" controls="false" style="width:20%"></b-input>
                        </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Is Approved 
                        </td>
                        <td class="clsValue">
                          <b-checkbox v-model="isApproved">
                            {{ isApproved }}
                        </b-checkbox>
                        </td>
                    </tr>

            </table>
            
        <md-card-actions md-alignment="right">
            <md-button @click="filter()">Submit</md-button>
        </md-card-actions>
          </div>
        </md-card-content>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
      <md-card-content>
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="true"
        ></b-loading>
        <b-table
          :data="isEmpty ? [] : pos"
          :striped="true"
          :hoverable="true"
        >
          <template slot-scope="props">
            <b-table-column field="po_no" label="PO Number" width="30%">
              <a @click="detail(props.row)">
                {{ props.row.po_no }}
              </a>
            </b-table-column>
            <b-table-column field="create_user" label="Create By" width="30%">
              {{ props.row.create_user }}
            </b-table-column>
            <b-table-column field="created_at" label="Date Created" width="20%">
              {{ props.row.created_at | moment("Do MMMM YYYY") }}
            </b-table-column>
            <b-table-column field="is_approved" label="Is Approved" centered="">
              <!-- {{ props.row.status }}  -->
              <span v-if="props.row.status" style="font-size: 2em; color: #84f092;">
                <i class="far fa-check-circle"></i>
              </span>
              <span v-else style="font-size: 2em; color: #f72828;">
                <i class="far fa-times-circle"></i>
              </span>
            </b-table-column>
          </template>
        </b-table>
        <br /><br />
        <div style=" width:20%; float:right; ">
          <form v-on:submit="pagination">
            <md-input
              style="width:60px; float: left; height:28px;text-align: right; "
              type="number"
              v-model="page"
              :disabled="false"
            />
          </form>
          &nbsp;<b>/{{ total_page }}</b>
          &nbsp;&nbsp;
          <b-tooltip label="Previous" type="is-light" position="is-bottom">
            <b-button
              @click="previousPage"
              :disabled="isPrevious"
              size="is-small"
              float="right"
              type="is-light"
            >
              <md-icon>navigate_before</md-icon>
            </b-button>
          </b-tooltip>
          <!-- &nbsp; -->
          <b-tooltip label="Next" type="is-light" position="is-bottom">
            <b-button
              @click="nextPage"
              :disabled="isNext"
              size="is-small"
              float="right"
              type="is-light"
            >
              <md-icon>navigate_next</md-icon>
            </b-button>
            &nbsp;&nbsp;
          </b-tooltip>
          <br /><br /><br />
        </div>
        {{ error }}
        <!-- {{ pos }} -->
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import po from "@/js/po.js"; //directory to po.js
import poClass from "@/js/class/po_class.js"; //directory to po_class.js

export default {
  name: "notify-PO",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      isApproved: false,
      poObj: new poClass(),
      pos: [], //for po in pos {{po.[var name]}}
      page: 1,
      error: "",
      total_page: 1,
      isNext: false,
      isPrevious: true,
      id: this.$route.params.id,
      t1: null,
      t2: null,
      t4: null,
      t3: null,
      is_admin: null,
      poNo: null,
      companyName: null,
      date:null,
      month: null,
      year: null,
      isEmpty: false,
      isLoading: false,
      fullDate: null
    };
  },
  async created() {
      const clog = await user.check_logged();
      if (clog.err) {
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }else{
        this.poObj.in_param_1 = null;
        this.poObj.in_param_2 = null;
        this.poObj.in_param_3 = null;
        this.poObj.in_param_4 = null;
        this.poObj.in_param_5 = null;
        this.poObj.in_param_6 = false;
        this.poObj.in_param_7 = null;
        this.poObj.in_page = 1;
        console.log(this.poObj);
        this.getPO();
      }
  },

  methods: {
    async getPO(){
      try{
        this.isLoading = true;
        const data = await po.po_search(this.poObj.toJson());
        console.log("data");

        const pos1 = data.result[0];
        console.log(data);
        // this.total_page = data.result[1];
        this.total_page = data.result[0][0].totalrecords;
        this.pos = pos1.map(pos => ({
          ...pos
        }));
        // this.pos = data.result[0];
        console.log(this.pos);
        this.isLoading = false;
        } catch (err) {
        this.isLoading = false;
        this.error = err.message;
        alert(err);
      }
    },
    detail(value) {
      console.log(value.po_no);
      this.$router.push({
        path: `/displayPO/${this.id}/${value.id}/audit`
      });
    },
    async filter(){
      var fulldate = null;
      try {
        if(this.poNo == "")
          this.poNo = null;
        if(this.date == "null")
          this.date = null;
        if(this.fullDate == "null")
          this.fullDate = null;
        if(this.month == "")
          this.month = null;
        if(this.year == "")
          this.year = null;
        if(this.companyName == "")
          this.companyName = null;
        //testing starts
        if(this.date){
          fulldate = new Date(this.year, this.month-1, this.date); 
          fulldate = this.year +"-" + this.month + "-" + this.date;
          console.log(fulldate);
        }
        this.resetParameter();
        this.poObj.in_param_1 = this.poNo;
        this.poObj.in_param_2 = this.companyName;
        this.poObj.in_param_6 = this.isApproved;
        this.poObj.in_page = this.page;
        if(!this.date){
          this.poObj.in_param_4 = this.month;
          this.poObj.in_param_5 = this.year;
        }
        else
          this.poObj.in_param_3 = fulldate;

        console.log(this.poObj);
        this.getPO();
        // this.poObj.in_page = 1;
        // const data = await po.po_search(this.poObj.toJson());
        // console.log(data);

        // const pos1 = data.result[0];
        // console.log(data);
        // this.total_page = data.totalrecords;
        // this.pos = pos1.map(pos => ({
        //   ...pos
        // }));
        console.log(this.pos);
      } catch (err) {
        this.error = err.message;
        alert(err);
      }
    },
    resetParameter(){
      this.poObj.in_param_1 = null;
      this.poObj.in_param_2 = null;
      this.poObj.in_param_6 = null;
      this.poObj.in_page = null;
      this.poObj.in_param_4 = null;
      this.poObj.in_param_5 = null;
      this.poObj.in_param_3 = null;
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
    //create in vue:
    // if page == 1, hide previous button, show next button
    // if page == total_page, show previous button, show next button
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) this.isNext = true;
      this.poObj.in_page = this.page;
      // try {
      //   this.poObj.in_page = this.page;
      //   const data = await po.show_po_page(this.poObj);

      //   const pos1 = data.result[0];
      //   this.total_page = data.result[1];
      //   this.pos = pos1.map(pos => ({
      //     ...pos
      //   }));
      // } catch (err) {
      //   this.error = err.message;
      // }
      this.getPO();
    },
    async previousPage() {
      this.isNext = false;
      if (this.page <= 1) {
        this.page = 1;
        this.isPrevious = true;
      } else this.page -= 1;
      if (this.page == 1) this.isPrevious = true;
      
      this.poObj.in_page = this.page;
      // try {
      //   this.poObj.in_page = this.page;
      //   const data = await po.show_po_page(this.poObj);
      //   const pos1 = data.result[0];
      //   this.total_page = data.result[1];
      //   this.pos = pos1.map(pos => ({
      //     ...pos
      //   }));
      // } catch (err) {
      //   this.error = err.message;
      // }
      this.getPO();
    },
    async pagination() {
      if (this.page >= this.total_page) {
        this.page = this.total_page;
        this.isNext = false;
      } else if (this.page < 1) {
        this.page = 1;
        this.isPrevious = false;
      } else{
        console.log(this.page);
      } 
      this.poObj.in_page = this.page;
      this.getPO();

      // try {
      //   const data = await po.show_po_page(this.page);

      //   const pos1 = data.result[0];
      //   this.total_page = data.result[1];
      //   this.pos = pos1.map(pos => ({
      //     ...pos
      //   }));
      // } catch (err) {
      //   this.error = err.message;
      // }
    }
  }
};
</script>

<style scoped>
.clsLabel{
    /* background-color: #969191; */
    /* color: #ffffff; */
    height: 65px;
    vertical-align: middle;
    padding-left: 1em;
    font-weight: 700;
    font-size: 150%;
    text-align: left;
    /* border-right:8px solid #ffffff; */
    /* border-bottom: 5px solid #ffffff; */
    border-radius: 10px;
    /* border-right: 7px; */
}
.clsLabel h4{
    font-weight: 500;

}
.clsValue{
    /* background-color: #f3f3f3; */
    /* background-color: #ffffff; */
    color: black;
    height: 20px;
    vertical-align: middle;
    padding-left: 5%;
    font-weight: 400;
    border-bottom: 5px solid #ffffff;
    /* border: 5px solid red; */
    border-radius: 10px;
}
.clsForm{
    border-radius: 30px;
    border: 1px solid #ffffff;
}
.content table td, .content table th {
    border:0;
    border-width: 0 0 1px;
    padding: 0.5em 0.75em;
    vertical-align: top;
}
</style>
