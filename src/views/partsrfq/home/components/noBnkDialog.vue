<template>
  <iDialog
  :visible.sync="bnkVislble"
  class="createDesignateTips"
  :title="language('BIDDING_TISHI','提示')"
  :close-on-click-modal="false"
  @close="sure"
  >
    <div>
      <span class="fontStyle">
       {{language('YIXIALINGJIANCAIGOUXIANGMUBKNSHENHEWEITONGGUOWUFACHUANGJIANDINGDIANSHENQING','以下零件采购项目BNK审核未通过，无法创建定点申请')}}
     </span>
    </div>
    <tableList
      v-show="bnkVislble"
      class="dunsTable"
      :index="true"
      :selection="false"
      :tableData="tableData"
      :tableTitle="tableTitle"
      ></tableList>
    <footer class="footerBtn">
      <iButton @click="sure">{{language('QUEDING','确定')}}</iButton>
    </footer>
    <div style="height:20px"></div>
  </iDialog>
</template>
<script>
import tableList from "@/views/partsign/editordetail/components/tableList"
import {iDialog, iButton} from "rise"
import {noBnkTable as tableTitle} from './data'
export default {
  components:{
    iDialog,
    tableList,
    iButton
  },
  data() {
    return {
      tipsTitle:"",
      tableTitle,
      tableData:[],
      bnkVislble:false
    }
  },
  methods:{
    show() {
        this.bnkVislble = true
    },
    sure() {
      this.$emit('changeTipsDialog','BNK')
    },
    close() {
       this.bnkVislble = false
    }
  }
  
}
</script>
<style scoped lang="scss">
  .createDesignateTips{
    .fontStyle{
      font-size: 14px;
      font-weight: bold;
    }
    .dunsTable{
      margin: 10px 0 0 0 ;
    }
    .footerBtn{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>