<template>
  <div class="alert alert-success">
    <span> Purchase Order Application Submitted"</span>
  </div>
</template>

<script>
export default {
  async created() {
    setTimeout(() => this.$router.push({ path: `/purchaseOrder` }), 3000);
  }
};
</script>

<style scoped>
h4 {
  color: #515c82;
}
</style>
