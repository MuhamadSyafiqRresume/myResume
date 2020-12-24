<template>
  <div> <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <h5>
      <!-- {{psrs}}
          {{error}} -->
    </h5>
    <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true">
      <template slot-scope="props">
        <b-table-column field="id" label="PSR Number" width="500">
          <!-- <a @click="detail(props.row)">
            PSR/TRD-{{ props.row.psr_no | numeral("000000") }}
          </a> -->
          <a @click="detail(props.row)">
            {{ props.row.psr_no }}
          </a>
        </b-table-column>
        <b-table-column
          v-if="
            props.row.status_decline == false && props.row.status_t2 == false
          "
          field="id"
          label="Status"
          width="300"
        >
          <p>
            Pending
          </p>
        </b-table-column>
        <b-table-column
          v-else-if="props.row.status_decline == true"
          field="id"
          label="Status"
          width="300"
        >
          <p>
            Decline
          </p>
        </b-table-column>
        <b-table-column v-else field="id" label="Status" width="300">
          <p>
            Approved
          </p>
        </b-table-column>
      </template>
    </b-table>
    <br><br><br>
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
  </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to po_class.js

export default {
  name: "my-PSR",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
      psrObj: new psrClass(),
      // leaves: [], //do for leave in leaves
      error: "",
      isLoading: false,
      id: localStorage.id,
      page: 1,
      psrs: [],
      total_page: "",
      isNext: false,
    };
  },
  async created() {
    this.psrObj.in_page = 1;
    this.getPSR();
  },
  methods: {
    detail(value) {
      console.log(value.psr_no);
      this.$router.push({
        path: `/displayPSR/${this.id}/${value.id}/status`
      });
    },
    async getPSR(){
      try {
        this.isLoading = true;
        const data = await psr.show_own_psr_page(this.psrObj);
        console.log(data);
        const limit = 8;

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
        this.isLoading = false;
      } catch (err) {
        this.error = err.message;
        alert(err);
      }
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
    }
  }
};
</script>
