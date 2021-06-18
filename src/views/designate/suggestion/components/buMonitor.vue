<!--
 * @Author: haojiang
 * @Date: 2021-05-25 09:42:07
 * @LastEditTime: 2021-06-09 23:21:46
 * @Description: 业务分配模拟
-->

<template>
  <iCard class="buMonitor" :title="cardTitle" :collapse='collapse' @handleCollapse='handleCollapse'>
    <el-row :gutter="24">
      <!-- 供应商表格 -->
      <el-col :span="16">
        <div class="supplierTable">
          <div class="margin-bottom20 clearFloat">
            <div>
              <span class="font18 font-weight">
                {{ title }}
              </span>
              <span class="updateTime" v-if="!hideUpdateTime">
                {{$t("nominationSuggestion.ShuaXinShiJian")}}:
                {{updateTime}}
              </span>
              
              <div class="floatright" v-if="!readOnly">
                
                <span class="combine" v-if="multiEditControl">
                  <!-- 合并功能 -->
                <iButton @click="combine" v-if="!hideCombine">
                    {{ $t("nominationSuggestion.ZuHe") }}
                  </iButton>
                  <iButton @click="cancelSummaryGroup" v-if="!hideCombine">
                    {{ $t("nominationSuggestion.QuXiaoZuHe") }}
                  </iButton>
                  <!-- 退出编辑 -->
                  <iButton @click="exit">
                    {{ $t("nominationSuggestion.TuiChuBianJi") }}
                  </iButton>
                  <iButton @click="submit">
                    {{ $t("LK_BAOCUN") }}
                  </iButton>
                </span>
                <span class="combine" v-else>
                  <!-- 编辑 -->
                  <iButton @click="multiEditControl = true">
                    {{ $t("LK_BIANJI") }}
                  </iButton>
                </span>
                <!-- 重置 -->
                <iButton @click="getFetchData">
                  {{ $t("nominationSupplier.Reset") }}
                </iButton>
                <!-- 刷新 -->
                <iButton @click="refresh">
                  {{ $t("nominationSupplier.Refresh") }}
                </iButton>
              </div>
              
            </div>
            

            <!-- 表格 -->
            <div class="clearfix"></div>
            <div class="margin-top20">
              <monitorTableList
                @updateCharts="updateCharts"
                @unSaveWarning="setUnSaveWarning"
                :tableData="tableListData"
                :supplier="supplierList"
                :batchEdit="multiEditControl"
                v-loading="tableLoading"
                ref="monitorTable" />
            </div>
          </div>
        </div>
      </el-col>
      <!-- 图标模拟 -->
      <el-col :span="8">
        <div class="buMonitor-charts">
          <buMonitorCharts
            :supplier="supplierList"
            :data="chartData" />
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <iDialog class="combineDialog" :visible.sync="combineVisible">
      <div class="dialog-Header" slot="title">
        <div class="font18 font-weight">{{$t('nominationSuggestion.FenZuMingChen')}}</div>
      </div>
      <div class="body">
        <iInput v-model="groupForm.groupName" />
      </div>
      <div slot="footer" class="footer">
        <iButton @click="summaryGroup">
          {{ $t("LK_TIJIAO") }}
        </iButton>
      </div>
    </iDialog>
  </iCard>
</template>
<script>
import { iDialog, iInput, iCard, iButton, iMessage } from 'rise'
import buMonitorCharts from './buMonitorCharts'
import monitorTableList from './monitorTableList'
import _ from 'lodash'
import {
  getSimulateRecord,
  getNomiSimulateRecord,
  setSummaryGroup,
  cancelSummaryGroup,
  refreshSimulateRecord,
  saveSimulateRecord
} from '@/api/designate/suggestion'

