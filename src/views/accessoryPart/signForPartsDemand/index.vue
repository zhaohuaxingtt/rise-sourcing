<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 13:57:11
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-27 00:19:37
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\index.vue
-->

<template>
  <iPage class="signForParts" v-permission="PARTSIGN_INDEXPAGE">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
        <div>
          <div class="margin-bottom33">
            <iNavMvp @change="change" right routerPage lev="2" :list="navList" />
          </div>
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="sure" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
                <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]"></iSelect> 
                <iDatePicker v-else-if="item.type === 'date'" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchParams[item.value]"></iDatePicker>
                <iInput v-else v-model="searchParams[item.value]"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">配件需求签收</span>
                <div class="floatright">
                  <!--------------------签收按钮----------------------------------->
                  <iButton @click="batchData">签收</iButton>
                  <!--------------------退回EPS按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" >退回EPS</iButton>
                  <!--------------------分配询价科室按钮----------------------------------->
                  <iButton @click="changeInquiryDialogVisible(true)" >分配询价科室</iButton>
                  <!--------------------分配询价采购员按钮----------------------------------->
                  <iButton @click="changeBuyerDialogVisible(true)" >分配询价采购员</iButton>
                  <!--------------------导出按钮----------------------------------->
                  <iButton @click="remove" >导出</iButton>
                </div>
            </div>
            <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
                <!------------------------------------------------------------------------>
                <!--                  表格分页                                          --->
                <!------------------------------------------------------------------------>
                <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
                  :page-size="page.pageSize"
                  :layout="page.layout"
                  :current-page="page.currPage"
                  :total="page.totalCount"
                />
          </iCard>
          <assignInquiryDepartmentDialog :dialogVisible="inquiryDialogVisible" @changeVisible="changeInquiryDialogVisible" />
          <assignInquiryBuyerDialog :dialogVisible="buyerDialogVisible" @changeVisible="changeBuyerDialogVisible" />
          <backDialog :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" />
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="进度监控" name="progress"></el-tab-pane> -->
    </el-tabs>
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iDatePicker, iMessage, iNavMvp } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../../designate/designatedetail/components/tableList'
import { tableTitle, tableMockData, searchList } from '../signForPartsDemand/data'
import assignInquiryDepartmentDialog from './components/assignInquiryDepartment'
import assignInquiryBuyerDialog from './components/assignInquiryBuyer'
import backDialog from './components/backEps'
import { navList } from "@/views/partsign/home/components/data"
import { cloneDeep } from 'lodash'
export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, iDatePicker, assignInquiryDepartmentDialog, assignInquiryBuyerDialog, backDialog, iNavMvp },
  data() {
    return {
      tableData: tableMockData,
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {},
      inquiryDialogVisible: false,
      buyerDialogVisible: false,
      backDialogVisible: false,
      selectParts: [],
      navList: cloneDeep(navList),
      tab: "source",
    }
  },
  methods: {
    openPage() {
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: {  }})
      window.open(router.href,'_blank')
    },
    handleSelectionChange(val) {
      this.selectParts = val
    },
    changeInquiryDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.inquiryDialogVisible = visible
    },
    changeBuyerDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.buyerDialogVisible = visible
    },
    changebackDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.backDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>
.signForParts {
  position: relative;

  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;
        & + & {
          padding: 0 25px;
        }
      }
      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }
}
</style>