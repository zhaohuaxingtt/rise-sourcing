<!--
 * @Author: your name
 * @Date: 2021-06-17 11:40:10
 * @LastEditTime: 2021-07-01 17:25:38
 * @LastEditors: Please set LastEditors
 * @Description: 查找零件弹窗
 * @FilePath: \front-web\src\views\partsrfq\components\findingPart.vue
-->

<template>
  <iDialog
    :title="$t('TPZS.CZLJ')"
    :visible.sync="value"
    width="90%"
    @close="clearDiolog"
  >
    <div class="search">
      <iSearch :icon="true" @sure="sure" @reset="reset">
        <el-form>
          <el-form-item :label="$t('LK_CAILIAOZU')">
            <iSelect v-model="form.categoryCode">
              <el-option :value='item.categoryCode' :label='item.categoryName' v-for="item in optionList" :key="item.categoryId"></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_RFQHAO')">
            <iInput placeholder="请输入" v-model="form.rfqId"></iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_FSHAO')">
            <iInput placeholder="请输入" v-model="form.fsNum"></iInput>
          </el-form-item>
          <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNUMBER')">
            <iInput placeholder="请输入" v-model="form.partNum"></iInput>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <div class="searchContent">
      <div class="title">
        <span>搜索结果</span>
        <iButton @click="add">{{ $t("LK_TIANJIA") }}</iButton>
      </div>
      <tableList
        :tableData="confirmTableData"
        :tableTitle="confirmTableHead"
        class="table-footerStyle"
        @handleSelectionChange="handleSelectionChange"
      >
      </tableList>
    </div>
  </iDialog>
</template>
<script>
import { iButton, iDialog, iSearch, iSelect, iInput } from 'rise';
import { confirmTableHead } from "./data";
import emitter from '@/utils/emitter.js'
import {
  pagePart,
  category,
} from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import tableList from "@/views/partsrfq/reportList/components/tableList";
export default {
  name: "findingParts",
  
  components: {
    iButton,
    iDialog,
    iSearch,
    iSelect,
    iInput,
    tableList,
  },
  mixins:[emitter],
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
      optionList:[],
      confirmTableData: [],
      confirmTableHead,
      form: {
        categoryCode: "",
        rfqId: "",
        fsNum: "",
        partNum: "",
      },
      colData:{}
    };
  },
  created() {
    this.pagePart();
    this.dispatch('parentCom','event',"222")
    // this.category();
  },
  methods: {
    async pagePart() {
      let res= await category({});
      this.optionList=res.data
      pagePart(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.confirmTableData = res.data;
            this.confirmTableData.forEach((value, index) => {
              value.index = index + 1;
            });
           
          }
        })
        .catch((e) => {});
    },
    
    clearDiolog() {

      this.$emit("close", false);
    },
    submit() {

      this.$emit("submit");
    },
    sure() {
      this.pagePart();
    },
    handleSelectionChange(val){
      this.colData=val
    },
    reset() {
      this.form = {
        categoryCode: "",
        rfqId: "",
        fsNum: "",
        partNum: "",
      };
      this.pagePart();
    },
    add(){
      this.$emit('add', this.colData);
    }
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

