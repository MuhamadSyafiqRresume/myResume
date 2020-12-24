<template>
    <div class="content">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h1 class="title">Purchase Order Application</h1>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>
          <md-card-content>
            <div >
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                    <div class="block" style="border:1px">
                        <h3><strong>PSR INPUT METHOD: </strong></h3>
                        <md-radio v-model="inputMethod" value="1" class="md-primary">Enter PSR</md-radio>
                        <md-radio v-model="inputMethod" value="2" class="md-primary">SEARH PSR</md-radio>

                    </div>
                  </section>
                <div v-if="inputMethod =='1'">
                    <md-card-content>
                    <table  cls="clsForm" width="90%:">
                        <col width="20%">
                        <col width="70%">
                        <tr>
                            <td class="clsLabel">
                                PSR NO: 
                            </td>
                            <td class="clsValue" style="padding:0.6rem;">
                                <md-autocomplete v-model="passPSRNo" :md-options="psr_no" md-layout="box" md-dense>
                                  <!-- <label>PSR Number</label> -->
                                  
                                  <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                    <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                  </template>

                                  <template slot="md-autocomplete-empty" slot-scope="{ term }">
                                    No PSR Number matching found
                                  </template>
                                </md-autocomplete>
                            </td>
                        </tr>
                    </table>
                    
                    <md-button
                        class="md-raised md-success"
                        @click="matchPSR()"
                        style="float:right"
                        >GO</md-button ><br><br>
                    </md-card-content>
                </div>
            <div v-else-if="inputMethod == '2'">
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
                            <col width="15%">
                            <col width="75%">

                            <tr>
                                <td class="clsLabel">
                                    PSR No: 
                                </td>
                                <td class="clsValue">
                                  <md-autocomplete v-model="PSRNo" :md-options="psr_no" md-layout="box" md-dense>
                                    <!-- <label>PSR Number</label> -->
                                    
                                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                      <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                    </template>

                                    <template slot="md-autocomplete-empty" slot-scope="{ term }">
                                      No PSR Number matching found
                                    </template>
                                  </md-autocomplete>
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
                                    <b-select v-model="date" >
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
                                    <b-input v-model="year" style="width:20%"></b-input>
                                </b-field>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td class="clsLabel">
                                    <h4>Is Approved </h4>
                                </td>
                                <td class="clsValue">
                                  <b-checkbox v-model="isApproved">
                                    {{ isApproved }}
                                </b-checkbox>
                                </td>
                            </tr> -->

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
                  :can-cancel="false"
                ></b-loading>
                  <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true" > 
                    <template slot-scope="props">
                        <b-table-column field="po_no" label="PSR Number" >
                            <a @click="passPSR(props.row)">
                                {{ props.row.psr_no }}
                            </a>
                        </b-table-column>
                        <b-table-column field="created_at" label="Date Created" >
                            {{ props.row.created_at | moment(" Do MMMM YYYY") }}
                        </b-table-column>
                        <b-table-column field="detail" label="" width="15%" >
                            <a @click="detail(props.row)">
                                View Details >>>
                            </a>
                        </b-table-column>
                    </template> 
                </b-table>
    <br>
    <br><br><br>
    <div style=" width:20%; float:right; display:flex; ">
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
      <b-tooltip label="Previous" type="is-light" position="is-bottom" display="inline">
        <b-button
          @click="previousPage"
          :disabled="isPrevious"
          size="is-small"
          float="right"
          type="is-light" 
          display="inline"
        >
          <md-icon>navigate_before</md-icon>
        </b-button>
      </b-tooltip>
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
                </md-card-content>
            </div>
            </div>
            </div>
          </md-card-content>
        </md-card>
    </div>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
