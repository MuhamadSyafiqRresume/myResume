<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <b-table
      :data="isEmpty ? [] : pos"
      :striped="true"
      :hoverable="true"
      :default-sort-direction="asc"
    >
      <template slot-scope="props">
        <b-table-column field="po_no" label="PO Number" sortable>
          <a @click="detail(props.row)">
            {{ props.row.po_no }}
          </a>
        </b-table-column>
        <b-table-column field="createdBy" label="Create By">
          {{ props.row.create_user_po.firstname }}
          {{ props.row.create_user_po.lastname }}
        </b-table-column>
        <b-table-column field="po_date" label="Date Created">
          {{ props.row.createdAt | moment("Do MMMM YYYY") }}
        </b-table-column>
      </template>
    </b-table>
    <br /><br /><br />
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
import po from "@/js/po.js"; //directory to po.js
import user from "@/js/user.js"; //directory to user.js
import poClass from "@/js/class/po_class.js"; //directory to po_class.js

export default {
  name: "notify-PO",
  data() {
    return {
      dataBackgroundColor: "blue",
      isEmpty: false,
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
      isLoading: false
    };
  },
  async created() {
    this.poObj.in_page = 1;
    if (localStorage.t1) this.t1 = localStorage.t1;
    if (localStorage.t2) this.t2 = localStorage.t2;
    if (localStorage.t3) this.t3 = localStorage.t3;
    if (localStorage.t3) this.t4 = localStorage.t4;
    if (localStorage.is_admin) this.is_admin = localStorage.is_admin;
    this.getPO();
  },

  methods: {
    detail(value) {
      console.log(value.po_no);
      this.$router.push({
        path: `/displayPO/${this.id}/${value.id}/approval`
      });
    },
    async getPO() {
      try {
        this.isLoading = true;
        if (this.is_admin == "true") {
          const data = await po.show_po_page(this.poObj);

          const pos1 = data.result[0];
          this.total_page = data.result[1];
          this.pos = pos1.map(pos => ({
            ...pos
          }));
        } else if (this.t4 == "true") {
          try {
            const data = await po.get_pending(this.poObj);
            const pos1 = data.result[0];
            this.total_page = data.result[1];
            this.pos = pos1.map(pos => ({
              ...pos
            }));
          } catch (err) {
            this.error = err.message;
          }
        } else if (this.t2 == "true" || this.t3 == "true") {
          try {
            const data = await po.get_submits(this.poObj);
            const pos1 = data.result[0];
            this.total_page = data.result[1];
            this.pos = pos1.map(pos => ({
              ...pos
            }));
          } catch (err) {
            this.error = err.message;
          }
        } else {
          alert("Invalid user! Please contact your system admin.");
        }

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
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

      this.poObj.in_page = this.page;
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
      this.getPO();
    },
    async pagination() {
      if (this.page >= this.total_page) {
        this.page = this.total_page;
        this.isNext = false;
      } else if (this.page < 1) {
        this.page = 1;
        this.isPrevious = false;
      } else this.page = 1;

      this.poObj.in_page = this.page;
      this.getPO();
    }
  }
};
</script>
