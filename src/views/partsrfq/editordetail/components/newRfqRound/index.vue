<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:24:15
 * @LastEditTime: 2021-10-11 20:05:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="title || language('LK_XINJIANRFQLUNCI','新建RFQ轮次')" :visible.sync="value" width="90%" @close='clearDiolog' z-index="1000">
    <div class="changeContent">
      <div class="clearFloat">
        <div class="floatright title-button-box">
          <template>
            <iButton @click="save" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAVE">{{ language('LK_BAOCUN','保存') }}</iButton>
            <iButton v-if="roundType === 'commonRound'" @click="updateRfqStatus('06')" :disabled="!saveStaus"
                     v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAND">{{ language('LK_FASONGXUNJIA','发送询价') }}
            </iButton>
          </template>
          <!-- <template v-else>
            <iButton @click="saveAndCreate" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAVEANDCREATE">
              {{ language('LK_BAOCUNBINGCHUANGJIAN','保存') }}
            </iButton>
          </template> -->
        </div>
      </div>
      <iFormGroup inline icon>
        <iFormItem :label="language('LK_LUNCILEIXING','轮次类型')" name="test"
                   v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ROUNDTYPE">
          <i-select v-model="roundType" @change="handleSelectChange">
            <el-option v-for="items in roundTypeOptions" :key='items.code' :value='items.code' :label="items.name" :disabled="items.disabled"/>
          </i-select>
        </iFormItem>
        <iFormItem :label="language('LK_BENLUNBAOJIAQIZHISHIJIAN','本轮报价起止时间')" name="test" v-if="['commonRound', 'manualBidding'].includes(roundType)">
          <div class="flex">
            <iDatePicker type="date" :placeholder="language('LK_QINGXUANZE','请选择')" v-model="startTime" value-format="yyyy-MM-dd"
                            v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_STARTTIME" disabled></iDatePicker>
          </div>
        </iFormItem>
        <iFormItem label="" name="test" v-if="['commonRound', 'manualBidding'].includes(roundType)">
          <iDatePicker type="date" :placeholder="language('LK_QINGXUANZE','请选择')" v-model="endTime" value-format="yyyy-MM-dd"
                          v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ENDTIME"
                          :picker-options="{
                            disabledDate(time) {
                              return time.getTime() < Date.now()
                            }
                          }"
          ></iDatePicker>
        </iFormItem>
      </iFormGroup>
      <tablelist
          ref="multipleTable"
          v-if="roundType === 'commonRound'"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @handleRowClick="handleRowClick"
          :select-props="['cbdTemplateId']"
          :round-type="roundType"
      ></tablelist>
      <tablelist
          ref="multipleTable"
          v-else
          :tableData="tableListData"
          :tableTitle="tableTitle2"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @handleRowClick="handleRowClick"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog, iFormGroup, iFormItem, iSelect, iPagination} from 'rise'