import psr from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to psr_class.js
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    data(){
        return {
          dataBackgroundColor: "blue",
          isEmpty: false,
          match: false,
          inputMethod: '2',
          PSRNo: null,
          passPSRNo: null,
          date: null,
          month: null,
          year: null,
          branch: null,
          department: null,
          isApproved: true,
          PSR_id:'',
          psrs: [],
          error:'',
          i: 0,
          isLoading: false,
          psrObj: new psrClass(),
          page: 1,
          total_page:0,
          psr_no: [],
          psr_id: []
        }
    },
    async created() {
      const clog = await user.check_logged();
      if(clog.err) {
        alert("User not logged in. Please login.")
        this.$router.push({ path: `/login` });
      }
      else{
        this.psrObj.in_page = 1;
        this.psrObj.in_param_5 = true;
        try {
            this.isLoading = true;
            this.psrObj.in_param_5 = true;
            const data = await psr.approved_np();
            // this.psrs = data.result[0];
            this.psrs = data;
            // this.total_page =data.result[1];
            for(var j = 0; j<this.psrs.length; j++){
              this.psr_no.push(this.psrs[j].psr_no);
              this.psr_id.push(this.psrs[j].id);
            }
            this.isLoading = false;
        } catch (err) {
            alert(err);
            this.error = err.message;
            this.isLoading = false;
        }
        this.getPSR();
      }
            

    },
    methods: {
        passPSR(value){
            this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${value.id}` });
        },
      detail(value) {
        this.isLoading = false;
        this.$router.push({
          path: `/displayPSR/${this.id}/${value.id}/status`
        });
      },
    async filter(){
      var fulldate = null;
      this.isLoading = true;
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
          
      if(this.date){
        alert(this.date);
        fulldate = new Date(this.year, this.month-1, this.date); 
        fulldate = this.year +"-" + this.month + "-" + this.date;
        console.log(fulldate);
      }
        //testing starts
        this.resetParameter();
        this.psrObj.in_param_1 = this.PSRNo;
        this.psrObj.in_param_5 = this.isApproved;
        this.psrObj.in_param_6 = this.department;
        this.psrObj.in_param_7 = this.branch;
        this.psrObj.in_page = this.page;
        if(!this.date){
          this.psrObj.in_param_3 = this.month;
          this.psrObj.in_param_4 = this.year;
        }
        else
          this.psrObj.in_param_2 = fulldate;
        console.log(this.psrObj);
        // this.psrObj.toJson();
        //testing ends
        this.psrObj.in_page = 1;
        const data = await psr.psr_search(this.psrObj.toJson());
        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
        console.log(this.psrs);
      this.isLoading = false;
      } catch (err) {
        this.error = err.message;
        this.isLoading = false;
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
    async getPSR(){
      try {
        this.isLoading = true;
        //testing starts
        this.psrObj.in_param_1 = this.PSRNo;
        this.psrObj.in_param_2 = this.date;
        this.psrObj.in_param_3 = this.month;
        this.psrObj.in_param_4 = this.year;
        this.psrObj.in_param_5 = this.isApproved;
        this.psrObj.in_param_6 = this.department;
        this.psrObj.in_param_7 = this.branch;
        // this.psrObj.in_page = 1;
        console.log(this.psrObj);
        // this.psrObj.toJson();
        //testing ends
        const data = await psr.psr_search(this.psrObj.toJson());
        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
        this.isLoading = false;
        console.log(this.psrs);
      } catch (err) {
        this.error = err.message;
        this.isLoading = false;
        alert(err);
      }
            // try {
            //     this.isLoading = true;
            //     this.psrObj.in_param_5 = true;
            //     const data = await psr.approved_np();
            //     // this.psrs = data.result[0];
            //     this.psrs = data;
            //     // this.total_page =data.result[1];
            //     for(var j = 0; j<this.psrs.length; j++){
            //       this.psr_no.push(this.psrs[j].psr_no);
            //     }
            //     this.isLoading = false;
            // } catch (err) {
            //     alert(err);
            //     this.error = err.message;
            //     this.isLoading = false;
            // }
        },
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) 
        this.isNext = true;
      this.psrObj.in_page = this.page;
      this.getPSR();
    },
    async previousPage() {
      this.isNext = false;
      if (this.page <= 1) {
        this.page = 1;
        this.isPrevious = true;
      } else this.page -= 1;
      if (this.page == 1) 
        this.isPrevious = true;
      
      this.psrObj.in_page = this.page;
      this.getPSR();
    },
    async pagination() {
      if (this.page >= this.total_page) {
        this.page = this.total_page;
        this.isNext = false;
      } else if (this.page < 1) {
        this.page = 1;
        this.isPrevious = false;
      } else this.page = 1;

      this.psrObj.in_page = this.page;
      this.getPSR();
    },
    matchPSR(){
    if(this.psrs != null){
        // alert(this.psrs.length);
        // this.PSRNo = parseInt(this.PSRNo);
        for(var i=0; i<this.psr_no.length; i++){
            if(this.psr_no[i] == this.passPSRNo){
                alert("Match");
                try{
                    this.match = true;
                    this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${this.psr_id[i]}` });
                    break;
                }
                catch(error){
                    alert("failed");
                }
            }
        }
        if(!this.match){
            alert("PSR not found!!!");
        }
        }
        else{
            alert("No Approved PSR yet");
        }
      },
      openLoading() {
          this.isLoading = true
          setTimeout(() => {
              this.isLoading = false
          }, 10 * 1000)
      }
}
}
</script>

<style src="@/assets/style/style.css">
 
</style>
<style scoped > 
  .content table td, .content table th {
      border:0;
      border-width: 0 0 1px;
      padding: 0.5em 0.75em;
      vertical-align: top;
  }
</style>