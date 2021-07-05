<!--
 * @Author: haojiang
 * @Date: 2021-05-25 09:42:07
 * @LastEditTime: 2021-07-05 09:38:51
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
                {{language("nominationSuggestion_ShuaXinShiJian","刷新时间")}}:
                {{updateTime}}
              </span>
              
              <div class="floatright" v-if="!readOnly">
                
                <span class="combine" v-if="multiEditControl">
                  <!-- 合并功能 -->
                <iButton @click="combine" v-if="!hideCombine">
                    {{ language("nominationSuggestion_ZuHe",'组合') }}
                  </iButton>
                  <iButton @click="cancelSummaryGroup" v-if="!hideCombine">
                    {{ language("nominationSuggestion_QuXiaoZuHe",'取消组合') }}
                  </iButton>
                  <!-- 退出编辑 -->
                  <iButton @click="exit">
                    {{ language("TUICHUBIANJI",'退出编辑') }}
                  </iButton>
                  <iButton @click="submit">
                    {{ language("LK_BAOCUN",'保存') }}
                  </iButton>
                </span>
                <span class="combine" v-else>
                  <!-- 编辑 -->
                  <iButton @click="multiEditControl = true">
                    {{ language("LK_BIANJI",'编辑') }}
                  </iButton>
                </span>
                <!-- 重置 -->
                <iButton @click="getFetchData">
                  {{ language("nominationSupplier_Reset",'重置') }}
                </iButton>
                <!-- 刷新 -->
                <iButton @click="refresh">
                  {{ language("nominationSupplier_Refresh",'刷新') }}
                </iButton>
              </div>
              
            </div>
            

            <!-- 表格 -->
            <div class="clearfix"></div>
            <div class="margin-top20">
              <monitorTableList
                @updateCharts="updateCharts"
                @unSaveWarning="setUnSaveWarning"
                :selection="tableSelection"
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
        <div class="font18 font-weight">{{language('nominationSuggestion_FenZuMingChen','分组名称')}}</div>
      </div>
      <div class="body">
        <iInput v-model="groupForm.groupName" />
      </div>
      <div slot="footer" class="footer">
        <iButton @click="summaryGroup">
          {{ language("LK_TIJIAO",'提交') }}
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
// {
//   getSimulateRecord,
//   getNomiSimulateRecord,
//   setSummaryGroup,
//   cancelSummaryGroup,
//   refreshSimulateRecord,
//   saveSimulateRecord
// }
import * as nego from '@/api/designate/suggestion'
import * as nomi from '@/api/designate/suggestion/nomi'

export default {
  props: {
    mode: {
      type: String,
      default: 'nego'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    tableSelection: {
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
        return this.language("nominationSuggestion_YeWuFenPeiMoNi",'业务分配模拟')
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
  computed: {
    scenarioType() {
      return {
        'nego': 1,
        'nomi': 2
      }
    },
    api() {
      const api = {
        nego,
        nomi
      }
      return api[this.mode] ? api[this.mode] : api['nego']
    }
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
      this.refresh()
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
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      this.combineVisible = !this.combineVisible
      
    },
    // 组合
    async summaryGroup() {
      const selectedData = this.$refs.monitorTable.selectedData || []
      if (!(selectedData && selectedData.length)) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      // 分组名
      if (!this.groupForm.groupName) {
        iMessage.error(this.language('nominationSuggestion_QingShuRuFenZuMing','请输入分组名'))
        return
      }
      // 零件号数组
      const partPrjCode = selectedData.map(o => o.partPrjCode)
      const params = {
        rfqId: this.rfqId,
        scenarioType: this.scenarioType[this.mode],
        groupName: this.groupForm.groupName,
        partPrjCode
      }
      console.log(params)
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
      if (confirmInfo !== 'confirm') return
      try {
        const res = await this.api.setSummaryGroup(params)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      // 零件号数组
      let groupIdList = _.uniq(selectedData.filter(o => o.groupId).map(o => o.groupId)) || []
      const params = {
        rfqId: this.rfqId,
        scenarioType: this.scenarioType[this.mode],
        groupIdList
      }
      console.log(params)
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？',''))
      if (confirmInfo !== 'confirm') return
      try {
        const res = await this.api.cancelSummaryGroup(params)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
      this.api.refreshSimulateRecord({rfqId: this.rfqId}).then(res => {
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
      if (!this.rfqId) return iMessage.error(this.language('nominationLanguage_DingDianIDNotNull','定点申请单id不能为空'))
      this.tableLoading = true
      this.api.getSimulateRecord({
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
              o.percentCalc[index] = Number(recommendSupplier.share).toFixed(2) || 0
            })
            // 绑定推荐供应商
            const recommendBdlInfoList = o.recommendBdlInfoList || []
            // o.supplierChosen = []
            // o.percent = []
    
            o.supplierChosen = recommendBdlInfoList.map(o => o.recommendSupplier)
            o.percent = recommendBdlInfoList.map(o => Number(o.share).toFixed(2))
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
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
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
        const res = await this.api.saveSimulateRecord(data)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
    // getChartData() {
    //   if (!this.rfqId) return
    //   this.chartLoading = true
    //   this.api.getNomiSimulateRecord({
    //     rfqId: this.rfqId
    //   }).then(res => {
    //     this.chartLoading = false
    //     if (res.code === '200') {
    //       const tableListData = res.data.partInfoList || []
          
    //     } else {
    //       iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
    //     }
    //   }).catch(e => {
    //     this.chartLoading = false
    //   })
    // },
    updateCharts(data) {
      this.chartData = data
    },
    // 退出编辑
    async exit() {
      if (this.unSaveWarning) {
        const confirmInfo = await this.$confirm(this.language('exitEditSure','您的数据没保存，确定要退出编辑吗？'))
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