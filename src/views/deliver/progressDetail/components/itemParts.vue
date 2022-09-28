<template>
  <div class="table-content">
    <template v-for="(data,key) in list">
      <rowItemParts :data="data" :list="list" :header="header" :key="key"></rowItemParts>
    </template>
  </div>
</template>

<script>
import rowItemParts from "./rowItemParts.vue";
  export default {
    components:{
      rowItemParts
    },
    name:'',
    props:{
      header:{ type: Array, default: ()=>[]},
      list:{ type: Array, default: ()=>[]},
      point:{ type: Boolean, default: true},
    },
    methods:{
      change(data){
        data.showChlid = !data.showChlid
      }
    }
  }
</script>

<style lang="scss" scoped>
.table-content{
  ::v-deep .row-item{
    background-color: transparent;
      &:nth-child(even) {
        background-color: #f7faff;
      }
  }
}
</style>