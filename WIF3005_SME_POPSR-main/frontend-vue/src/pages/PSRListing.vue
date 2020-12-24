<template>
  <div class="content">
    <!-- <div>{{ new Date() | dateFormat('YYYY.MM.DD') }}</div> -->
    <!-- <div>Date: {{psrs.psr_date[0]}}</div> -->
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h1 class="title">PURCHASE SERVICE AND REQUISITION DETAILS</h1>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content>
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
            <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">

                    <tr>
                        <td class="clsLabel">
                            PSR No: 
                        </td>
                        <td class="clsValue">
                            <b-input v-model="psr_no" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Branch: 
                        </td>
                        <td class="clsValue">
                            <b-select v-model="branch" expanded="" style="width:98%;">
                                <option value= ""> </option>
                                <option value= "DJSB"> DJSB</option>
                            </b-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Department: 
                        </td>
                        <td class="clsValue">
                            <b-select v-model="department" expanded="" style="width:98%;">
                                <option value= ""> </option>
                                <option value= "mar"> Marine</option>
                                <option value="cct">Commercial and Contract </option>
                                <option value="acct">Account</option>
                                <option value="adm">Admin</option>
                                <option value="tgd">Trading</option>
                            </b-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Date 
                        </td>
                        <td class="clsValue">
                            
                          <b-field>
                            <b-select v-model="date" style="width:15%">
                                <option value= null> </option>
                                <option value="1">1 </option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4 </option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7 </option>
                                <option value="8">8</option>
                                <option value="9">9</option>
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
                                <option value= null > </option>
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
                            <b-input v-model="year" style="width:20%"></b-input>
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
          <b-loading
            :is-full-page="false"
            :active.sync="isLoading"
            :can-cancel="true"
          ></b-loading>
        <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true">
          <template slot-scope="props">
            <b-table-column
              field="psr_no"
              label="PSR Number"
              width="30%"
              sortable
            >
              <a @click="detail(props.row)">
                {{ props.row.psr_no }}
              </a>
              <!-- <a @click="detail(props.row)">
                        PSR/TRD-{{ props.row.id  }}
                    </a> -->
            </b-table-column>
            <b-table-column field="createdBy" label="Create By" width="30%">
              <p v-if="props.row.create_user">{{ props.row.create_user }} </p>
              <p v-else>{{ props.row.create_user_psr.username }}</p>
            </b-table-column>
            <b-table-column field="created_at" label="Date Created" width="20%">
              <p v-if="props.row.created_at">{{ props.row.created_at | moment("Do MMMM YYYY") }}</p>
              <p v-else>{{ props.row.createdAt | moment("Do MMMM YYYY") }}</p>
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
        <div style=" width:15%; float:right; display:flex; ">
          <form v-on:submit="pagination">
            <md-input
              style="width:60px; float: left; height:28px; text-align: right; "
              type="number"
              v-model="page"
            />
          </form>
          &nbsp; <b>/{{ total_page }}</b>
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
        </div>
        <br><br>
        {{ error }}
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import psr from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to po_class.js

export default {
  name: "notify-PSR",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      companyName: null,
      psr_no: null,
      date: null,
      month: null,
      year: null,
      branch: null,
      department: null,
      isApproved: false,
      psrObj: new psrClass(),
      psrs: [], //for psr in psrs {{psr.[var name]}}
      page: 1,
      error: "",
      total_page: "",
      isNext: false,
      isPrevious: true,
      id: this.$route.params.id,
      t1: null,
      t2: null,
      t4: null,
      t3: null,
      is_admin: null,
      isLoading: false
    };
  },
  async created() {
    try {
      const clog = await user.check_logged();
      if (clog.err) {
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }else{
        this.psrObj.in_param_1 = null;
        this.psrObj.in_param_2 = null;
        this.psrObj.in_param_3 = null;
        this.psrObj.in_param_4 = null;
        this.psrObj.in_param_5 = false;
        this.psrObj.in_param_6 = null;
        this.psrObj.in_param_7 = null;
        this.psrObj.in_page = 1;
        console.log(this.psrObj);
        this.getPSR();
      }
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
  },
  methods: {
    async getPSR(){
      try{
        this.isLoading = true;
        const data = await psr.psr_search(this.psrObj.toJson());
        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.error = err.message;
        alert(err);
    }
    },
    detail(value) {
      this.isLoading = false;
      this.$router.push({
        path: `/displayPSR/${this.id}/${value.id}/audit`
      });
    },
    async filter(){
      var fulldate = null;
      try {
        if(this.psr_no == "")
          this.psr_no = null;
        if(this.date == "null")
          this.date = null;
        if(this.month == "null")
          this.month = null;
        if(this.year == "")
          this.year = null;
        if(this.department == "")
          this.department = null;
        if(this.branch == "")
          this.branch = null;
      //testing starts
      console.log(this.date);
      if(this.date){
        alert(this.month);
        fulldate = new Date(this.year, this.month-1, this.date); 
        fulldate = this.year +"-" + this.month + "-" + this.date;
        console.log(fulldate);
      }
      this.resetParameter();
      this.psrObj.in_param_1 = this.psr_no;
      this.psrObj.in_param_5 = this.isApproved;
      this.psrObj.in_param_6 = this.department;
      this.psrObj.in_param_7 = this.branch;
      this.psrObj.in_page = 1;
      if(!this.date){
        this.psrObj.in_param_3 = this.month;
        this.psrObj.in_param_4 = this.year;
      }
      else
        this.psrObj.in_param_2 = fulldate;
      console.log(this.psrObj);
      
      this.psrObj.in_page = 1;
      this.getPSR();
      console.log(this.psrs);
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
    },
    resetParameter(){
      console.log("Reset Parameter:");
      this.psrObj._in_param_1 = null;
      this.psrObj.in_param_2 = null;
      this.psrObj.in_param_3 = null;
      this.psrObj.in_param_4 = null;
      this.psrObj._in_param_5 = null;
      this.psrObj._in_param_6 = null;
      this.psrObj._in_param_7 = null;
      this.psrObj._in_page = 1;
    },
    async search() {
      try {
        const data = await psr.psr_search(this.psrObj);
        this.pos = data;
        this.po_id = this.pos.id;
      } catch (err) {
        this.error = err.message;
      }
    },
    async get_pending() {
      try {
        const data = await psr.report(this.page);
        this.psrs = data.map(psrs => ({
          ...psrs,
          createdAt: new Date(psrs.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async get_submits() {
      try {
        const data = await psr.report(this.page);
        this.psrs = data.map(psrs => ({
          ...psrs,
          createdAt: new Date(psrs.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async find() {
      try {
        const data = await psr.report(this.psr_id);
        this.psrs = data.map(psrs => ({
          ...psrs,
          createdAt: new Date(psrs.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) this.isNext = true;
      try {
        // alert(this.page);
        this.psrObj.in_page = this.page;
        console.log(this.psrObj);
        this.getPSR();
        console.log(this.psrs);
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
        this.psrObj.in_page = this.page;
        this.getPSR();
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
      } else{
        console.log(this.psrObj.in_page);
      } 
      try {
        this.psrObj.in_page = this.page;
        console.log(this.psrObj);
        // const data = await psr.show_psr_page(this.page);

        // const psrs1 = data.result[0];
        // this.total_page = data.result[1];
        // this.psrs = psrs1.map(psrs => ({
        //   ...psrs
        // }));
        this.getPSR();
      } catch (err) {
        this.error = err.message;
      }
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
