<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 14:51:03
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-27 18:04:38
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\monitorDetail\components\partList\index.vue
-->
<template>
  <div class="partListView" v-loading="loading"> 
    <div class="partListView-title"> 
      <div class="partListView-title-span"> 
        <!-- <el-checkbox class="partListView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> 
        <span class="partListView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span>  -->
      </div> 
      <div v-if="partStatus != 7"> 
        <iButton @click="showDelayResaons" :loading="saveloading" v-if="partStatus != 1">{{language('CHAKANYANWUYUANYIN', '查看延误原因')}}</iButton> 
        <iButton @click="gotoSechedule">{{language('CHAKANPAICHENGJIHUA', '查看排程计划')}}</iButton> 
        <iButton @click="handleSendFs" v-if="partStatus == 2 || partStatus == 3">{{language('FASONGJINDUQUEREN', '发送进度确认')}}</iButton> 
        <iButton @click="openDelayReasonDialog" v-if="[3,2,5,6].includes(Number(partStatus))" >{{language('YANWUYUANYINQUEREN', '延误原因确认')}}</iButton> 
        <iButton @click="handleExport" v-if="[1].includes(Number(partStatus))">{{language('DAOCHUQINGDAN', '导出清单')}}</iButton> 
      </div> 
    </div> 
    <div class="partListView-content"> 
      <div v-for="pro in listWithNodeDelayWeeks" :key="pro.label" class="productItem"> 
        <div class="productItem-top"> 
          <el-checkbox @change="handleCheckboxChange($event, pro)"> 
            {{`${pro.partNameZh || ''}`}} 
          </el-checkbox> 
          <icon v-if="partStatus != 7" @click.native="openChangeLight(pro)" class="productItem-top-icon cursor" symbol name="iconbianji"></icon>
          <template>
            <icon class="productItem-top-icon2" v-if="pro[pro.partStatus == 7 ? 'projectProc' :'projectRisk'] == '3'" symbol name="iconzhuangtai_hong"></icon>
            <icon class="productItem-top-icon2" v-else-if="pro[pro.partStatus == 7 ? 'projectProc' :'projectRisk'] == '2'" symbol name="iconzhuangtai_huang"></icon>
            <icon class="productItem-top-icon2" v-else-if="pro[pro.partStatus == 7 ? 'projectProc' :'projectRisk'] == '1'" symbol name="iconzhuangtai_lv"></icon>
          </template>
          <span class="productItem-top-desc">{{`${pro.partNum || ''}  ${pro.partNameDe || ''}  ${pro.buyerName || ''}`}}</span>
        </div> 
        <div class="productItem-bottom">
          <div class="productItem-bottom-text">
            <div v-for="item in targetList" :key="item.value" class="productItem-top-targetList-item margin-top20">
              <span class="productItem-top-targetList-item-label">{{language(item.key, item.label)}}</span>
            </div>
          </div>
          <div v-for="(item, index) in nodeList" :key="item.key" class="productItem-bottom-node">
            <div class="productItem-bottom-nodeItem">
              <span class="productItem-bottom-nodeItem-label" v-if="!item.label.includes('1st')">{{item.key ? language(item.key, item.label) : item.label}}</span>
              <span class="productItem-bottom-nodeItem-label" v-else>1<sup>st</sup>{{item.label.split('1st')[1]}}</span>
              <el-popover
                trigger="hover"
                placement="top-start"
                :disabled="!(pro[item.delayReason] || pro[item.delayReason2])"
                :value="showDelayResaon"
              >
                <template>
                  <p v-if="pro[item.delayReason]">{{pro[item.delayReason]}}</p>
                  <p v-if="pro[item.delayReason2]">{{pro[item.delayReason2] || ''}}</p>
                </template>
                <!------------------------------节点图标----------------------------------->
                <template v-if="Number(pro.partStatus) > item.partPeriod" slot="reference">
                  <icon v-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) < 1 " symbol name="iconjindu_yiwancheng_lv" class="step-icon  click-icon"></icon>
                  <icon v-else-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) < 3 " symbol name="iconjindu_yiwancheng_huang" class="step-icon  click-icon"></icon>
                  <icon v-else-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) < 5 " symbol name="iconjindu_yiwancheng_hong" class="step-icon  click-icon"></icon>
                  <icon v-else-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) > 4" symbol name="iconjindu_yiwancheng_hei" class="step-icon  click-icon"></icon>
                </template>
                <template v-else-if="item.partPeriod == 4 ? [4,3].includes(Number(pro.partStatus)) : Number(pro.partStatus) == item.partPeriod" slot="reference">
                  <icon v-if="item.key === 'SHIFANG' || ( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) < 1  " symbol name="iconjindu_jinhangzhong_lv" class="step-icon  click-icon"></icon>
                  <icon v-else-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) < 3 " symbol name="iconjindu_jinhangzhong_huang" class="step-icon  click-icon"></icon>
                  <icon v-else-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) < 5 " symbol name="iconjindu_jinhangzhong_hong" class="step-icon  click-icon"></icon>
                  <icon v-else-if="( item.partPeriod == 6 ? pro[item.delayWeeksLarger] : pro[item.delayWeeks]) > 4 " symbol name="iconjindu_jinhangzhong_hei" class="step-icon  click-icon"></icon>
                  <icon v-else symbol name="iconjindu_daijinhang" class="step-icon  click-icon"></icon>
                </template>
                <template v-else slot="reference">
                  <icon symbol name="iconjindu_daijinhang" class="step-icon  click-icon"></icon>
                </template>
                
                <!------------------------------节点图标结束----------------------------------->
              </el-popover>
              
              <div class="flex-box margin-top20 " v-for="taItem in targetList" :key="taItem.value" >
                <el-popover
                  trigger="hover"
                  placement="top-start"
                  :disabled="taItem.key !== 'JIHUASHIJIAN' || !(pro[item.soll2] || pro[item.soll22])"
                >
                  <iText slot="reference"  v-if="Number(pro.partStatus) <= item.partPeriod" class="productItem-bottom-stepBetween-input text ">
                    {{taItem.key === 'JIHUASHIJIAN' ? pro[item.kw] : ''}}
                    {{taItem.key === 'JIHUASHIJIAN' ? index === nodeList.length - 1 && pro[item.kw] ? '('+(pro[item.kw1] || '')+')' : '' : ''}}
                  </iText>
                  <iText slot="reference"  v-else class="productItem-bottom-stepBetween-input text ">
                    {{pro[item[taItem.props]]}}
                    {{index === nodeList.length - 1 && pro[item[taItem.props1]] ? '('+(pro[item[taItem.props1]] || '')+')' : ''}}
                    <span class="flowWeek" :class="taItem.key !== 'JIHUASHIJIAN' ? '' : 'hidden'" v-if="pro[item.kw] && pro[item.delayWeeks] > 0">+W{{pro[item.delayWeeks]}}</span>
                  </iText>
                  <div>
                    <p>{{index === nodeList.length - 1 ? 'EM' : ''}} soll1：{{getSollKw(pro[item.soll1])}} <span v-if="pro[item.soll22]">OTS soll1：{{getSollKw(pro[item.soll12])}}</span></p>
                    <p>{{index === nodeList.length - 1 ? 'EM' : ''}} soll2：{{getSollKw(pro[item.soll2])}} <span v-if="pro[item.soll22]">OTS soll2：{{getSollKw(pro[item.soll22])}}</span></p>
                  </div>
                </el-popover>
              </div>
            </div>
            <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1">
              <template v-if="Number(pro.partStatus) > nodeList[index + 1].partPeriod" >
                <span v-html="svgList['iconliuchengjiedianyiwancheng1']" class="step-between-icon margin-top45"></span>
              </template>
              <template v-else-if="nodeList[index + 1].partPeriod == 4 ? [4,3].includes(Number(pro.partStatus)) : Number(pro.partStatus) == nodeList[index + 1].partPeriod" >
                <span v-html="svgList['iconliuchengjiedianjinhangzhong1']" class="step-between-icon margin-top45"></span>
              </template>
              <template v-else>
                <span v-html="svgList['iconliuchengjiedian-weikaishi']" class="step-between-icon margin-top45"></span>
              </template>
            </div>
          </div>
        </div>
      </div> 
    </div> 
    <fsConfirm ref="fsConfirmPart" :dialogVisible="dialogVisibleFS" @handleConfirm="handleSendFsConfirm" :tableListNomi="tableListNomi" :tableListKickoff="tableListKickoff" :cartypeProId="cartypeProId" @changeVisible="changeFsConfirmVisible" /> 
    <changeLightDialog ref="changeLight" :dialogVisible="dialogVisibleLight" @changeVisible="changeLightDialogVisible" @handleActionPlan="handleActionPlan" :actionPlan="selectParts.actionPlan" :delayLevelPro="selectParts.delayLevelPro" />
    <delayReasonDialog ref="delayReason" :dialogVisible="dialogVisibleDelayReason" @changeVisible="changeDelayReasonDialogVisible" :partStatus="partStatus" :cartypeProId="cartypeProId" :partNums="selectPartNums" :carProjectName="carProjectName" />
  </div> 
