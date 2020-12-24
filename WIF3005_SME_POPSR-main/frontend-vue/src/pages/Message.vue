<template>
  <div class="alert alert-success">
    <span> {{message}} </span>
  </div>
</template>

<script>
export default {
    data(){
        return{
            id: localStorage.id,
            message: localStorage.message,
        };
    },
//   async created() {
//     setTimeout(() => this.$router.push({ path: `/purchaseOrder` }), 3000);
//   }
};
</script>

<style scoped>
h4 {
  color: #515c82;
}
</style>
