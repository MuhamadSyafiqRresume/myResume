<template>
  <div>
    <h5>test</h5>
  </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js

export default {
  name: "PSR-Search",
  data() {
    return {
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
      is_admin: null
    };
  },
  async created() {
    if (localStorage.t1) this.t1 = localStorage.t1;
    if (localStorage.t2) this.t2 = localStorage.t2;
    if (localStorage.t4) this.t4 = localStorage.t4;
    if (localStorage.t3) this.t3 = localStorage.t3;
    if (localStorage.is_admin) this.is_admin = localStorage.is_admin;

    try {
      if (this.is_admin == "true") {
        const data = await psr.show_psr_page(this.page);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
      } else if (this.t2 == "true" || this.t3 == "true") {
        try {
          const data = await psr.get_submits(this.page);
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
          const data = await psr.get_pending(this.page);
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
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    detail(value) {
      console.log(value.po_no);
      this.$router.push({ path: `/displayPSR/${this.id}/${value.psr_no}` });
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
        const data = await psr.show_psr_page(this.page);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
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
        const data = await psr.show_psr_page(this.page);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
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
        const data = await psr.show_psr_page(this.page);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