import { iDatePicker } from "rise"
import tablelist from './components/tablelist'
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle, tableTitle2} from "./components/data";
import {findBySearches, pageRfqRound, rfqRoundCreated, modification} from "@/api/partsrfq/home";
import store from '@/store'
import {partProjTypes} from '@/config'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
export default {
  components: {iButton, iDialog, iFormGroup, iFormItem, iSelect, tablelist, iPagination, iDatePicker},
  mixins: [pageMixins, rfqCommonFunMixins],
  props: {
    // title: {type: String, default: '新建RFQ轮次'},
    title: {type: String, default: ''},
    value: {type: Boolean},
    repeatClick: Boolean,
    dataRes:{
      type:Object,
      default:()=>{},
    }
  },
  computed:{
        //eslint-disable-next-line no-undef
    ...Vuex.mapState({
        rfqSelectedProjectParts: state => state.rfq.pendingPartsList,
    }),
  },
  data() {
    return {
      editStatus: false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      roundType: '',
      roundTypeOptions: [],
      // eslint-disable-next-line no-undef
      startTime: moment().format('YYYY-MM-DD'),
      endTime: '',
      tableTitle,
      tableTitle2,
      saveStaus: false,
      roundsPhase: '',
      dbParts:[partProjTypes.DBLINGJIANYICIXCAIGOU,partProjTypes.DBYICHIXINGCAIGOU,partProjTypes.DBJINLINGJIANHAOGENGAI,partProjTypes.DBZHANGJIA,partProjTypes.DBLINGJIAN,]
    }
  },
  created() {
    this.getRoundTypeOptions()
  },
  methods: {
    init(){
      const res = this.dataRes;
      this.tableListData = res.data;
      this.roundsPhase = this.tableListData[0].roundsPhase
      this.page.currPage = res.pageNum
      this.page.pageSize = res.pageSize
      this.page.totalCount = res.total
      this.setTableRowSelected()
      this.initTimeData()
    },
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        const req = {
            findType: '10',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
        }
        try {
          const res = await pageRfqRound(req)
          this.tableListData = res.data;
          this.roundsPhase = this.tableListData[0].roundsPhase
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.setTableRowSelected()
          this.tableLoading = false;
          this.initTimeData()
        } catch {
          this.tableLoading = false;
        }
      }
    },
    sureChangeItems() {
      if (this.selectTableData.length == '') return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZE','抱歉！您当前还未选择！'))
      this.$emit('sure', JSON.parse(this.selectTableData))
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getRoundTypeOptions() {
      const res = await findBySearches('04')
      this.roundTypeOptions = res.data.map(item => {
        item.disabled = item.code === 'autoBidding'
        return item
      })
      this.roundType = this.roundTypeOptions[0].code
         },
    async save() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZERENWU','抱歉，您当前还未选择任务！'));
      }
      //online-bidding逻辑：如果当前rfq中的零件采购项目为DB零件 && 货币类型不一样，无法选择在线竞价-英式
      if(this.rfqSelectedProjectParts && this.rfqSelectedProjectParts.some(r=>r.currencyCode !== this.rfqSelectedProjectParts[0].currencyCode) && this.roundType == 'biddingRound' && this.rfqSelectedProjectParts.every(r=>this.dbParts.includes(r.partProjectType))){
        return iMessage.warn(this.language('DBLJQTYZXHBFQZXJ','DB业务请统一货币再发起在线竞价'))
      }
      const id = this.$route.query.id
      if (id) {
        const req = {
            userId: store.state.permission.userInfo.id,
            startTime: this.startTime,
            endTime: this.endTime,
            rfqId: id,
            roundsType: this.roundType,
            bdlInfos: this.selectTableData
        }
        const res = await rfqRoundCreated(req)
        this.resultMessage(res, () => {
          this.saveStaus = true
        })
      }
    },
    async saveAndCreate() {
      const id = this.$route.query.id
      if (id) {
        const req = {
            userId: store.state.permission.userInfo.id,
            rfqId: id,
            roundsType: this.roundType,
            bdlInfos: this.selectTableData
        }
        const res = await rfqRoundCreated(req)
        this.resultMessage(res)
        this.$emit('refreshBaseInfo')
      }
    },
    async updateRfqStatus(updateType) {
      const query = this.$route.query
      const req = {
          updateType,
          tmRfqIdList: [query.id],
          userId: store.state.permission.userInfo.id
      }
      const res = await modification(req)
      this.resultMessage(res)
      this.$emit('refreshBaseInfo')
    },
    initTimeData() {
      if (this.roundType === 'commonRound') {
        // eslint-disable-next-line no-undef
        this.startTime = moment().format('YYYY-MM-DD')
        if (this.roundsPhase === '01') {
          // eslint-disable-next-line no-undef
          this.endTime = moment().add(14, 'd').format('YYYY-MM-DD')
        } else if (this.roundsPhase === '02') {
          // eslint-disable-next-line no-undef
          this.endTime = moment().add(7, 'd').format('YYYY-MM-DD')
        }
      }
    },
    handleSelectChange(val) {
      this.setTableRowSelected()
      if (val === 'commonRound') {
        this.initTimeData()
      } else if (val === 'manualBidding') {
        this.endTime = ''
      }
    },
    setTableRowSelected() {
      this.$nextTick(() => {
        this.tableListData.map(item => {
          if (item.isMbdl === '2') { //这个地方的勾选逻辑为：只要是Mbdl，都默认勾选上。但是在组件内部中，会判断当前是否是普通轮次，并且当前是否是第一轮（如果满足当前要求，则将出现默认勾选并且不让取消）
            this.$refs.multipleTable.$refs.newRoundTable.toggleRowSelection(item, true)
          }
        })
      })
    },
    handleRowClick(row, column, event) {
      if (!this.$refs.multipleTable.selectable(row)) this.$refs.multipleTable.$refs.newRoundTable.toggleRowSelection(row, true)
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.saveStaus = false;
        // this.getTableList()
        this.init();
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.changeContent {
  padding: 0 10px 20px 10px;

  .form-title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #000000;
    margin-bottom: 17px;
  }

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }

  .inline-block {
    display: inline-block;
  }
}
</style>

