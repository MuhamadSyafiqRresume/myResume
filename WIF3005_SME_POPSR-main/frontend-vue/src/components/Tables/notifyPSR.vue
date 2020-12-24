<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true">
      <template slot-scope="props">
        <b-table-column field="po_no" label="PO Number" width="400" sortable>
          <a @click="detail(props.row)">
            {{ props.row.psr_no  }}
          </a>
        </b-table-column>
        <b-table-column field="createdBy" label="Create By" width="500">
          {{ props.row.create_user_psr.firstname }}
          {{ props.row.create_user_psr.lastname }}
        </b-table-column>
        <b-table-column field="po_date" label="Date Created">
          {{ props.row.createdAt | moment("Do MMMM YYYY") }}
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
import psrClass from "@/js/class/psr_class.js"; //directory to psr_class.js

export default {
  name: "notify-PSR",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
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
    this.psrObj.in_page = 1;
    this.psrObj.branch = localStorage.branch;
    this.psrObj.department = localStorage.department;
    if (localStorage.t1) this.t1 = localStorage.t1;
    if (localStorage.t2) this.t2 = localStorage.t2;
    if (localStorage.t4) this.t4 = localStorage.t4;
    if (localStorage.t3) this.t3 = localStorage.t3;
    if (localStorage.is_admin) this.is_admin = localStorage.is_admin;
    // if(this.t2)
    this.getPSR();
  },
  methods: {
    async detail(value) {
      this.$router.push({
        path: `/displayPSR/${this.id}/${value.id}/approval`
      });
    },
    async getPSR() {
      this.isLoading = true;
      if (this.is_admin == "true") {
        try {
          const data = await psr.show_psr_page(this.psrObj);
          const psrs1 = data.result[0];
          this.total_page = data.result[1];
          this.psrs = psrs1.map(psrs => ({
            ...psrs
          }));
        } catch (err) {
          this.error = err.message;
        }
      } else if (this.t2 == "true" || this.t3 == "true") {
        try {
          const data = await psr.get_submits(this.psrObj);
          const limit = 8;

          const psrs1 = data.result[0];
          this.total_page = data.result[1];
          this.psrs = psrs1.map(psrs => ({
            ...psrs
          }));
        } catch (err) {
          this.error = err.message;
        }
      } else if (this.t4 == "true") {
        try {
          const data = await psr.get_pending(this.psrObj);
          const limit = 8;

          const psrs1 = data.result[0];
          this.total_page = data.result[1];
          this.psrs = psrs1.map(psrs => ({
            ...psrs
          }));
        } catch (err) {
          this.error = err.message;
        }
      } else {
        alert("Invalid user! Please contact your system admin.");
      }
      this.isLoading = false;
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
      
      this.psrObj.in_page = this.page;
      this.getPSR();
    },
    async previousPage() {
      this.isNext = false;
      if (this.page <= 1) {
        this.page = 1;
        this.isPrevious = true;
      } else this.page -= 1;
      if (this.page == 1) this.isPrevious = true;
      
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
