<!--
 * @Author: wentliao
 * @Date: 2021-08-07 10:25:28
 * @Description: aeko详情-审批记录
-->
<template>
  <iCard class="aekoDetailRecord">
    <span class="font18 font-weight">
      {{ language("SHENPIJILU", "审批记录") }}
    </span>
    <div class="editControl floatright margin-bottom20">
      <iButton class="" @click="submit">
        {{ language("TIJIAO", "提交") }}
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
    >
      <template #aekoNum="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;">
            {{ scope.row.aekoNum }}
          </a>
        </div>
      </template>
      <template #describe="">
        <a class="link-underline" href="javascript:;">
          {{ language("CHAKAN", "查看") }}
        </a>
      </template>
      <template #attach="scope">
        <a class="link-underline" href="javascript:;" @click="openUploadDialog(scope.row)" v-if="!scope.row.attachment">
          {{ language("LK_SHANGCHUAN", "上传") }}
        </a>
        <a class="link-underline" href="javascript:;" v-else>
          {{ language("CHAKAN", "查看") }}
        </a>
      </template>
    </tablelist>
    <div class="pagination">
      <iPagination
        v-update
        class="pagination"
        @size-change="handleSizeChange($event, getFetchData)"
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
    <!-- 上传附件弹窗 -->
    <iFileDialog
      :title="language('JIESHIFUJIANCHAKAN', '解释附件查看')"
      :visible.sync="attachDialogVisibal"
      :hostId="attachAekoCode"
      :fileType="'108'"
      :init="false"
      :readOnly="false" />
  </iCard>
</template>

<script>
import {approveReCordTableTitle as tableTitle} from '../data'
import iFileDialog from 'rise/web/components/iFile/dialog'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iCard, iButton, iPagination, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  getAuditFilePage,
  approveDistributionSave
} from '@/api/aeko/detail/approveRecord'

export default {
  name: "aekoDetailRecord",
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    iFileDialog
  },
  props:{
    aekoInfo:{
      type:Object,
      default:()=>{},
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
      // 附件弹窗
      attachDialogVisibal: false,
      attachAekoCode: ''
    };
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    openUploadDialog(row) {
      console.log('openUploadDialog', row)
      this.attachDialogVisibal = true
      this.attachAekoCode = row.requirementAekoId
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      const parmas = Object.assign({
        current: this.page.currPage,
        size: this.page.pageSize
      })
      this.tableLoading = true
      getAuditFilePage(parmas).then(res => {
        if (res.code === '200') {
          const tableListData = (res.data || []).map(o => {
            o.unresigned = !o.chiefName
            return o
          })
          this.tableListData = tableListData
          this.page.totalCount = res.total
        } else {
          this.tableListData = []
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @description: 提交
     * @param {*}
     * @return {*}
     */    
    submit() {
      const parmas = []
      this.$confirm(this.language('submitSure','您确定要执行提交操作吗？')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          approveDistributionSave(parmas).then(res => {
            if (res.code === '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
              this.getFetchData()
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch(e => {
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.aekoDetailRecord {
  
}
</style>