export default {
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    // 隐藏更新时间
    hideUpdateTime: {
      type: Boolean,
      default: false
    },
    // 隐藏组合功能
    hideCombine: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: function(){
        return this.$t("nominationSuggestion.YeWuFenPeiMoNi")
      }
    },
    cardTitle:{
      type:String,
      default:''
    },
    collapse:{
      type:Boolean,
      default:false
    }
  },
  components: {
    iDialog,
    iInput,
    iCard,
    iButton,
    buMonitorCharts,
    monitorTableList
  },
  data() {
    return {
      rfqId: this.$route.query.desinateId || '',
      multiEditControl: false,
      tableEditState: false,
      tableListData: [],
      chartData: [],
      supplierList: [], // 供应商列表
      tableLoading: false,
      chartLoading: false,
      combineVisible: false,
      // 更新时间
      updateTime: '',
      groupForm: {
        groupName:''
      },
      params: {},
      unSaveWarning: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // this.getChartData()
      this.getFetchData()
    },
    // 生成随机id
    randomid() {
      return Math.floor(Math.random() * 10000000)
    },
    // 需要退出警告
    setUnSaveWarning(state) {
      this.unSaveWarning = state
    },
    // 组合
    combine() {
      const selectedData = this.$refs.monitorTable.selectedData
      if (!(selectedData && selectedData.length)) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      this.combineVisible = !this.combineVisible
      
    },
    // 组合
    async summaryGroup() {
      const selectedData = this.$refs.monitorTable.selectedData || []
      if (!(selectedData && selectedData.length)) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      // 分组名
      if (!this.groupForm.groupName) {
        iMessage.error(this.$t('nominationSuggestion.QingShuRuFenZuMing'))
        return
      }
      // 零件号数组
      const partPrjCode = selectedData.map(o => o.partPrjCode)
      const params = {
        rfqId: this.rfqId,
        groupName: this.groupForm.groupName,
        partPrjCode
      }
      console.log(params)
      const confirmInfo = await this.$confirm(this.$t('submitSure'))
      if (confirmInfo !== 'confirm') return
      try {
        const res = await setSummaryGroup(params)
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.combineVisible = false
          this.refresh()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 取消组合
    async cancelSummaryGroup() {
      const selectedData = this.$refs.monitorTable.selectedData || []
      if (!(selectedData && selectedData.length)) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      // 零件号数组
      let groupIdList = _.uniq(selectedData.filter(o => o.groupId).map(o => o.groupId)) || []
      const params = {
        rfqId: this.rfqId,
        groupIdList
      }
      console.log(params)
      const confirmInfo = await this.$confirm(this.$t('submitSure'))
      if (confirmInfo !== 'confirm') return
      try {
        const res = await cancelSummaryGroup(params)
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.combineVisible = false
          this.refresh()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 刷新
    refresh: _.debounce(function() {
      refreshSimulateRecord({rfqId: this.rfqId}).then(res => {
        if (res.code === '200') {
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
      
    }, 500),
    // 获取模拟列表
    getFetchData() {
      if (!this.rfqId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      this.tableLoading = true
      getSimulateRecord({
        rfqId: this.rfqId
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.params = _.cloneDeep(res.data)
          this.supplierList = res.data.supplierSet
          const tableListData = res.data.partInfoList || []
          tableListData.map(o => {
            // 绑定供应商
            o.id = this.randomid()
            o.groupId && (o.gid = o.groupId)
            o.supplier = this.supplierList
            // 绑定对应供应商TTO
            o.TTo = []
            o.percentCalc = []
            const suppDataList = o.bdlInfoList || []
            this.supplierList.forEach((suppName, index) => {
              const supplier = suppDataList.find(o => o.supplierName === suppName) || {}
              const recommendSupplier = o.recommendBdlInfoList.find(o => o.recommendSupplier === suppName) || {}
              o.TTo[index] = supplier.tto || 0
              o.percentCalc[index] = recommendSupplier.share || 0
            })
            // 绑定推荐供应商
            const recommendBdlInfoList = o.recommendBdlInfoList || []
            // o.supplierChosen = []
            // o.percent = []
    
            o.supplierChosen = recommendBdlInfoList.map(o => o.recommendSupplier)
            o.percent = recommendBdlInfoList.map(o => o.share)
            // this.supplierList.forEach((sup, supIndex) => {
            //   const curSupplier = recommendBdlInfoList.find(o => o.recommendSupplier === sup)
            //   o.supplierChosen[supIndex] = curSupplier ? curSupplier.recommendSupplier : ''
            //   o.percent[supIndex] = curSupplier ? curSupplier.share : ''
            // })
            return o
          })
          this.tableListData = tableListData
          this.updateTime = res.data.refreshTime || ''
          this.updateTime = this.updateTime ? window.moment(this.updateTime).format('YYYY-MM-DD HH:mm:ss') : ''
          console.log('tableListData', tableListData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableLoading = false
      })
    },
    async submit() {
      const confirmInfo = await this.$confirm(this.$t('submitSure'))
      if (confirmInfo !== 'confirm') return
      
      let data = _.cloneDeep(this.params)
      const tableListData = _.cloneDeep(this.tableListData)
      tableListData.map((item) => {
        // 推荐供应商
        const recommendBdlInfoList = []
        item.supplierChosen.forEach((sp, sIndex) => {
          const suppi = item.bdlInfoList.find(s => s.supplierName === sp)
          suppi && (recommendBdlInfoList.push({
            recommendSupplier: suppi.supplierName,
            supplierId: suppi.supplierId,
            share: Number(item.percent[sIndex] || 0)
          }))
        })
        item.recommendBdlInfoList = recommendBdlInfoList
        return item
      })
      // 删除不必要的数据
      delete tableListData.TTo
      delete tableListData.percent
      delete tableListData.supplier
      delete tableListData.supplierChosen

      data.partInfoList = tableListData
      try {
        const res = await saveSimulateRecord(data)
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
      console.log(data)
    },
    // 柱状图数据
    getChartData() {
      if (!this.rfqId) return
      this.chartLoading = true
      getNomiSimulateRecord({
        rfqId: this.rfqId
      }).then(res => {
        this.chartLoading = false
        if (res.code === '200') {
          const tableListData = res.data.partInfoList || []
          
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.chartLoading = false
      })
    },
    updateCharts(data) {
      this.chartData = data
    },
    // 退出编辑
    async exit() {
      if (this.unSaveWarning) {
        const confirmInfo = await this.$confirm(this.$t('exitEditSure'))
        if (confirmInfo !== 'confirm') return
      }
      this.multiEditControl = false
      this.setUnSaveWarning(false)
      this.getFetchData()
    },
    handleCollapse(e){this.$emit('handleCollapse',e)}
  }
}
</script>
<style lang="scss" scoped>
.buMonitor {
  margin-top: 20px;
  .supplierTable {
    .updateTime {
      display: inline-block;
      padding-left: 15px;
      font-size: 12px;
    }
  }
}
.clearfix {
  clear: both;
}
.combine {
  margin-right: 10px
}
.combineDialog {
  ::v-deep.el-dialog {
    width: 450px
  }
}
</style>