</template>

<script>
import { iButton, icon, iText, iMessage } from 'rise'
import { getProductGroupNodeInfoList, downloadNodeView, partProgressConfirm, getFsUserListPart, getAllFS } from '@/api/project'
import { actionPlan, getProgressConfirmList } from '@/api/project/process'
import { svgList, nodeList } from './data'
import moment from 'moment'
import fsConfirm from '@/views/project/schedulingassistant/part/components/fsconfirm'
import changeLightDialog from '../changeLight'
import delayReasonDialog from '../delayReson'
export default {
  components: { iButton, icon, iText, fsConfirm, changeLightDialog, delayReasonDialog },
  props: {
    cartypeProId: {type:String},
    list: {type:Array,default:() => []},
    partStatus: {type: String||Number},
    carProjectName: {type:String}
  },
  data() {
    return {
      loading: false,
      checkAll: false,
      checkedProducts: [],
      isIndeterminate: false,
      targetList: [
        {label: '计划时间', key: 'JIHUASHIJIAN', value: 'vffTarget', props: 'planKw', props1: 'planKw1'},
        {label: '实际时间', key: 'SHIJISHIJIAN', value: 'pvsTarget', props: 'kw', props1: 'kw1'},
      ],
      nodeList: nodeList,
      downloadLoading: false,
      svgList,
      showDelayResaon: false,
      selectPartNums: [],
      dialogVisibleFS: false,
      tableListNomi: [],
      tableListKickoff: [],
      dialogVisibleLight: false,
      selectParts: {},
      dialogVisibleDelayReason: false,
      moment
    }
  },
  computed: {
    listWithNodeDelayWeeks() {
      // 当前时间周，针对即将发生但未发生的节点用计划时间和当前时间周去判断延误时间（周）
      const currentKw = moment().format('YYYY-[KW]WW')
      
      return this.list.map(item => {
        const partStatus = Number(item.partStatus)
        const emDelayWeeks = partStatus > 5 ? this.getDelayWeeks(item[partStatus == 6 ? 'emTimeKw' : 'planEmTimeKw'], partStatus == 6 ? currentKw : item.emTimeKw) : 0
        const otsDelayWeeks = partStatus > 5 ? this.getDelayWeeks(item[partStatus == 6 ? 'otsTimeKw' : 'planOtsTimeKw'], partStatus == 6 ? currentKw : item.otsTimeKw) : 0
        return {
          ...item,
          releaseDelayWeeks: partStatus > 0 ? this.getDelayWeeks(partStatus == 1 ? item.releaseTimeKw : item.planReleaseTimeKw, partStatus == 1 ? currentKw : item.releaseTimeKw) : 0,
          nomiDelayWeeks: partStatus > 1 ? this.getDelayWeeks(partStatus == 2 ? item.nomiTimeKw : item.planNomiTimeKw, partStatus == 2 ? currentKw : item.nomiTimeKw) : 0,
          bfDelayWeeks: partStatus > 2 ? this.getDelayWeeks(item[partStatus == 4 || partStatus == 3  ? 'bfTimeKw' : 'planBfTimeKw'], partStatus == 4 || partStatus == 3 ? currentKw : item.bfTimeKw) : 0,
          firstTryoutDelayWeeks: partStatus > 4 ? this.getDelayWeeks(item[partStatus == 5 ? 'firstTryoutTimeKw' : 'planFirstTryoutTimeKw'], partStatus == 5 ? currentKw : item.firstTryoutTimeKw) : 0,
          emDelayWeeks,
          otsDelayWeeks,
          emOtsDelayWeeks: partStatus > 5 ? Math.max(emDelayWeeks,otsDelayWeeks): 0
        }
      })
    }
  },
  methods: {
    getSollKw(time) {
      const momentTime = moment(time)
      const weeks = momentTime.weeks()
      return momentTime.year() + '-' + 'KW' + (weeks < 10 ? '0'+ weeks : weeks)
    },
    handleActionPlan(delayLevelPro, actionPlanReason) {
      const params = {
        ...this.selectParts,
        delayLevelPro,
        actionPlan: actionPlanReason
      }
      actionPlan(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeLightDialogVisible(false) 
          this.$emit('handleSure')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        }
      }).finally(() => {
        this.$refs.changeLight.changeSaveLoading(false)
      })
    },
    openDelayReasonDialog() {
      this.changeDelayReasonDialogVisible(true)
    },
    changeDelayReasonDialogVisible(visible) {
      this.dialogVisibleDelayReason = visible
    },
    /**
     * @Description: 打开进度灯弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openChangeLight(pro) {
      if (this.partStatus == 7) {
        return
      }
      this.selectParts = pro
      this.changeLightDialogVisible(true)
    },
    /**
     * @Description: 修改进度灯状态转换弹窗显隐状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeLightDialogVisible(visible) {
      this.dialogVisibleLight = visible
    },
    /** 
     * @Description: 根据选中的行获取每一行的fs下拉列表 
     * @Author: Luoshuang 
     * @param {*} tableList 
     * @return {*} 
     */    
    async getFsUserList(tableList) {  
      const res = await getFsUserListPart({partNums: tableList.map(item => item.partNum).join(',')}) 
        if (res?.result) { 
          return res.data   
        } else { 
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
          return null  
        } 
    }, 
    /**
     * @Description: 获取fs下拉选项 
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */     
    getFSOPtions() { 
      getAllFS().then(res => { 
        if (res?.result) { 
          this.selectOptions = {  
            ...this.selectOptions, 
            fsOptions: res.data.map(item => { 
              return {  
                ...item,  
                value: item.id, 
                label: item.nameZh  
              }  
            }) 
          } 
        } else {  
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }) 
    }, 
    /**
     * @Description: 组合数据打开发送fs弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async handleSendFs() {
      // 根据车型id和零件状态去获取需要发送的数据
      // 根据需要发送的数据的零件号去获取对应的询价采购员列表
      // 组合好数据，打开弹窗
      const params = {
        partStatus: this.partStatus,
        projectId: this.cartypeProId
      }
      try {
        this.loading = true
        const res = await getProgressConfirmList(params)
        if (res?.result) {
          let tableList = res.data || []
          const fsOptions = await this.getFsUserList(tableList)
          tableList = tableList.reduce((accu, item) => {
            if (item.procStatus != 1 && item.procStatus != 3) {
              return accu
            }
            const fs = fsOptions && fsOptions[item.partNum] && fsOptions[item.partNum][0].userName || '' 
            const fsId = fsOptions && fsOptions[item.partNum] && fsOptions[item.partNum][0].userId || '' 
            const options = fsOptions ? fsOptions[item.partNum]?.reduce((accu, item) => { 
              if (item.userId) { 
                return [...accu, { 
                  ...item, 
                  value: item.userId, 
                  label: item.userName 
                }] 
              } else { 
                return accu 
              } 
            },[]) : []  
            return [...accu, {  
              ...item, 
              cartypeProId: this.cartypeProId, 
              cartypeProject: this.carProjectName, 
              projectPurchaser: this.$store.state.permission.userInfo.nameZh, 
              projectPurchaserId: this.$store.state.permission.userInfo.id, 
              selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions, 
              fs, 
              fsId,
              confirmDateDeadline: moment(this.replyEndDate).format('YYYY-MM-DD'), 
              partNum: item.partNum, 
              partName: item.partNameZh, 
              delayWeek: item.delayWeeks,
              isBmg: item.bmgFlag || '否',
              scheNomiTimeKw: item.nomiTimeKw, 
              scheKickoffTimeKw: item.kickoffTimeKw, 
              scheFirstTryoutTimeKw: item.firstTryoutTimeKw, 
              scheOtsTimeKw: item.otsTimeKw, 
              scheEmTimeKw: item.emTimeKw, 
              riskLevel: item.projectRisk, 
              confirmStatus: item.procStatus, 
              partPeriod: item.partStatus 
            } ]
          },[])
          if (this.partStatus == 2) {
            this.tableListNomi = tableList
            this.tableListKickoff = []
          } else if (this.partStatus == 3) {
            this.tableListKickoff = tableList
            this.tableListNomi = []
          }
          this.changeFsConfirmVisible(true)
        } else {
          this.tableListNomi = []
          this.tableListKickoff = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
        this.loading = false
      } catch (e) {
        this.tableListNomi = []
        this.tableListKickoff = []
        this.loading = false
      }
      
      
    },
    /**
     * @Description: 修改fs弹窗
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */
    changeFsConfirmVisible(visible) {  
      this.dialogVisibleFS = visible  
    },  
    handleSendFsConfirm(selectRow) {  
      // eslint-disable-next-line no-undef 
      partProgressConfirm(selectRow.map(item => _.omit(item, 'selectOption'))).then(res => { 
        if (res?.result) {  
          if (res.data && res.data.length > 0) {  
            iMessage.warn(res.data.map(item => item.partName).join(',')+this.language('BUFUHEFASONGTIAOJIANWUFAFASONG','不符合发送条件，无法发送')) 
          } else {  
            iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
            this.changeFsConfirmVisible(false) 
          } 
        } else {  
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }).finally(() => {  
        this.$refs.fsConfirmPart.changeSaveLoading(false) 
      }) 
    },  
    showDelayResaons() {
      this.showDelayResaon = !this.showDelayResaon
    },
    /**
     * @Description: 计算实际时间比计划时间延误（周） 
     * @Author: Luoshuang 
     * @param {*} time1 计划时间
     * @param {*} time2 实际时间
     * @return {*} 
     */    
    getDelayWeeks(time1, time2) {
      if (!time1 || !time2) {
        return 0
      }
      const year1 = Number(time1.split('-KW')[0]) 
      const week1 = Number(time1.split('-KW')[1]) 
      const year2 = Number(time2.split('-KW')[0]) 
      const week2 = Number(time2.split('-KW')[1]) 
      if (year1 < year2) { 
        let weeks = 0 
        for (var i = year1; i <= year2; i++) { 
          weeks += i === year2 ? week2 : moment(i+'-01-01').weeksInYear() - (i === year1 ? week1 : 0) 
        } 
        return weeks 
      } 
      if (year1 === year2 && week1 < week2) { 
        return week2 - week1 
      } 
      return 0
    }, 
    async handleDownloadNode() {
      this.downloadLoading = true
      await downloadNodeView(this.cartypeProId)
      this.downloadLoading = false
    },
    init() {
      this.getProducts(this.cartypeProId)
    },
    getProducts(id) {
      this.loading = true
      getProductGroupNodeInfoList(id).then(res => {
        if (res?.result) {
          this.parts = res.data || []
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleCheckAllChange(val) {
      this.parts = this.parts.map(item => {
        return {
          ...item,
          isChecked: val
        }
      })
      this.isIndeterminate = false;
    },
    handleCheckboxChange(value, pro) {
      // this.$set(pro, 'isChecked', value)
      if (value) {
        this.selectPartNums.push(pro.partNum)
      } else {
        // eslint-disable-next-line no-undef
        _.pull(this.selectPartNums, pro.partNum)
      }
      // let checkedCount = this.list.filter(item => item.isChecked).length;
      // this.checkAll = checkedCount === this.list.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
    },
    gotoSechedule() {
      // const selectPartNums = this.list.filter(item => item.isChecked).map(item => item.partNum)
      const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/partscheduling`, query: {partNum: this.selectPartNums.join(','),carProject:this.cartypeProId, carProjectName: this.carProjectName}}) 
      window.open(router.href,'_blank') 
    },
  }
}
</script>

<style lang="scss" scoped>
.partListView {
  height: 100%;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px;
    &-span {
      padding-left: 20px;
      display: flex;
      align-items: center;
      &-unit {
        font-size: 16px;
        color: #939393;
        margin-left: 12px;
      }
    }
  }
  &-content {
    height: calc(100% - 80px);
    overflow: auto;
  }
  .productItem {
    background-color: rgba(205, 212, 226, 0.12);
    border-radius: 10px;
    padding: 25px 20px 30px;
    &-top {
      display: flex;
      align-items: center;
      &-targetList {
        margin-left: 130px;
        display: flex;
        align-items: center;
        &-item {
          margin-right: 54px;
          display: flex;
          align-items: center;
          &-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
          &-label {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }
      &-icon {
        width: 15px;
        height: 15px;
        margin-left: 34px;
      }
      &-icon2 {
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
      &-desc {
        font-size: 16px;
        opacity: 0.8;
        margin-left: 10px;
      }
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .flex-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        font-size: 16px;
        color: #333;
        margin-left: 30px;
        span {
          display: flex;
          height: 30px;
          align-items: center;
        }
      }
      &-node {
        flex: 2;
        position: relative;
        display: flex;
        &:last-child {
          flex: 1;
        }
        .productItem-bottom-nodeItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          &-label {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            // display: flex;
            height: 30px;
            // align-items: center;
            // justify-content: center;
          }
          .step-icon {
            width: 36px;
            height: 36px;
          }
        }
        .productItem-bottom-stepBetween {
          // position: absolute;
          // right: 0;
          // top: 30px;
          margin-left: 5%;
          width: 50%;
          margin-right: 5%;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          &-input {
            font-size: 14px;
            height: 30px;
            width: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            &.text {
              border: 1px solid rgba(181, 186, 198, 0.19);
              background-color: rgba(233, 236, 241, 0.75);
              .hidden {
                visibility: hidden;
              }
              .flowWeek {
                font-family: Arial;
                margin-left: 15px;
              }
            }
          }
          .small {
            .productItem-bottom-stepBetween-input {
              width: 60px;
            }
          }
          .step-between-icon {
            width: 100%;
            ::v-deep .icon {
              width: 100%;
              height: 10px;
            }
          }
        }
      }
    }
  }
  .productItem + .productItem {
    margin-top: 20px;
  }
  ::v-deep .el-checkbox {
    display: flex;
    align-items: center;
  }
  ::v-deep .el-checkbox__inner {
    width: 20px;
    height: 20px;
    &::after {
      height: 10px;
      width: 5px;
      left: 6px;
    }
    &::before {
      top: 8px;
    }
  }
  ::v-deep .el-checkbox__label {
    font-size: 18px;
    font-weight: bold;
    color: #41434A;
  }
}
</style>