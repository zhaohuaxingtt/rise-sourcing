<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-16 14:50:50
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-16 16:53:58
 * @Description: 项目进度监控 - 未进TIPS表和CKD/HT零件
-->
<template>
  <div class="margin-top20">
    <iCard>
      <div class="cardview">
        <div class="cardview-header">
          <div class="font18 font-weight">{{language(tableTitle.titleKey, tableTitle.titleName)}}</div>
          <div class="control">
            <iButton @click="exportfile">
              {{ language('LK_DAOCHU', '导出') }}
            </iButton>
          </div>
        </div>
        <div class="cardview-body padding-top30">
          <tablelist
            height="450"
            index
            :selection="true"
            :tableData="tableListData"
            :tableTitle="tableTitle.title"
            :tableLoading="tableLoading"
            :lang="true"
            v-loading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
          >
          </tablelist>
        </div>
      </div>
      <div class="pagination">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>
<script>
import {TIPStableTitle,CKDHTtableTitle} from './components/data'
import tablelist from "rise/web/components/iFile/tableList";
import {
  iCard,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

export default {
  mixins: [ filters, pageMixins ],
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      // tableTitle: tableTitle,
      ltcTitle: [],
      selectTableData: [],
      startLoding: false,
    }
  },
  created() {
    // this.getFetchData()
  },
  computed: {
    tableTitle() {
      const title = {
        "1": {
          titleName: '未进TIPS表的已释放零件',
          titleKey: 'WEIJINTIPSBIAOYISHIFANGLINGJIAN',
          title: TIPStableTitle
        },
        "2": {
          titleName: 'CKD/HT零件',
          titleKey: 'CKDHTLINGJIAN',
          title: CKDHTtableTitle
        }
      }
      const type = this.$route.query.type || 1
      return title[type]
    },
  },
  methods: {
    close() {
      this.$router.back()
    },
    // 获取定点管理列表
    async getFetchData(params = {}) {
      this.tableLoading = true
      try {
        // 
      } catch(e) {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    exportfile() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.cardview {
  // min-height: 600px;
  .cardview-header {
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
  .cardview-body {
    ::v-deep .el-table {
      min-height: 450px;
      &::before {
        background: #fff;
      }
      .el-table__body-wrapper {
        min-height: 90%;
        &::-webkit-scrollbar{
          /*width: 0;宽度为0隐藏*/
          width: 0;

        }
        &::-webkit-scrollbar{
          /*width: 0;宽度为0隐藏*/
          width: 0;
        }
        &::-webkit-scrollbar-thumb{
          border-radius: 2px;
          height: 50px;
          // background: #efefef;
          background: #fff;
        }
        &::-webkit-scrollbar-track{
          // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          background: #fff;
        }
      }
    }
  }
  .cardview-footer {
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