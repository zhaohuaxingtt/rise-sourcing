<!--
 * @Author: haojiang
 * @Date: 2021-05-25 09:42:07
 * @LastEditTime: 2021-12-09 14:55:59
 * @Description: 业务分配模拟
-->

<template>
  <iCard class="buMonitor" :title="cardTitle" :collapse='collapse' @handleCollapse='handleCollapse'>
    <template #tabTitle>
      <slot name="tabTitle"></slot>
    </template>
    <el-row :gutter="24">
      <!-- 供应商表格 -->
      <el-col :span="24">
        <div class="supplierTable">
          <div class="margin-bottom20 clearFloat">
            <div>
              <span class="font18 font-weight">
                {{ title }}
              </span>
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
                :supplierEN="supplierListEN"
                :batchEdit="multiEditControl"
                v-loading="tableLoading"
                ref="monitorTable" />
            </div>
            <div class="page-logo">
              <img src="../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
              <div>
                <p class="pageNum"></p>
              </div>
              <div>
                <p>{{ userName }}</p>
                <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 图标模拟 -->
      <el-col :span="16" offset="4">
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
        <div class="buMonitor-charts">
          <buMonitorCharts
            :supplier="supplierList"
            :data="chartData"
          />
        </div>
      </el-col>
    </el-row>
  </iCard>
</template>
<script>
import { iInput, iCard, iButton, iMessage } from 'rise'
import buMonitorCharts from './buMonitorCharts'
import monitorTableList from './monitorTableListExportPdf'
import _ from 'lodash'
import * as nego from '@/api/designate/suggestion'
import * as nomi from '@/api/designate/suggestion/nomi'
import filters from "@/utils/filters"
export default {
  mixins: [filters],
  props: {
    // 模式：nomi，定点建议；nego，谈判助手；
    mode: {
      type: String,
      default: 'nego'
    },
    // 只读，不允许编辑
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
    },
    isnomination:{
      type:String
    }
  },
  components: {
    iInput,
    iCard,
    iButton,
    buMonitorCharts,
    monitorTableList
  },
  computed: {
    api() {
      const api = {
        nego,
        nomi
      }
      return api[this.mode] ? api[this.mode] : api['nego']
    },
    
    userName(){
      return this.$i18n.locale === 'zh' ? this.$store.state.permission.userInfo.nameZh : this.$store.state.permission.userInfo.nameEn
    },
    hasTitle(){
      return this.$slots.tabTitle && 116 || 0
    }
  },
  data() {
    return {
      rfqId: this.$route.query.desinateId || '',
      multiEditControl: false,
      tableListData: [],
      chartData: [],
      supplierList: [], // 供应商列表
      supplierListEN: [], // 供应商列表
      tableLoading: false,
      // 更新时间
      updateTime: '',
      params: {},
      unSaveWarning: false
    }
  },
  created() {
    this.init()      
  },
  methods: {
    async init() {
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
        if (res.code == '200') {
          this.params = _.cloneDeep(res.data)
          // this.supplierList = []
          // 刷新的时候，会将新增的数据清除，数组传参无法识别变化无法传到子组件，故保持刷新前的顺序
          const supplierSet = res.data.supplierSet || []
          !this.supplierList.length && supplierSet.length !== this.supplierList.length && (this.supplierList = res.data.supplierSet)
          const tableListData = res.data.partInfoList || []
          let newTableList = []
          newTableList = tableListData.map(o => {
            // 绑定供应商
            o.id = this.randomid()
            o.groupId && (o.gid = o.groupId)
            o.supplier = this.supplierList
            o.selected = false
            // 绑定对应供应商TTO
            o.TTo = []
            o.percentCalc = []
            const suppDataList = o.bdlInfoList || []
            this.supplierList.forEach((suppName, index) => {
              const supplier = (suppDataList && suppDataList.find(o => o.supplierName == suppName)) || {}
              const recommendSupplier = (o.recommendBdlInfoList && o.recommendBdlInfoList.find(o => o.recommendSupplier === suppName)) || {}
              o.TTo.push(supplier.tto || 0)
              // o.percentCalc[index] = Number(recommendSupplier.share).toFixed(0) || 0
              o.percentCalc.push({
                key: suppName,
                value: Number(recommendSupplier.share).toFixed(0) || 0
              })
              // 提取供应商英文
              const supplierObj = suppDataList.find(o => o.supplierName === suppName) || {}
              !this.supplierListEN[index] && (this.supplierListEN[index] = supplierObj.supplierNameEn || '')
            })
            // 绑定推荐供应商
            const recommendBdlInfoList = o.recommendBdlInfoList || []
            // o.supplierChosen = []
            // o.percent = []

            o.supplierChosen = recommendBdlInfoList.map(o => o.recommendSupplier)
            o.percent = recommendBdlInfoList.map(o => Number(o.share).toFixed(0))
            // this.supplierList.forEach((sup, supIndex) => {
            //   const curSupplier = recommendBdlInfoList.find(o => o.recommendSupplier === sup)
            //   o.supplierChosen[supIndex] = curSupplier ? curSupplier.recommendSupplier : ''
            //   o.percent[supIndex] = curSupplier ? curSupplier.share : ''
            // })
            return o
          })
          // 为相同groupId的零件排序
          newTableList = window._.sortBy(newTableList, 'groupId')
          this.tableListData = newTableList
          this.updateTime = res.data.refreshTime || ''
          this.updateTime = this.updateTime ? window.moment(this.updateTime).format('YYYY-MM-DD HH:mm:ss') : ''
          console.log('tableListData', newTableList)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableLoading = false
      })
    },
    updateCharts(data) {
      this.chartData = data
    },
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

  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
</style>