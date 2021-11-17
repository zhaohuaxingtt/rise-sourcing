<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:17:13
 * @LastEditTime: 2021-11-17 13:38:33
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <iCard class="mb-20">
    <template v-permission.auto="AEKO_APPROVAL_DETAIL_CBDSUMMARY_QUEHUANLINGJIAN|切换零件">
      <span class="title">{{language('QIEHUANLINGJIAN', '切换零件')}}:</span>
      <div class="i-select mb-20">
        <iSelect v-model="partsId" :placeholder="language('QINGXUANZE','请选择')" @change="getCbdDataQuery">
          <el-option
            :value="item.key"
            :label="item.value"
            v-for="item in partsList"
            :key="item.key"
          ></el-option>
        </iSelect>
      </div>
    </template>
    <tableList
      v-loading="loading"
      lang
      class="table"
      :selection="false"
      :tableTitle="tableTitle"
      :tableData="tableData"
      v-permission.auto="AEKO_APPROVAL_DETAIL_CBDSUMMARY_LINGJIANLIEBIAO|零件列表"
    >
        <template #originAPrice="scope">
          <el-popover
            placement="top"
            trigger="hover">
            <template>
              <p style="text-align:center">{{ scope.row.source }}</p>
            </template>
            <template #reference>
              <span>{{ floatFixNum(scope.row.originAPrice) || '' }}</span>
            </template>
          </el-popover>
        </template>
        <template #apriceChange="scope">
          {{floatFixNum(scope.row.apriceChange) || '' }}
        </template>
        <template #aprice="scope">
          {{floatFixNum(scope.row.aprice) || '' }}
        </template>
        <template #originBnkFee="scope">
          {{floatFixNum(scope.row.originBnkFee) || '' }}
        </template>
        <template #bnkFee="scope">
          {{floatFixNum(scope.row.bnkFee) || '' }}
        </template>
        <template #tooling="scope">
          {{floatFixNum(scope.row.tooling) || '' }}
        </template>
        <template #developmentCost="scope">
          {{floatFixNum(scope.row.developmentCost) || '' }}
        </template>
        <template #terminationPrice="scope">
          {{floatFixNum(scope.row.terminationPrice) || '' }}
        </template>
        <template #sampleCost="scope">
          {{floatFixNum(scope.row.sampleCost) || '' }}
        </template>
    </tableList>
  </iCard>
</template>

<script>
import { switchPartsTableTitle, floatFixNum } from "../data.js";
import { iCard, iSelect, iMessage } from "rise";
import tableList from "rise/web/quotationdetail/components/tableList";
import { getSwitchParts, getSwitchPartsByParams } from "@/api/aeko/approve";
export default {
  components: {
    iCard,
    iSelect,
    tableList,
  },
  props:{
    workFlowId:{
      type: String,
      require: true,
    },
    tableData:{
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      partsId: "",
      partsList:[],
      tableTitle: switchPartsTableTitle,
    };
  },
  created(){
    this.queryParams = this.$route.query;
    let str_json = window.atob(this.queryParams.transmitObj);
    let transmitObj = JSON.parse(decodeURIComponent(escape(str_json)));
    this.transmitObj = transmitObj
    this.workFlowId?this.getPartsList():this.getSwitchPartsByParams()
  },
  methods:{
    floatFixNum,
    // 获取切换零件下拉框数据
    getPartsList() {
      this.loading = true
      getSwitchParts({workFlowId:this.workFlowId}).then((res)=>{
        if(res?.code==='200'){
          this.partsList = res.data;
          this.partsId = this.partsList&&this.partsList[0].key
          this.getCbdDataQuery()
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      }).catch(()=>{
        this.loading = false
      })
    },
    // Linie预览
    getSwitchPartsByParams(){
      this.loading = true
      let params = {
        requirementAekoId:this.transmitObj.aekoApprovalDetails.requirementAekoId,
        linieId:this.transmitObj.aekoApprovalDetails.linieId
      }
      getSwitchPartsByParams(params).then(res=>{
        if(res?.code==='200'){
          this.partsList = res.data;
          this.partsId = this.partsList&&this.partsList[0].key
          this.getCbdDataQuery()
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      }).catch(()=>{
        this.loading = false
      })
    },
    getCbdDataQuery(){
      this.$emit('getCbdDataQuery',this.partsId)
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  height: 22px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  color: #000000;
}
.mb-20 {
  margin-bottom: 20px;
}
.i-select {
  width: 366px;
  margin-left: 20px;
  display: inline-block;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
  border-radius: 4px;
}
</style>