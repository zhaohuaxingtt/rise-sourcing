<!--
 * @Author: your name
 * @Date: 2021-06-17 11:40:10
 * @LastEditTime: 2021-06-24 15:30:14
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
            <iSelect></iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_RFQHAO')">
            <iInput
              placeholder="请输入"
              v-model="form.aaa"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_FSHAO')">
            <iInput
              placeholder="请输入"
              v-model="form.bbb"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNUMBER')">
            <iInput
              placeholder="请输入"
              v-model="form.ccc"
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

    <span
      slot="footer"
      class="dialog-footer"
    >
      <iButton @click="submit">{{$t('LK_QUEREN')}}</iButton>
      <iButton @click="clearDiolog">{{$t('LK_QUXIAO')}}</iButton>
    </span>
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
        {
          id: 1,
          rfqName: "aaa",
        },
        {
          id: 2,
        },
      ],
      confirmTableHead,
      form: {
        aaa: "",
        bbb: "",
        ccc: "",
      },
    };
  },
  methods: {
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

