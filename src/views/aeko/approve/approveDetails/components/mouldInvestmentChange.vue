<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:40:38
 * @LastEditTime: 2021-10-27 13:52:01
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div class="mould">
    <iCard class="mb-16">
      <p class="title mb-20">
        <span>{{ `${language("MUJUCBD", "模具CBD")}` }}</span>
        <span class="tip ml-12">{{ language("DANWEI", "单位") }}：RMB/Pc.</span>
      </p>
      <tableList
        lang
        class="table"
        :selection="false"
        v-loading="loading"
        :tableTitle="tableTitle"
        :tableData="tableData"
      >
        <template #isShared="scope">
          <span>{{ scope.row.isShared | statesFilter }}</span>
        </template>
      </tableList>
      <el-form inline class="mould-form" label-position="right">
        <el-form-item
          class="mould-form-item"
          v-for="(item, index) in mouldCostInfos"
          :key="index"
          :label="`${language(item.key, item.name)}:`"
        >
          <iText class="mould-iText">{{ dataGroup[item.props] }}</iText>
        </el-form-item>
      </el-form>
    </iCard>
  </div>
</template>

<script>
import { iCard, iText,iMessage } from "rise";
import tableList from "rise/web/quotationdetail/components/tableList";
import { moduleTableTitle as tableTitle, mouldCostInfos } from "../data";
import { getMoulds } from "@/api/aeko/approve";
export default {
  components: {
    iCard,
    iText,
    tableList,
  },
  props:{
    workFlowId:{
      type:String,
      default:''
    },
    quotationId:{
      type:String,
      default:'',
    }
  },
  data() {
    return {
      tableTitle,
      mouldCostInfos,
      dataGroup: {},
      tableData: [],
    };
  },
  methods: {
    // 初始化数据
    init(){
      console.log('获取初始化数据');
      this.getMoulds();
    },
    // 获取数据
    async getMoulds(){
      const {workFlowId,quotationId} = this;
      this.loading = true;
      await getMoulds({
        workFlowId,
        quotationId,
      }).then(res => {
        this.loading = false
        if (res.code == 200) {
           const mouldCbdList = Array.isArray(res.data.mouldCbdList) ? res.data.mouldCbdList : [];
          // FS单号取最外层数据
          mouldCbdList.map((item)=>{
            item.assembledPartPrjCode = res.data.fs || '';
          })
          this.tableData = mouldCbdList;
          this.$set(this.dataGroup, "totalPrice", res.data.totalPrice)
          this.$set(this.dataGroup, "shareTotal", res.data.shareTotal)
          this.$set(this.dataGroup, "shareQuantity", res.data.shareQuantity)
          this.$set(this.dataGroup, "shareAmount", res.data.shareAmount)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(() => this.loading = false)
    }
  },
  filters: {
    statesFilter(val) {
      return val ? "是" : "否";
    },
  },
};
</script>

<style lang="scss" scoped>
.mould {
  .title {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
    margin-bottom: 30px;
    .tip {
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      color: #485465;
      opacity: 0.7;
    }
  }
  .mould-form {
    width: 100%;
    margin-top: 30px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    .mould-form-item {
      margin-right: 0;
      ::v-deep .el-form-item__label {
        font-size: 14px;
        font-family: Arial;
        font-weight: 400;
        color: #000000;
      }
    }
    .mould-iText {
      width: 240px;
      height: 35px;
    }
  }
  .mb-16 {
    margin-bottom: 16px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .ml-12 {
    margin-left: 12px;
  }
}
</style>