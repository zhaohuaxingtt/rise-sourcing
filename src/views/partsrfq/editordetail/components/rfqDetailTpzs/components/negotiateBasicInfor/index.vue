<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:23:12
 * @LastEditors: zbin
 * @Descripttion: 谈判基本信息
-->
<template>
  <div>
    <projectOverview/>
    <bulkSupplierOverview class="margin-top20"/>
    <bulkSupplierPandect class="margin-top20"/>
    <fixedRecord class="margin-top20"/>
  </div>
</template>

<script>
import bulkSupplierOverview from "./components/bulkSupplierOverview.vue";
import bulkSupplierPandect from "./components/bulkSupplierPandect.vue";
import projectOverview from "./components/projectOverview.vue";
import fixedRecord from "./components/fixedRecord.vue";
export default {
  components: { bulkSupplierOverview,bulkSupplierPandect,projectOverview,fixedRecord },
  data(){
    return{
      title:'BoB(Best of Best)'
    }
  },
  created(){
  },
  methods:{

  }
}
</script>

<style>
</style>