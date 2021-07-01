<!--
 * @Author: haojiang
 * @Date: 2021-07-01 14:30:59
 * @LastEditTime: 2021-07-01 15:13:44
 * @LastEditors: Please set LastEditors
 * @Description: M签字单预览导出 jira-1571
 * @FilePath: /front-web/src/views/designate/home/signSheet/signView.vue
-->
<template>
<iPage>
  <div class="nomination-wraper">
    <iCard>
      <div class="signPreview">
        <div class="signPreview-header">
          <div class="font18 font-weight">{{'Summary list for production purchasing'}}</div>
          <div class="control">
            <iButton @click="exportfile">
              {{ language('LK_DAOCHU', '导出') }}
            </iButton>
            <span class="tab-icon" @click="close">
              <icon symbol name="iconguanbixiaoxiliebiaokapiannei"></icon>
            </span>
          </div>
        </div>
        <div class="signPreview-body padding-top30">
          <tablelist
            index
            :selection="false"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            v-loading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
          >
          </tablelist>
        </div>
        <div class="signPreview-footer">
          <div class="tit"><span class="label">Approver:</span><span class="line"></span></div>
          <div class="time">2021-06-30</div>
        </div>
      </div>
    </iCard>
  </div>
</iPage>
</template>
<script>
import {signsheetViewTableTitle as tableTitle} from './components/data'
import tablelist from "@/views/designate/supplier/components/tableList";
import {
  iPage,
  iCard,
  icon,
  iButton
} from 'rise'
export default {
  components: {
    iPage,
    iCard,
    icon,
    iButton,
    tablelist
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
    }
  },
  methods: {
    close() {
      
    },
    exportfile() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.signPreview {
  // min-height: 600px;
  .signPreview-header {
    // position: relative;
    display: flex;
    align-content: center;
    justify-content: space-between;
    .tab-icon{
      width: 20px;
      height: 20px;
      font-size: 18px;
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
    }
  }
  .signPreview-body {
    ::v-deep .el-table {
      min-height: 450px;
      &::before {
        background: #fff;
      }
    }
  }
  .signPreview-footer {
    // position: relative;
    height: 60px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    .tit {
      span {
        font-weight: bold;
        color: #000;
      }
      .line {
        display: inline-block;
        width: 315px;
        height: 20px;
        border-bottom: 1px solid #d4d4d4;
        margin-left: 20px;
      }
    }
    .time {
      color: #777777;
      display: inline-block;
    }
  } 
  
}
</style>