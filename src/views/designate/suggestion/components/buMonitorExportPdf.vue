<!--
 * @Author: haojiang
 * @Date: 2021-05-25 09:42:07
 * @LastEditTime: 2021-12-09 14:55:59
 * @Description: 业务分配模拟
-->

<template>
  <div ref="scenario">
  <div ref="tabTitle" style="padding:1px">
    <slot name="tabTitle"></slot>
  </div>
  <iCard class="buMonitor rsPdfCard" :title="cardTitle" :collapse='collapse' @handleCollapse='handleCollapse'>
      <!-- 供应商表格 -->
      <div class="supplierTable">
        <div class="clearFloat">
          <div ref="tableTitle">
            <div class="padding-bottom20">
              <span class="font18 font-weight">
                {{ title }}
              </span>
            </div>
          </div>

          <!-- 表格 -->
          <div class="clearfix"></div>
          <div class="max-content" ref="table-content">
            <monitorTableList
              @updateCharts="updateCharts"
              row-class-name="table-row"
              @unSaveWarning="setUnSaveWarning"
              :selection="tableSelection"
              :tableData="tableListData"
              :supplier="supplierList"
              :supplierEN="supplierListEN"
              :batchEdit="multiEditControl"
              v-loading="tableLoading" />
          </div>
        </div>
      </div>
  </iCard>
  <div class="page-logo" ref="logo">
    <img src="../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
    <div>
      <p class="pageNum"></p>
    </div>
    <div>
      <p>{{ userName }}</p>
      <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
    </div>
  </div>
      <!-- <div class="pdf-item"> -->
    <template v-for="(tableData,i) in tableList">
    <div class="pageCard-main max-content" :key="i">
      <div style="padding:1px">
        <slot name="tabTitle"></slot>
      </div>
      <iCard class="buMonitor rsPdfCard" :title="cardTitle" :collapse='collapse' @handleCollapse='handleCollapse'>
        <!-- 供应商表格 -->
        <div>
            <div class="supplierTable">
              <div class="clearFloat">
                <div class="padding-bottom20">
                  <span class="font18 font-weight">
                    {{ title }}
                  </span>
                </div>

                <!-- 表格 -->
                <div class="clearfix"></div>
                <div :style="{'height': cntentHeight + 'px'}">
                  <monitorTableList
                    :key="'tableData'+i"
                    :selection="tableSelection"
                    :tableData="tableData"
                    :supplier="supplierList"
                    :supplierEN="supplierListEN"
                    :batchEdit="multiEditControl"
                    v-loading="tableLoading" />
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
        </div>
      </iCard>
    </div>
    </template>
    <div class="pageCard-main">
      <div style="padding:1px">
        <slot name="tabTitle"></slot>
      </div>
      <iCard class="buMonitor rsPdfCard" :key="i" :title="cardTitle" :collapse='collapse' @handleCollapse='handleCollapse'>
      <!-- 图标模拟 -->
        <div class="buMonitor-charts" :style="{'height': chartsHeight + 'px'}">
          <buMonitorChartsPdf
            :supplier="supplierList"
            :data="chartData"
          />
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
      </iCard>
    </div>
  </div>
</template>
<script>
import { iInput, iCard, iButton, iMessage } from 'rise'
import buMonitorCharts from './buMonitorCharts'
import buMonitorChartsPdf from './buMonitorChartsPdf'
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
    monitorTableList,
    buMonitorChartsPdf
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
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // }
  },
  data() {
    return {
      rfqId: this.$route.query.desinateId || '',
      multiEditControl: false,
      tableListData: [],
      tableList:[],
      chartData: [],
      supplierList: [], // 供应商列表
      supplierListEN: [], // 供应商列表
      tableLoading: false,
      // 更新时间
      updateTime: '',
      params: {},
      unSaveWarning: false,
      cntentHeight:0,
      chartsHeight:0
    }
  },
  created() {
    this.init()
  },
  methods: {
    getHeight(){
      if(!this.$refs.scenario) return
      this.width = this.$refs['table-content'].clientWidth
      this.chartsWidth = this.$refs.scenario.clientWidth
      this.hasTitle = this.$refs.tabTitle.clientHeight
      let headerHeight = this.$refs.scenario.getElementsByClassName('cardHeader')[0]&&this.$refs.scenario.getElementsByClassName('cardHeader')[0].clientHeight || 0 // Title 区域高度
      let pageLogo = this.$refs.logo.clientHeight     // logo 区域高度
      let tableHeader = this.$refs['table-content'].getElementsByClassName('el-table__header-wrapper')[0].clientHeight
      let tableTitle = this.$refs.tableTitle.clientHeight 
      // let headerHeight = 42 // Title 区域高度
      // let pageLogo = 52     // logo 区域高度
      // let tableHeader = 71  // 表头高度
      this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - tableTitle - pageLogo - this.hasTitle // 内容区域对应的高度
      this.chartsHeight = (this.chartsWidth / 841.89) * 595.28 - headerHeight - pageLogo - this.hasTitle // 绘图区域对应的高度
      let rowList = this.$refs.scenario.getElementsByClassName('el-table__body-wrapper')[0].getElementsByClassName('table-row')
      let heightSum = 0
      let tableList = []
      let arr = []
      rowList.forEach((item,i)=>{
        heightSum+=item.offsetHeight
        if(heightSum<this.cntentHeight - tableHeader){
          arr.push(this.tableListData[i])
        }else{
          tableList.push(JSON.parse(JSON.stringify(arr)))
          heightSum=item.offsetHeight
          arr = [this.tableListData[i]]
        }
      })
      tableList.push(JSON.parse(JSON.stringify(arr)))
      this.tableList = tableList
      return
    },
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
          this.$nextTick(()=>{
            this.getHeight()
          })
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