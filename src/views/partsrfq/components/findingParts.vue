<!--
 * @Author: your name
 * @Date: 2021-06-17 11:40:10
 * @LastEditTime: 2021-06-28 20:47:40
 * @LastEditors: Please set LastEditors
 * @Description: 查找零件弹窗
 * @FilePath: \front-web\src\views\partsrfq\components\findingPart.vue
-->

<template>
  <iDialog
    :title="$t('LK_CHAZHAOLINGJIAN')"
    :visible.sync="value"
    width="90%"
    @close="clearDiolog"
  >
    <div class="search">
      <iSearch
        :icon=true
        @sure="sure"
        @reset="reset"
      >
        <el-form>
          <el-form-item :label="$t('LK_CAILIAOZU')">
            <iSelect v-model="form.categoryCode">
                <el-option value='' label='全部' v-for=""></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_RFQHAO')">
            <iInput
              placeholder="请输入"
              v-model="form.rfqId"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_FSHAO')">
            <iInput
              placeholder="请输入"
              v-model="form.fsNum"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNUMBER')">
            <iInput
              placeholder="请输入"
              v-model="form.partNum"
            ></iInput>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <div class="searchContent">
      <div class="title">
        <span>搜索结果</span>
        <iButton>{{$t('LK_TIANJIA')}}</iButton>
      </div>
      <iTableList
        :tableData="confirmTableData"
        :tableTitle="confirmTableHead"
        class="table-footerStyle"
      >
      </iTableList>
    </div>
  </iDialog>
</template>
<script>
import {
  iButton,
  iDialog,
  iSearch,
  iSelect,
  iInput,
  iTableList,
} from "@/components";
import { confirmTableHead } from "./data";
import {pagePart} from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js"
export default {
  name:"findingParts",
  components: {
    iButton,
    iDialog,
    iSearch,
    iSelect,
    iInput,
    iTableList,
  },

  props: {
    title: { type: String, default: "LK_SHANGCHUAN" },
    value: { type: Boolean },
    repeatClick: Boolean,
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      confirmTableData: [
      ],
      confirmTableHead,
      form: {
        categoryCode: "",
        rfqId: "",
        fsNum: "",
        partNum:"",

      },
    };
  },
  created() {
    this.pagePart()
  },
  methods: {
    pagePart(){
     pagePart(this.form).then((res)=>{
        if(res.code==="200"){
          this.confirmTableData=res.data
          this.confirmTableData.forEach((value, index) => {
            value.index=index+1
          })
          console.log(this.confirmTableData)
        }
     }).catch((e) => {
       
     })
    },
    
    clearDiolog() {
      console.log(111)
      this.$emit("close", false);
    },
    submit() {
      console.log(111)
      this.$emit("submit");
    },
    sure(val) {},
    reset(val) {},
  },
};
</script>
<style lang='scss' scoped>
.search {
  padding: 0 10px 20px 10px;
}
.searchContent {
  padding: 0 10px 20px 10px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
}
</style>

