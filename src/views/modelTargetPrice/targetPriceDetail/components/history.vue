<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 14:08:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-09 21:41:08
 * @Description: 修改历史card
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\components\history.vue
-->

<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{language('XIUGAIJILU','修改记录')}}</span>
        <div class="floatright">
          <!-- <iButton @click="handleExport" >{{language('DAOCHU','导出')}}</iButton> -->
        </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList :activeItems='"fsNum"' :selection="false" indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
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
</template>

<script>
import {iCard,iPagination, iMessage} from 'rise'
import tableList from '../../components/tableList'
import { historyTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
import { getRecordList } from "@/api/modelTargetPrice/index"
export default {
  mixins: [pageMixins],
  components: {iCard,iPagination,tableList},
  props: {
    id: {type:String}
  },
  watch: {
    id:{
      handler(val) {
        if(val) {
          this.getTableList()
        }
      },
      immediate: true
     }
  },
  data() {
    return {
      tableTitle: historyTableTitle,
      tableData: [],
      tableLoading: false,
    }
  },
  methods: {
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { projectId: row.purchasingProjectPartId, businessKey: row.partProjectType }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      if (!this.id) {
        return
      }
      this.tableLoading = true
      const params = {
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getRecordList(this.id, params).then(res => {
        if(res?.result) {
          this.page = {
            ...this.page,
            totalCount: res.total,
            currPage: res.pageNum,
            pageSize: res.pageSize
          }
          this.tableData = res.data
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableData = []
        iMessage.error(this.$i18n.locale === 'zh' ? e.desZh : e.desEn)
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>