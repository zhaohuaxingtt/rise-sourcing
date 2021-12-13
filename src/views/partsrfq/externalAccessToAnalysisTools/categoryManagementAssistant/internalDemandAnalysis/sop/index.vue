<!--
 * @Author: 舒杰
 * @Date: 2021-08-16 14:51:40
 * @LastEditTime: 2021-09-30 13:24:11
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\sop\index.vue
-->
<template>
   <!-- <iCard class="margin-top20" id="sop">
      <template slot="header">
         <div class="flex-between-center title">
            <div class="flex-align-center">
               <span>{{language("SOPJINDUZHOU","SOP进度轴")}}</span>
            </div>
            <div class="flex">
              <iSelect class="margin-right15" v-model="carType" filterable multiple collapse-tags>
                   <el-option :value="item.cartypeProCode" :label="item.cartypeProNameZh" v-for="(item,index) in carTypeCodeArr" :key="index"></el-option>
               </iSelect>
               <iButton @click="getOverviewList">{{ language("QUEREN", "确认") }}</iButton>
               <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton>
               <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
               <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
            </div>
         </div>
		</template>
      
      <div id="powerBi">
       <tableList :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" :showOperation="false"></tableList>
      </div>
   </iCard> -->
   <!-- <carProject optionType="1"></carProject> -->
   <div>
     <iSearch :icon="true" >
        <template slot="button">
          <iButton @click="openSelectCar" v-permission.auto='PROJECTMGT_OVERVIEW_SELECTVISIBLECARPROJECT|项目管理-概览-选择显示车型项目'>{{language('XUANZEXIANSHICHEXINGXIANGMU', '选择显示车型项目')}}</iButton>
          <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
          <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
          <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
          <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
        </template>
        <el-form>
          <el-form-item :label="language('CHEXINGXIANGMU','车型项目')" v-permission.auto='PROJECTMGT_OVERVIEW_CARPROJECT|项目管理-概览-车型项目'>
            <iSelect filterable v-model="searchParams.carProject" :placeholder="language('QINGXUANZE','请选择')">
              <el-option
                v-for="item in carProjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('SOPSHIJIAN','SOP时间')" v-permission.auto='PROJECTMGT_OVERVIEW_SOPDATE|项目管理-概览-SOP时间'>
            <iDatePicker v-model="searchParams.sopDate" type="daterange"></iDatePicker>
          </el-form-item>
          <el-form-item :label="language('XIANGMUCAIGOUYUAN','项目采购员')" v-permission.auto='PROJECTMGT_OVERVIEW_PROJECTPURCHASER|项目管理-概览-项目采购员'>
            <productPurchaserSelect filterable v-model="searchParams.buyerName" />
          </el-form-item>
        </el-form>
      </iSearch>
      <!---------------------------------------------------------------------->
      <!----------                 表格                        ---------------->
      <!---------------------------------------------------------------------->
      <iCard class="margin-top20" v-permission.auto='PROJECTMGT_OVERVIEW_CARPROJECTTALBE|项目管理-概览-表格'>
        <tableList :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" :showOperation="false"></tableList>
      </iCard>
      <!---------------------------------------------------------------------->
      <!----------                  配置显示车型项目弹窗        ---------------->
      <!---------------------------------------------------------------------->
      <selectCarProDialog :dialogVisible="selectCarVisible" @changeVisible="changeSelectCarVisible" />
   </div>
</template>

<script>
import { iCard, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise"
// import projectTop from '../components/projectHeader'
import moment from 'moment'
import tableList from '@/views/project/overview/components/overviewTable'
import selectCarProDialog from '@/views/project/overview/components/selectcarpro'
import { getOverview } from '@/api/project'
import productPurchaserSelect from '@/views/project/components/commonSelect/productPurchaserSelect'
import {downloadPdfMixins} from '@/utils/pdf'
export default {
  mixins:[downloadPdfMixins],
  components: { iCard, iSearch, iButton, iDatePicker, iSelect, tableList, selectCarProDialog, productPurchaserSelect },
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
      tableDataTemp: [],
      categoryCode: "",
      id: ""
    }
  },
  async created() {
    this.categoryCode=this.$store.state.rfq.categoryCode
    this.getOverviewList()
  },
  watch: {
    async	"$store.state.rfq.categoryCode"(){
      this.categoryCode=this.$store.state.rfq.categoryCode
      this.id = ""
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    async save(){
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'sop',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName:'品类管理助手_SOP进度轴_' + this.$store.state.rfq.categoryName + '_' + window.moment().format('YYYY-MM-DD') +'_',
      });
      let params={
        categoryCode:this.categoryCode,
        fileType:"PDF",
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        schemeName:"",
        reportUrl: resFile.downloadUrl,
        id:this.id,
        carTypeProDTO:this.carType
      }
      sopPipeLineSave(params).then(res=>{
        this.resultMessage(res)
      })
    },
    /**
     * @Description: 根据筛选条件筛选
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSure() {
      this.tableData = this.tableDataTemp.filter(item => {
        let result = true
        if (this.searchParams.carProject && result === true) {
          result = item.id === this.searchParams.carProject
        }
        if (this.searchParams.buyerName && result === true) {
          result = item.projectPurchaser.includes(this.searchParams.buyerName)
        }
        if (this.searchParams.sopDate && result === true) {
          result = moment(item.sopDate).isBefore(moment(this.searchParams.sopDate[1]).add(1, 'days')) && moment(item.sopDate).isAfter(moment(this.searchParams.sopDate[0]).subtract(1, 'days'))
        }
        return result
      })
    },
    /**
     * @Description: 重置
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleReset() {
      this.searchParams = {}
      this.handleSure()
    },
    /**
     * @Description: 获取节点状态
     * @Author: Luoshuang
     * @param {*} currDate
     * @param {*} beforeDate
     * @return {*}
     */    
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
    /**
     * @Description: 整合节点信息
     * @Author: Luoshuang
     * @param {*} node
     * @return {*}
     */    
    getNodeList(node) {
      if(node) {
        const sortNodeInYearList = this.progressList.reduce((accu, curr, index) => {
          if (curr.label !== 'PD' && node[curr.date] && node[curr.date] !== '') {
            const week = Number(node[curr.value]?.split('KW')[1])
            return [...accu, {
              ...curr,
              year: Number(node[curr.value]?.split('-')[0]),
              week: week,
              season: week < 14 ? 1 : week < 27 ? 2 : week < 39 ? 3 : 4,  
              fullDate: node[curr.date],
              left: (moment(node[curr.date]).month() % 3) * 13.3
            }]
          } else {
            return accu
          }
        },[]).sort((a,b)=>a.year - b.year,(a,b)=>a.week - b.week)
        const nodeInYearList = sortNodeInYearList.map((item, index) => {
          return {
            ...item,
            status: this.getStatus(item.fullDate, sortNodeInYearList[index - 1]?.fullDate)
          }
        })
        return nodeInYearList
      }
      return []
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getOverviewList() {
      this.searchParams = {}
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
          // eslint-disable-next-line no-undef
          this.tableData = _.cloneDeep(list)
          // eslint-disable-next-line no-undef
          this.tableDataTemp = _.cloneDeep(list)
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
    /**
     * @Description: 打开配置车型项目弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openSelectCar() {
      this.changeSelectCarVisible(true)
    },
    /**
     * @Description: 配置项目弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
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
  &-home {
    padding: 0;
    padding-top: 10px;
    height: calc(100% - 55px);
    overflow: auto;
  }
}
</style>