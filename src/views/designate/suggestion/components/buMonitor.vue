<!--
 * @Author: haojiang
 * @Date: 2021-05-25 09:42:07
 * @LastEditTime: 2021-05-25 17:15:37
 * @Description: 业务分配模拟
-->

<template>
  <iCard class="buMonitor">
    <el-row :gutter="24">
      <!-- 供应商表格 -->
      <el-col :span="16">
        <div class="supplierTable">
          <div class="margin-bottom20 clearFloat">
            <span class="font18 font-weight">
              {{ title || this.$t("nominationSuggestion.YeWuFenPeiMoNi") }}
            </span>
            <span class="updateTime" v-if="updateTime">
              {{$t("nominationSuggestion.ShuaXinShiJian")}}:
              {{'2021-05-25'}}
            </span>
            
            <div class="floatright" v-if="!readOnly">
              
              <span class="combine" v-if="multiEditControl">
                <!-- 合并功能 -->
              <iButton @click="combine">
                  {{ $t("nominationSuggestion.ZuHe") }}
                </iButton>
                <iButton @click="cancelSummaryGroup">
                  {{ $t("nominationSuggestion.QuXiaoZuHe") }}
                </iButton>
                <!-- 退出编辑 -->
                <iButton @click="multiEditControl = false">
                  {{ $t("nominationSuggestion.TuiChuBianJi") }}
                </iButton>
                <iButton>
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
              <iButton>
                {{ $t("nominationSupplier.Reset") }}
              </iButton>
              <!-- 刷新 -->
              <iButton @click="init">
                {{ $t("nominationSupplier.Refresh") }}
              </iButton>
            </div>

            <!-- 表格 -->
            <div class="clearfix"></div>
            <div class="margin-top20">
              <monitorTableList
                @updateCharts="updateCharts"
                :tableData="tableListData"
                :supplier="supplierList"
                :batchEdit="multiEditControl"
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
  cancelSummaryGroup
} from '@/api/designate/suggestion'

export default {
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    updateTime: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
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
      groupForm: {
        groupName:''
      }
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
          this.init()
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
          this.init()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 获取模拟列表
    getFetchData() {
      if (!this.rfqId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      this.tableLoading = true
      getSimulateRecord({
        rfqId: this.rfqId
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.supplierList = res.data.supplierSet
          const tableListData = res.data.partInfoList || []
          tableListData.map(o => {
            // 绑定供应商
            o.id = this.randomid()
            if (o.groupId) {
              o.gid = o.groupId
            } else {
              o.gid = this.randomid()
              o.noGid = true
            }
            o.supplier = this.supplierList
            // 绑定对应供应商TTO
            o.TTo = []
            const suppDataList = o.bdlInfoList || []
            this.supplierList.forEach((suppName, index) => {
              const supplier = suppDataList.find(o => o.supplierName === suppName) || {}
              o.TTo[index] = supplier.tto || 0
            })
            // 绑定推荐供应商
            const recommendBdlInfoList = o.recommendBdlInfoList || []
            o.supplierChosen = recommendBdlInfoList.map(o => o.recommendSupplier)
            o.percent = recommendBdlInfoList.map(o => o.share)
            return o
          })
          this.tableListData = tableListData
          console.log('tableListData', tableListData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableLoading = false
      })
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
    }
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