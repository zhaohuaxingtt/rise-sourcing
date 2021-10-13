<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:17:13
 * @LastEditTime: 2021-10-13 18:34:39
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard class="mb-20">
    <span class="title">{{language('QIEHUANLINGJIAN', '切换零件')}}:</span>
    <div class="i-select mb-20">
      <iSelect v-model="partsId" :placeholder="language('QINGXUANZE','请选择')" @change="getCbdDataQuery">
        <el-option
          :value="id"
          :label="label"
          v-for="(label, id) in partsObj"
          :key="id"
        ></el-option>
      </iSelect>
    </div>
    <tableList
      v-loading="loading"
      lang
      class="table"
      :selection="false"
      :tableTitle="tableTitle"
      :tableData="tableData"
    >
        <template #originalAPrice="scope">
          <el-popover
            placement="top"
            trigger="hover">
            <template>
              <p style="text-align:center">{{ scope.row.source }}</p>
            </template>
            <template #reference>
              <span>{{ scope.row.originalAPrice }}</span>
            </template>
          </el-popover>
        </template>
    </tableList>
  </iCard>
</template>

<script>
import { switchPartsTableTitle } from "../data.js";
import { iCard, iSelect } from "rise";
import tableList from "rise/web/quotationdetail/components/tableList";
import { getSwitchParts } from "@/api/aeko/approve";
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
      partsObj:{},
      tableTitle: switchPartsTableTitle,
    };
  },
  created(){
    this.getPartsList()
    // this.workFlowId&&this.getPartsList()
  },
  methods:{
    // 获取切换零件下拉框数据
    getPartsList() {
      this.loading = true
      getSwitchParts({workFlowId:this.workFlowId}).then(({data})=>{
        this.partsObj = data[0];
        this.partsId = this.partsObj&&Object.values(this.partsObj)[0]
        this.getCbdDataQuery()
        this.loading = false
      }).catch(()=>{
        this.loading = false
      })
    },
    getCbdDataQuery(){
      // this.$emit('getCbdDataQuery',this.partsId)
      this.$emit('getCbdDataQuery','1')
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