<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-28 16:51:34
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-28 20:20:27
 * @Description: MTZ零件查询表
-->
<template>
  <iPage class="aeko-mtz" >
    <div class="margin-bottom25 aeko-mtz-header">
      <span class="akeoTitle">{{language('LK_MTZBIANGENG', 'MTZ变更')}}:{{ $route.query.aekonum }}</span>
      <div style="aeko-mtz-submenu">
        <logButton class="margin-left20" @click="toLogPage" />
        <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
      </div>
    </div>
    <!-- 表格 -->
    <iCard class="aeko-mtz-table">
      <div class="floatright">
        <iButton
          @click="reset"
        >
          {{ language('REST', '重置') }}
        </iButton>
        <iButton
          @click="reset"
        >
          {{ language('LK_COPY', '复制') }}
        </iButton>
        <iButton
          @click="reset"
        >
          {{ language('SHANCHU', '删除') }}
        </iButton>
        <iButton
          @click="reset"
        >
          {{ language('BAOCUN', '保存') }}
        </iButton>
      </div>
      <tablelist
        height="400"
        index
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #fileName="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;" @click="download(scope.row)">
            {{ scope.row.fileName }}
          </a>
        </div>
      </template>
      </tablelist>
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
  </iPage>
</template>
<script>
import {tableTitle} from './components/data'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iPage, iCard, iSelect, iPagination, icon, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import logButton from "@/components/logButton"
// 解释附件、审批附件查询，审批附件带taskId
import {
  getAuditFilePage,
} from '@/api/aeko/detail/approveAttach'

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    icon,
    logButton,
    iPagination,
    tablelist
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    // 跳转查看日志
    toLogPage() {
      const id = 'scheduleRecordId'
      const router =  this.$router.resolve({path: `/log?recordId=${id}`})
      window.open(router.href, '_blank')
    },
    gotoDBhistory() {
      const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/historyprocessdb`})
      window.open(router.href,'_blank')
    },
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      const parmas = {
        
      }
      this.tableLoading = true
      getAuditFilePage(parmas).then(res => {
        if (res.code === '200') {
          this.tableListData = (res.data || []).map(o => {
            o._fileDescribe = o.fileDescribe
            o.fileSize = `${o.fileSize} MB`
            return o
          })
          this.page.totalCount = res.total
        } else {
          this.tableListData = []
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.aeko-mtz {
  .aeko-mtz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .akeoTitle {
      font-weight: bold;
    }
  }
  .aeko-mtz-submenu {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
  .aeko-mtz-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.icon {
  svg {
    font-size: 28px;
  }
}
</style>