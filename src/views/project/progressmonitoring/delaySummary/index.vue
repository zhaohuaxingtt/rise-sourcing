<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 09:45:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:02:44
 * @Description: 延误原因汇总
-->

<template>
  <iPage class="delaySummary" v-permission.dynamic.auto="permissionKey">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('LK_INQUIRE', '查询')}}</iButton>
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
          <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.value]" :title="language(item.i18n_label, item.label)" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard :ref="'comFirmCard'" class="margin-top20" :title="language('YANWUYUANYINQUEREN', '延误原因确认')" :collapse="collapse" @handleCollapse="handleCollapse">
      <!-- <template slot="header-control"> -->
      <div class="floatright" slot="header-control">
        <!--------------------发送按钮----------------------------------->
        <iButton v-permission.auto="PROJECTMGT_DELAYSUMMARY_ZAICIFASONG_BUTTON|延误原因汇总再次发送按钮" v-if="!isFS && withSend" @click="handleSend" >{{language('ZAICIFASONG','再次发送')}}</iButton>
        <iButton v-permission.auto="PROJECTMGT_DELAYSUMMARY_DAOCHU_BUTTON|延误原因汇总导出按钮" v-if="!isFS" @click="handleExport" :loading="exportLoading">{{language('DAOCHU','导出')}}</iButton>
        <template v-if="isFS">
          <!--------------------转派按钮----------------------------------->
          <transferBtn v-permission.auto="PROJECTMGT_DELAYCONFIRM_TRANSFER_BUTTON|延误原因确认转派按钮" class="margin-right10" tansferType="3" :tansferData="selectTableData" @getTableList="getTableList" ></transferBtn>
          <!--------------------退回按钮----------------------------------->
          <backBtn v-permission.auto="PROJECTMGT_DELAYCONFIRM_BACK_BUTTON|延误原因确认退回按钮" class="margin-right10" v-if="withAllBtn" backType="3" :backData="selectTableData" @getTableList="getTableList" ></backBtn>
          <!--------------------保存按钮----------------------------------->
          <saveBtn v-permission.auto="PROJECTMGT_DELAYCONFIRM_SAVE_BUTTON|延误原因确认保存按钮" v-if="withAllBtn" saveType="3" :saveData="tableData" @getTableList="getTableList" ></saveBtn>
          <!--------------------确认并发送按钮----------------------------------->
          <confirmBtn v-permission.auto="PROJECTMGT_DELAYCONFIRM_CONFIRM_BUTTON|延误原因确认确认并发送按钮" v-if="withAllBtn" confirmType="3" :confirmData="selectTableData" @getTableList="getTableList" ></confirmBtn>
        </template>
        <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
      </div>
      <!-- 表格 -->
      <tableList 
                permissionKey="PROJECT_PROGRESSMONITORING_DELAYSUMMARY"
                indexKey
                 ref="tableList"
                 :lang="true"
                 :tableTitle="tableTitle"
                 :tableData="tableData"
                 :tableLoading="tableLoading"
                 @handleSelectionChange="handleSelectionChange"
      >
        <template #newPlanDate="scope">
          <span v-if="!isFS || (isFS && !withAllBtn)">{{scope.row.newPlanDate}}</span>
          <template v-else>
            <div class="yearWeekSelect" @click="openChangeKw(scope.row, 'newPlanDate', index)">
              {{scope.row.newPlanDate}}
              <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
            </div>
            <!-- <el-cascader
              class="yearWeekSelect"
              :value="scope.row.newPlanDate ? scope.row.newPlanDate.split('-KW') : []"
              :options="yearWeekOptions"
              @change="handleChange($event, scope.row, 'newPlanDate')"
              separator="-KW"
            ></el-cascader> -->
            <!-- <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon> -->
          </template>
        </template>
        <template #delayReason="scope">
          <span v-if="!isFS || (isFS && !withAllBtn)">{{scope.row.delayReason}}</span>
          <template v-else>
            <el-autocomplete :fetch-suggestions="querySearch" v-model="scope.row.delayReason" @focus="e => handleFocusChange(scope.row.partPeriod)" /> 
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
    <selectKwDialog :dialogVisible="dialogVisibleSelectKw" @changeVisible="changeSelectKwVisible" :value="selectKw" @handleChange="handleChangeKw" />
  </iPage>
  
</template>

