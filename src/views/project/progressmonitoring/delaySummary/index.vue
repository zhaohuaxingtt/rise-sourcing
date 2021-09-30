<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 09:45:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-30 09:19:45
 * @Description: 延误原因汇总
-->

<template>
  <iPage class="delaySummary" v-permission.dynamic.auto="permissionKey">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iInput v-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
          <!--------------询价采购员下拉----------------------->
          <fsSelect v-else-if="item.type === 'fsSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------项目采购员下拉----------------------->
          <productPurchaserSelect v-else-if="item.type === 'productPurchaserSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------车型项目下拉----------------------->
          <carProjectSelect v-else-if="item.type === 'carProjectSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------字典下拉----------------------->
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard :ref="'comFirmCard'" class="margin-top20" :title="language('YANWUYUANYINQUEREN', '延误原因确认')" :collapse="collapse" @handleCollapse="handleCollapse">
      <!-- <template slot="header-control"> -->
      <div class="floatright" slot="header-control">
        <!--------------------发送按钮----------------------------------->
        <iButton v-if="!isFS && withSend" @click="handleSend" >{{language('FASONG','发送')}}</iButton>
        <iButton v-if="!isFS">{{language('DAOCHU','导出')}}</iButton>
        <template v-if="isFS">
          <!--------------------转派按钮----------------------------------->
          <transferBtn class="margin-right10" tansferType="3" :tansferData="selectRow" @getTableList="getTableList" ></transferBtn>
          <!--------------------退回按钮----------------------------------->
          <backBtn class="margin-right10" v-if="withAllBtn" backType="3" :backData="selectRow" @getTableList="getTableList" ></backBtn>
          <!--------------------保存按钮----------------------------------->
          <saveBtn v-if="withAllBtn" saveType="3" :saveData="tableData" @getTableList="getTableList" ></saveBtn>
          <!--------------------确认并发送按钮----------------------------------->
          <confirmBtn v-if="withAllBtn" confirmType="3" :confirmData="selectRow" @getTableList="getTableList" ></confirmBtn>
        </template>
      </div>
      <!-- 表格 -->
      <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
        <template #newPlanKw="scope">
          <span v-if="!isFS">{{scope.row.newPlanKw}}</span>
          <template v-else>
            <el-cascader
              class="yearWeekSelect"
              :value="scope.row.newPlanKw ? scope.row.newPlanKw.split('-KW') : []"
              :options="yearWeekOptions"
              @change="handleChange($event, scope.row, 'newPlanKw')"
              separator="-KW"
            ></el-cascader>
            <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
          </template>
        </template>
        <template #delayReason="scope">
          <span v-if="!isFS">{{scope.row.delayReason}}</span>
          <template v-else>
            <iInput
              class="yearWeekSelect"
              :v-model="scope.row.delayReason"
            ></iInput>
          </template>
        </template>
      </tableList> 
      <!-- 分页 -->
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <delayReasonDialog ref="delayReason" :dialogVisible="dialogVisibleDelayReason" @changeVisible="changeDelayReasonDialogVisible" type="2" :delayList="selectTableData" />
  </iPage>
  
</template>

<script>
import { iSearch, iInput, iButton, iCard, iPagination, iMessage, icon } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle, searchList } from './data'
import fsSelect from '@/views/project/components/commonSelect/fsSelect'
import productPurchaserSelect from '@/views/project/components/commonSelect/productPurchaserSelect'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect'
import iDicoptions from 'rise/web/components/iDicoptions'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import moment from 'moment'
import confirmBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/confirmBtn'
import saveBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/saveBtn'
import backBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/backBtn'
import transferBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/transferBtn'
import { getDelayReasonSummary } from '@/api/project/process'
import delayReasonDialog from '../monitorDetail/components/delayReson'
export default {
  mixins: [pageMixins],
  components: { iSearch, iInput, iButton, iCard, iPagination, icon, fsSelect, productPurchaserSelect, carProjectSelect, iDicoptions, tableList, confirmBtn, saveBtn, backBtn, transferBtn, delayReasonDialog },
  data() {
    return {
      tableTitle,
      tableData: [],
      tableLoading: false,
      selectTableData: [],
      searchList,
      searchParams: {},
      withSend: false,
      withAllBtn: false,
      dialogVisibleDelayReason: false
    }
  },
  computed: {
    isFS() {
      return this.$route.path.includes('delayconfirm')
    },
    permissionKey() {
      return !this.isFS ? 'PROJECTMGT_DELAYSUMMARY_PAGE|项目管理-进度监控-延误原因汇总页面' : 'PROJECTMGT_DELAYCONFIRM_PAGE|项目管理-进度监控-延误原因确认页面'
    }, 
  },
  created() {
    this.initSearchParams()
    this.yearWeekOptions = this.initOption()
    this.getTableList()
  },
  methods: {
    handleSend() {
      if (this.selectTableData.lenth < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据'))
      }
      this.changeDelayReasonDialogVisible(true)
    },
    changeDelayReasonDialogVisible(visible) {
      this.dialogVisibleDelayReason = visible
    },
    /**
     * @Description: 重置分页器
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    resetPageInfo() {
      this.page.pageSize = 10
      this.page.currPage = 1
    },
    initOption() {
      const option = []
      for(var i = moment().year() - 10; i <= moment().year() + 10; i++) {
        const countMonth = moment(i+'-01-01').weeksInYear()
        const children = []
        for(var j = 1; j <= countMonth; j++) {
          children.push({value: j<10?'0'+j:j+'',label: j<10?'0'+j:j+''})
        }
        option.push({value:i+'',label:i+'',children:children})
      }
      return option
    },
    handleSure() {
      this.getTableList(true)
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*} resetPage 是否重置分页
     * @return {*}
     */    
    getTableList(resetPage = false) {
      if (resetPage) {
        this.resetPageInfo()
      }
      if (this.searchParams.confirmStatus === '3') {
        this.withSend = true
      } else {
        this.withSend = false
      }
      if (this.searchParams.confirmStatus === '1') {
        this.withAllBtn = true
      } else {
        this.withAllBtn = false
      }
      this.getDelaySummaryList()
    },
    getDelaySummaryList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getDelayReasonSummary(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleReset() {
      this.initSearchParams()
      this.$nextTick(() => {
        this.handleSure()
      })
    },
    initSearchParams() {
      this.searchParams = {
        confirmStatus: '1',
        cartypeProId: this.$route.query.cartypeProId || '',
        partNum: this.$route.query.partNum || '',
        fsId: '',
        projectPurchaserId: ''
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    handleChange(val, item, props) {
      this.$set(item, props, val.join('-KW'))
    },
  }
}
</script>

<style lang="scss" scoped>
.delaySummary {
  padding: 0;
  padding-top: 10px;
  // height: calc(100% - 65px);
  // overflow: visible;
}
</style>