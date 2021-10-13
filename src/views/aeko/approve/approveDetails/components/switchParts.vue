<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:17:13
 * @LastEditTime: 2021-10-12 21:32:21
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
import { iCard, iSelect, iTableCustom } from "rise";
import tableList from "rise/web/quotationdetail/components/tableList";
import { getSwitchParts } from "@/api/aeko/approve";
export default {
  components: {
    iCard,
    iSelect,
    iTableCustom,
    tableList,
  },
  props:{
    tableData:{
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data() {
    return {
      test: "123",
      partsId: "",
      partsObj:{},
      tableTitle: switchPartsTableTitle,
    };
  },
  created(){
    // this.getPartsList()
  },
  methods:{
    // 获取切换零件下拉框数据
    getPartsList() {
      // let res = {
      //   code: "string",
      //   data: [
      //     {
      //       additionalProp1: "string",
      //       additionalProp2: "string",
      //       additionalProp3: "string",
      //     },
      //   ],
      //   desEn: "string",
      //   desZh: "string",
      //   result: true,
      // };
      // let { data } = res;
      getSwitchParts({workFlowId:1}).then(({data})=>{
        this.partsObj = data[0];
        this.partsId = Object.values(this.partsObj)[0]
        this.$emit('getCbdDataQuery',this.partsId)
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