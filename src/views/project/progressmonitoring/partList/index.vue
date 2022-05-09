<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-16 14:50:50
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-23 16:36:46
 * @Description: 项目进度监控 - 未进TIPS表和CKD/HT零件
-->
<template>
  <div class="margin-top20">
    <iCard >
      <div class="cardview">
        <div class="cardview-header">
          <div class="font18 font-weight">{{titleKey ? language(tableTitle.titleKey, tableTitle.titleName) : tableTitle.titleName}}</div>
          <div class="control">
            <iButton @click="exportfile">
              {{ language('LK_DAOCHU', '导出') }}
            </iButton>
            <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
          </div>
        </div>
        <div class="cardview-body padding-top30">
          <tableList
            permissionKey="PROJECT_PROGRESSMONITORING_PARTLIST"
            height="450"
            index
            ref="tableList"
            :lang="true"
            :selection="true"
            :tableData="tableListData"
            :tableTitle="tableTitle.title"
            :tableLoading="tableLoading"
            v-loading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
          >
          <template #cartypeProject="">
            <span>{{carProjectName}}</span>
          </template>
          <template #productGroup="scope">
            <span v-if="$i18n.locale === 'zh'">{{scope.row.productGroupZh}}</span>
            <span v-else>{{scope.row.productGroupDe}}</span>
          </template>
          </tableList>
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
import {TIPStableTitle,CKDHTtableTitle, OTSEMtableTitle} from './components/data'
import {
  iCard,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import {pageProProgressMonitorData,proProgressMonitorFile} from '@/api/project/process'
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [ filters, pageMixins,tableSortMixins ],
  components: {
    tableList,
    iCard,
    iButton,
    iPagination,
    buttonTableSetting
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      // tableTitle: tableTitle,
      ltcTitle: [],
      selectTableData: [],
      startLoding: false,
      carProjectName: this.$route.query.carProjectName || ''
    }
  },
  created() {
    this.getFetchData()
  },
  computed: {
    tableTitle() {
      const title = {
        "1": {
          titleName: '未进TIPS表(询价资料已释放)',
          titleKey: 'WEIJINTIPSBIAOXUNJIAZILIAOYISHIFANG',
          title: TIPStableTitle,
          permision: 'PROJECTMGT-MONITORPARTLIST-NOTIPSTABLE|项目管理-监控零件清单-未进TIPS表格'
        },
        "2": {
          titleName: 'CKD/HT/ZSB零件',
          titleKey: 'CKDHTZSBLINGJIANEN',
          title: CKDHTtableTitle,
          permision: 'PROJECTMGT-MONITORPARTLIST-CKDHTTABLE|项目管理-监控零件清单-CKDHT表格'
        },
        "3": {
          titleName: 'EM&OTS已完成零件',
          titleKey: 'EMOTSYIWANCHENGLINGJIAN',
          title: OTSEMtableTitle,
          permision: 'PROJECTMGT-MONITORPARTLIST-EMOTSDONEABLE|项目管理-监控零件清单-EM&OTS已完成表格'
        },
        "4": {
          titleName: '1999',
          title: CKDHTtableTitle,
          permision: 'PROJECTMGT-MONITORPARTLIST-1999TABLE|项目管理-监控零件清单-1999表格'
        }
      }
      const type = this.$route.query.type || 1
      return title[type]
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    close() {
      this.$router.back()
    },
    // 获取定点管理列表
    async getFetchData(params = {}) {
      this.tableLoading = true
      params = Object.assign({
        partMonitorStatus: this.$route.query.type == 4 ? '' : this.$route.query.type == 3 ? 4 : this.$route.query.type,
        partStatus: this.$route.query.type == 4 ? '10': this.$route.query.type == 3 ? 9 : 1,
        projectId: this.$route.query.carProjectId,
        current: this.page.currPage,
        size: this.page.pageSize,
        csfFgBemerkung: this.$route.query.type == 4 ? '1999'  : ''
      }, params)
      try {
        const res = await pageProProgressMonitorData(params)
        if (res.code === '200') {
          this.tableListData = res.data || []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
        // 
      } catch(e) {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    async exportfile() {
      try {
        const params = {
        partMonitorStatus: this.$route.query.type == 4 ? '' : this.$route.query.type == 3 ? 4 : this.$route.query.type,
        partStatus: this.$route.query.type == 4 ? '10': this.$route.query.type == 3 ? 9 : 1,
        projectId: this.$route.query.carProjectId,
        ids: this.selectTableData.map(item => item.id),
        csfFgBemerkung: this.$route.query.type == 4 ? '1999'  : ''
      }
        proProgressMonitorFile(params)
      } catch(e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
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
          // border-radius: 2px;
          // height: 50px;
          // background: #efefef;
          // background: #fff;
        }
        &::-webkit-scrollbar-track{
          // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          // border-radius: 2px;
          // background: #fff;
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