<script>
import { iSearch, iInput, iButton, iCard, iPagination, iMessage, icon, iMultiLineInput } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle, searchList } from './data'
import fsSelect from '@/views/project/components/commonSelect/fsSelect'
import productPurchaserSelect from '@/views/project/components/commonSelect/productPurchaserSelect'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect'
import iDicoptions from 'rise/web/components/iDicoptions'
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import moment from 'moment'
import confirmBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/confirmBtn'
import saveBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/saveBtn'
import backBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/backBtn'
import transferBtn from '@/views/project/schedulingassistant/progressconfirm/components/commonBtn/transferBtn'
import { getDelayReasonSummary, exportDelayReasonConfirm } from '@/api/project/process'
import delayReasonDialog from '../monitorDetail/components/delayReson'
import { selectDictByKeyss } from '@/api/dictionary'
import selectKwDialog from '@/views/project/schedulingassistant/part/components/selectKw'
import buttonTableSetting from '@/components/buttonTableSetting'
import { roleMixins } from "@/utils/roleMixins";
export default {
  mixins: [pageMixins,tableSortMixins,roleMixins],
  components: { selectKwDialog, iSearch, iInput, iButton, iCard, iPagination, icon, fsSelect, productPurchaserSelect, carProjectSelect, iDicoptions, tableList, confirmBtn, saveBtn, backBtn, transferBtn, delayReasonDialog, buttonTableSetting, iMultiLineInput },
  data() {
    return {
      tableTitle,
      tableData: [],
      tableLoading: false,
      selectTableData: [],
      searchList:searchList.filter((item)=>!item.hidden),
      searchParams: {},
      withSend: false,
      withAllBtn: false,
      dialogVisibleDelayReason: false,
      yearWeekOptions: [],
      delayReasonOptions: {},
      currPartPeriod: '',
      exportLoading: false,
      dialogVisibleSelectKw: false,
      selectKw: ''
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
    // this.yearWeekOptions = this.initOption()
    this.getTableList()
    if(this.isFS) {
      this.getDelayReason()

    // 判断一下是否包含以下角色 若包含则展示询价采购员搜索框
    // ADMIN      超级管理员
    // QQCGKZ     前期采购科长
    // QQCGGZ     前期采购股长
    // CGBZ       采购部长
    // CIXTGLY    CI系统管理员
    // CSXTGLY    CS系统管理员
    // QQCGKZ_WF    前期采购科长_外方
    // CGBZ_WF      采购部长_外方
    const list = ['ADMIN','QQCGKZ','QQCGGZ','CGBZ','CIXTGLY','CSXTGLY','QQCGKZ_WF','CGBZ_WF'];
      const roleList = this.roleList;
      let isIncludes = false;
      roleList.map((item)=>{
        if(list.includes(item)) isIncludes = true;
      })
      if(isIncludes) this.searchList = searchList
    }else{
      this.searchList = searchList;
    }
  },
  methods: {
    changeSelectKwVisible(visible) {
      this.dialogVisibleSelectKw = visible
    },
    handleChangeKw(val) {
      const { pro, item, index } = this.selectKwPro
      this.handleChange(val, pro, item, index)
    },
    openChangeKw(pro, item, index) {
      console.log(pro, item, pro[item], index)
      this.selectKw = pro[item]
      this.selectKwPro = {pro, item, index}
      this.changeSelectKwVisible(true)
    },
    async handleExport() {
      this.exportLoading = true
      const params = {
        ids: this.selectTableData.map(item => item.id),
        identityTag: this.isFS ? '2' : '1',
        ...this.searchParams,
      }
      await exportDelayReasonConfirm(params)
      this.exportLoading = false
    },
    handleFocusChange(partPeriod) {
      // console.log('partPeriod', partPeriod)
      this.currPartPeriod = partPeriod
    },
    getDelayReason() {
      selectDictByKeyss('OTS_EM_DELAYREASON').then(res => {
        if (res?.result) {
          this.delayReasonOptions ={
            ...res.data,
            OTS_EM_DELAYREASON: res.data.OTS_EM_DELAYREASON.map(item => {return {...item,value:item.name}})
          }
        }
      })
    },
    querySearch(queryString, cb) { 
      var restaurants = [4,5,6,7,8].includes(Number(this.currPartPeriod)) ? this.delayReasonOptions.OTS_EM_DELAYREASON : []; 
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据 
      cb(results); 
    },
    createFilter(queryString) { 
      return (restaurant= [4,5,6,7,8].includes(Number(this.currPartPeriod)) ? this.delayReasonOptions.OTS_EM_DELAYREASON : []) => { 
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0); 
      }; 
    },  
    handleSend() {
      if (this.selectTableData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据'))
        return
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
      for(var i = 1900; i <= moment().year() + 10; i++) {
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
      if (this.searchParams.confirmStatus === '3' || this.searchParams.confirmStatus === '2') {
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
        identityTag: this.isFS ? '2' : '1',
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
        confirmStatus: this.isFS ? '1' : '2',
        projectId: this.$route.query.projectId || '',
        partNum: this.$route.query.partNum || '',
        fsId: '',
        projectPurchaserId: ''
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    handleChange(val, item, props) {
      this.$set(item, props, val)
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
.yearWeekSelect {
    height: 30px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border: 0.0625rem solid #E0E6ED;
    position: relative;
    text-align: left;
    padding: 0 15px;
    display: flex;
    align-items: center;
}
.cascader-icon {
  position: absolute;
  top: 7px;
  right: 5px;
}
</style>