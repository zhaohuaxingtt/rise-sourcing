<!--
 * @Author: your name
 * @Date: 2021-06-17 11:40:10
 * @LastEditTime: 2022-12-29 17:08:01
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 查找零件弹窗
 * @FilePath: \front-web\src\views\partsrfq\components\findingPart.vue
-->

<template>
  <iDialog :title="$t('TPZS.CZLJ')"
           :visible.sync="value"
           width="90%"
           @close="clearDiolog">
    <div class="search">
      <iSearch :icon="true"
               @sure="sure"
               @reset="reset">
        <el-form>
          <el-form-item :label="$t('LK_CAILIAOZU')">
            <iSelect v-model="form.categoryCode"
                     clearable>
              <el-option :value='item.categoryCode'
                         :label='item.categoryName'
                         v-for="item in optionList"
                         :key="item.categoryId"></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_RFQHAO')">
            <iInput placeholder="请输入"
                    v-model="form.rfqId"
                    clearable></iInput>
          </el-form-item>
          <el-form-item :label="$t('partsprocure.PARTSPROCUREFSNFGSNFSPNR')">
            <iInput placeholder="请输入"
                    v-model="form.fsNum"
                    clearable></iInput>
          </el-form-item>
          <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNUMBER')">
            <!-- <iInput placeholder="请输入"
                    v-model="form.partNum"
                    clearable></iInput> -->
            <iMultiLineInput v-model="form.partNum" :title="$t('partsprocure.PARTSPROCUREPARTNUMBER')" />
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <div class="searchContent">
      <div class="title">
        <span>搜索结果: 当前列表不包含只有A价、没有报价明细的记录</span>
        <iButton @click="add">{{ $t("LK_TIANJIA") }}</iButton>
      </div>
      <tableList :tableData="confirmTableData"
                 :tableTitle="confirmTableHead"
                 ref="partSelectionTable"
                 class="table-footerStyle"
                 v-loading="loading"
                 :radio="status===1?true:false"
                 :selectedParts="selectedParts"
                 @handleSelectionChange="handleSelectionChange">
      </tableList>
      <iPagination v-update
                   @size-change="handleSizeChange($event, pagePart)"
                   @current-change="handleCurrentChange($event, pagePart)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page='page.currPage'
                   :total="page.totalCount" />
    </div>
  </iDialog>
</template>
<script>
import { iButton, iDialog, iSearch, iSelect, iInput, iMessage, iPagination, iMultiLineInput } from "rise";
import { confirmTableHead } from "./data";
import emitter from '@/utils/emitter.js';
import {
  pagePart,
  category,
} from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import tableList from "@/components/iTableList";
export default {
  name: "findingParts",
  components: {
    iButton,
    iDialog,
    iSearch,
    iSelect,
    iInput,
    tableList,
    iPagination,
    iMultiLineInput
  },
  mixins: [emitter],
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
    selectedParts: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  data () {
    return {
      optionList: [],
      confirmTableData: [],
      confirmTableHead,
      form: {
        categoryCode: "",
        rfqId: "",
        fsNum: "",
        partNum: "",
        size: 1000
      },
      status: 0,
      colData: {},
      loading: false,
      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper',
      },
    };
  },
  created () {
    this.status = this.$store.state.rfq.entryStatus
    this.form.categoryCode = this.$store.state.rfq.materialGroup
    this.pagePart();
    // this.category();
  },
  methods: {
    handleSizeChange (val, callback) {
      if (typeof callback != 'function')
        return console.warn(
          'function handleSizeChange parmars must be a function!'
        )
      this.page.pageSize = val
      callback()
    },
    handleCurrentChange (val, callback) {
      if (typeof callback != 'function')
        return console.warn(
          'function handleCurrentChange parmars must be a function!'
        )
      this.page.currPage = val
      callback()
    },
    pageParmars () {
      return {
        pageSize: this.page.pageSize,
        currPage: this.page.currPage,
      }
    },
    async pagePart () {
      this.loading = true
      let res = await category({});
      this.optionList = res.data
      if (this.status === 1) {
        this.form.status = 'NOMINATED'
      }
 
      let params = {
        source:this.$route.query.source||'',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      pagePart(params)
        .then((res) => {
          if (res.code === "200") {
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
            this.confirmTableData = res.data;
            this.confirmTableData.forEach((value, index) => {
              value.index = index + 1;
            });
            console.log(this.confirmTableData)
            this.$nextTick(() => {
              if (this.selectedParts && this.selectedParts.length > 0) {
                var selectedList = []
                this.selectedParts.forEach((paramPart) => {
                  var selected = this.confirmTableData.filter((item) => {
                    return item.fsNum == paramPart.fs
                  })
                  if (selected.length > 0) {
                    selectedList.push(selected[0])
                  }
                })
                if (selectedList.length > 0) {
                  selectedList.forEach((sel) => {
                    this.$refs.partSelectionTable.$refs.moviesTable.toggleRowSelection(sel, true)
                  })
                }
              }
              this.loading = false
              if (!res.data) {
                iMessage.error('抱歉，无法查询到结果（输入错误或者不存在），请确认后重新输入。')
              }
            })
          }
        })
        .catch((e) => {
          this.loading = false
        });
    },

    clearDiolog () {

      this.$emit("close", false);
    },
    submit () {

      this.$emit("submit");
    },
    sure () {
      this.page.currPage = 1
      this.pagePart();
    },
    handleSelectionChange (val) {
      this.colData = val
    },
    reset () {
      this.form = {
        categoryCode: "",
        rfq: "",
        fsNum: "",
        partNum: "",
      };
      this.page.currPage = 1
      this.pagePart();
    },
    add () {
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
::v-deep .el-table .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>

