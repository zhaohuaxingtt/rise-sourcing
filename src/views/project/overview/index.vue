<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:06:56
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-04 14:00:14
 * @Description: 项目管理概览
 * @FilePath: \front-web\src\views\project\overview\index.vue
-->

<template>
  <iPage class="projectoverview">
    <projectTop />
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="openSelectCar">{{language('XUANZEXIANSHICHEXINGXIANGMU', '选择显示车型项目')}}</iButton>
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item :label="language('CHEXINGXIANGMU','车型项目')">
          <iSelect filterable v-model="searchParams.carProject">
            <el-option
              v-for="item in carProjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('SOPSHIJIAN','SOP时间')">
          <iDatePicker v-model="searchParams.sopDate" type="daterange"></iDatePicker>
        </el-form-item>
        <el-form-item :label="language('XIANGMUCAIGOUYUAN','项目采购员')">
          <iSelect filterable v-model="searchParams.buyerName">
            <el-option
              v-for="item in purchaseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <tableList :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" ></tableList>
    </iCard>
    <selectCarProDialog :dialogVisible="selectCarVisible" @changeVisible="changeSelectCarVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise"
import projectTop from '../components/projectHeader'
import moment from 'moment'
import tableList from './components/overviewTable'
import selectCarProDialog from './components/selectcarpro'
import { getOverview, getAllProPurchaser } from '@/api/project'
import { cloneDeep } from 'lodash'
export default {
  components: { iPage, projectTop, iCard, iSearch, iButton, iDatePicker, iSelect, tableList, selectCarProDialog },
  data() {
    const currentYear = moment().year()
    return {
      selectCarVisible: false,
      searchParams: {
        carProject: ''
      },
      carProjectOptions: [],
      purchaseOptions: [],
      tableTitle: [
        {props: 'basic', name: '基础信息', key: 'JICHUXINXI'},
        {props: currentYear, name: currentYear, type: 'year'},
        {props: currentYear + 1, name: currentYear + 1, type: 'year'},
        {props: currentYear + 2, name: currentYear + 2, type: 'year'},
        {props: currentYear + 3, name: currentYear + 3, type: 'year'},
        {props: 'output', name: '产量', key: 'CHANLIANG'},
        {props: 'projectPurchaserName', name: '项目采购员', key: 'XIANGMUCAIGOUYUAN'},
        {props: 'caozuo', name: '操作', key: 'CAOZUO'}
      ],
      tableData: [],
      tableLoading: false,
      progressList: [
        { label: 'PD', date: 'pepPd', value: 'pepPdWk', status: 'pepPdStatus' },
        { label: 'PF', date: 'pepPf', value: 'pepPfWk', status: 'pepPfStatus' },
        { label: 'KF', date: 'pepKf', value: 'pepKfWk', status: 'pepKfStatus' },
        { label: 'PLF', date: 'pepPlf', value: 'pepPlfWk', status: 'pepPlfStatus' },
        { label: 'BF', date: 'pepBf', value: 'pepBfWk', status: 'pepBfStatus' },
        { label: 'LF', date: 'pepLf', value: 'pepLfWk', status: 'pepLfStatus' },
        { label: 'VFF', date: 'pepVff', value: 'pepVffWk', status: 'pepVffStatus' },
        { label: 'PVS', date: 'pepPvs', value: 'pepPvsWk', status: 'pepPvsStatus' },
        { label: '0S', date: 'pepOs', value: 'pepOsWk', status: 'pepOsStatus' },
        { label: 'SOP', date: 'pepSop', value: 'pepSopWk', status: 'pepSopStatus' },
        { label: 'ME', date: 'pepMe', value: 'pepMeWk', status: 'pepMeStatus' }
      ],
      tableDataTemp: []
    }
  },
  created() {
    this.getOverviewList()
    this.getProductPurchaserOptions()
  },
  methods: {
    getProductPurchaserOptions() {
      getAllProPurchaser().then(res => {
        if (res?.result) {
          this.purchaseOptions = res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.nameZh
              }
            })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleSure() {
      this.tableData = this.tableDataTemp.filter(item => {
        let result = false
        if (this.searchParams.carProject) {
          result = item.id === this.searchParams.carProject
        }
        if (this.searchParams.buyerName) {
          result = item.projectPurchaser.includes(this.searchParams.buyerName)
        }
        if (this.searchParams.sopDate) {
          result = moment(item.sop).isBefore(moment(this.searchParams.sopDate[1])) && moment(item.sop).isAfter(moment(this.searchParams.sopDate[0]))
        }
        return result
      })
    },
    handleReset() {
      this.searchParams = {}
      this.tableData = cloneDeep(this.tableDataTemp)
    },
    getStatus(currDate, beforeDate) {
      if (moment(currDate).isBefore(moment())) {
        return 1
      } else if (beforeDate) {
        if (moment(beforeDate).isBefore(moment())) {
          return 2
        } else {
          return 3
        }
      } else {
        return 2
      }
    },
    getLineStatus(currDate, nextDate) {
      if (moment(nextDate).isBefore(moment())) {
        return 1
      } else if(moment(currDate).isBefore(moment())) {
        return 2
      } else {
        return 3
      }
    },
    getNodeList(node) {
      if(node) {
        const nodeInYearList = this.progressList.reduce((accu, curr, index) => {
          if (curr.label !== 'PD') {
            const week = moment(node[curr.date]).week()
            return [...accu, {
              ...curr,
              year: moment(node[curr.date]).year(),
              week: week,
              season: week < 14 ? 1 : week < 27 ? 2 : week < 39 ? 3 : 4,  
              fullDate: node[curr.date],
              status: this.getStatus(node[curr.date], accu[accu.length - 1] ? accu[accu.length - 1].fullDate : null)
            }]
          } else {
            return accu
          }
        },[])
        return nodeInYearList
      }
      return []
    },
    getOverviewList() {
      this.tableLoading = true
      getOverview().then(res => {
        if (res?.result) {
          const list = (res.data || []).map(item => {
            const nodeList = this.getNodeList(item.pepTimeNode)
            return {
              ...item,
              nodeList: nodeList,
            }
          })
          this.tableData = cloneDeep(list)
          this.tableDataTemp = cloneDeep(list)
          this.carProjectOptions = (res.data || []).map(item => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProjectZh
            }
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    openSelectCar() {
      this.changeSelectCarVisible(true)
    },
    changeSelectCarVisible(visible) {
      this.selectCarVisible = visible
      if (!visible) {
        this.getOverviewList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.projectoverview {
}
</style>