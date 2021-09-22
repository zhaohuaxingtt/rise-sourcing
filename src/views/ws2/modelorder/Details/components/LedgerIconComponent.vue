<template>
  <div class="logopic" @click='goledger'></div>
</template>

<script>
export default {
  name: 'LedgerIconComponent',
  methods:{
    //去台账
    goledger() {
      //this.$router.push('/priceorder/partsparameter')
    }
  }
}
</script>

<style scoped lang='scss'>
.logopic {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background: url('../../../../../assets/images/logo7269.png') no-repeat;
  background-size: 90%;
}
</style>