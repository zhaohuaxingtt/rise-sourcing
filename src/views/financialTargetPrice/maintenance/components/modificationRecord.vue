<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 15:55:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-22 16:37:54
 * @Description: 修改记录弹窗
 * @FilePath: \front-web\src\views\financialTargetPrice\maintenance\components\modificationRecord.vue
-->

<template>
  <iDialog 
    title="修改记录"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <tableList :activeItems='"a1"' :selection="false" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, iSearch, iPagination, iMessage } from 'rise'
import tableList from '../../components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { modifyTableTitle } from '../data'
import {findBySearches, getCartypeDict} from "@/api/partsrfq/home";
import { getDictByCode } from '@/api/dictionary'
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iSelect, iInput, tableList, iSearch, iPagination },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      tableData: [],
      tableTitle: modifyTableTitle,
      tableLoading: false,
      selectParts: []
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        
        this.getTableList()
        
      }
    }
  },
  methods: {
    /**
     * @Description: 表格数据选中
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      // this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      // getAccessoryManageList(params).then(res => {
      //   if(res.result) {
      //     this.tableData = res.data.records
      //     this.page.pageSize = res.data.size
      //     this.page.currPage = res.data.current
      //     this.page.totalCount = res.data.total
      //   } else {
      //     this.tableData = []
      //     iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      //   }
      // }).finally(() => {
      //   this.tableLoading = false
      // })
    },
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage() {
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: {  }})
      window.open(router.href,'_blank')
    },
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
}
</style>