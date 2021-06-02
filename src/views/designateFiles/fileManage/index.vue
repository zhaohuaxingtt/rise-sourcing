<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 16:20:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-31 15:30:07
 * @Description: 附件综合管理
 * @FilePath: \front-web\src\views\designateFiles\fileManage\index.vue
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
                <iInput v-else v-model="searchParams[item.value]"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">附件综合查询</span>
                <div class="floatright">
                  <!--------------------分配LINIE/CSS----------------------------------->
                  <iButton @click="changeLinieDialogVisible(true)" >分配LINIE/CSS</iButton>
                  <!--------------------退回按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" >退回</iButton>
                  <!--------------------创建RFQ----------------------------------->
                  <iButton @click="handleCreateRFQ">创建RFQ</iButton>
                  <!--------------------加入已有RFQ----------------------------------->
                  <iButton @click="batchData">加入已有RFQ</iButton>
                  <!--------------------删除按钮----------------------------------->
                  <iButton @click="remove" >删除</iButton>
                </div>
            </div>
            <tableList :activeItems='"c"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
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
          <!------------------------------------------------------------------------>
          <!--                  分配LINIE/CSS弹窗                                   --->
          <!------------------------------------------------------------------------>
          <linieDialog :dialogVisible="linieDialogVisible" @changeVisible="changeLinieDialogVisible" />
          <!------------------------------------------------------------------------>
          <!--                    退回弹窗                                        --->
          <!------------------------------------------------------------------------>
          <backDialog :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" />
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="进度监控" name="progress"></el-tab-pane> -->
    </el-tabs>
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage, iNavMvp } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import { tableTitle, tableMockData, searchList } from './data'
import linieDialog from './components/setLinie'
import backDialog from './components/back'
import { navList } from "@/views/partsign/home/components/data"
import { cloneDeep } from 'lodash'
export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, linieDialog, backDialog, iNavMvp },
  data() {
    return {
      tableData: tableMockData,
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {},
      linieDialogVisible: false,
      backDialogVisible: false,
      selectParts: [],
      navList: cloneDeep(navList),
      tab: "source",
    }
  },
  methods: {
    /**
     * @Description: 点击RFQ编号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage() {
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: {  }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 表格选中事件
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    /**
     * @Description: 分配LINIE/CSS弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changeLinieDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.linieDialogVisible = visible
    },
    /**
     * @Description: 退回弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changebackDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.backDialogVisible = visible
    },
    /**
     * @Description: 点击创建RFQ按钮跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCreateRFQ() {
      const router =  this.$router.resolve({path: '/sourcing/createrfq', query: { type: '2' }})
      window.open(router.href,'_blank')
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