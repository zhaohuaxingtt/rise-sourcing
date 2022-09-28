<!--
 * @Author: Luoshuang
 * @Date: 2021-08-25 16:49:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-11 17:12:52
 * @Description: 零件排程列表
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\part\components\partList.vue
-->

<template> 
  <div class="partListView" v-loading="loading"> 
    <div class="partListView-title"> 
      <div class="partListView-title-span"> 
        <!-- <el-checkbox class="partListView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{language('QUANXUAN','全选')}}</el-checkbox>  -->
        <span class="partListView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span> 
      </div> 
      <div v-if="!isSop && parts.length > 0"> 
        <logicSettingBtn v-permission.auto='PROJECTMGT_SCHEDULINGASSISTANT_PARTSCHEDULING_SUANFAPEIZHI_BUTTON|零件排程-算法配置-按钮' ref="logicSettingBtn" class="margin-right10" logicType="2" :carProject="cartypeProId" @handleUse="updatePartGroupConfig" :logicList="partLogicList" /> 
        <iButton v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PARTSCHEDULING_SAVE_BUTTON|零件排程-保存-按钮" @click="handleSave" :loading="saveloading">{{language('BAOCUN', '保存')}}</iButton> 
        <iButton v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PARTSCHEDULING_SHENGCHENGPAICHENGBANBEN_BUTTON|零件排程-生成排程版本-按钮" :loading="versionLoading" @click="handleSecheduleVersion">{{language('SHENGCHENGPAICHENGBANBEN', '生成排程版本')}}</iButton> 
        <iButton v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PARTSCHEDULING_FASONGFSQUEREN_BUTTON|零件排程-发送FS确认-按钮" @click="handleSendFs">{{language('FASONGFSQUEREN', '发送FS确认')}}</iButton> 
        <el-popover
          v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PARTSCHEDULING_DAOCHUPAICHENGQINGDAN_BUTTON|零件排程-导出排程清单-按钮"
          class="margin-left10"
          placement="bottom" 
          width="156" 
          trigger="click" 
          @show="changeShowDownloadContent(true)" 
          @hide="changeShowDownloadContent(false)"> 
          <div class="partListView-downloadContent"> 
            <div class="cursor" v-for="item in downloadTypeList" :key="item.key" @click="handleDownload(item)">{{language(item.key, item.label)}}</div> 
          </div> 
          <iButton slot="reference" :loading="downloadLoading"> 
            {{language('DAOCHUPAICHENGQINGDAN', '导出排程清单')}} 
            <icon class="margin-left16" v-if="!showDownloadContent" symbol name="icona-Icon-ArrowDropDown"></icon> 
            <icon class="margin-left16" v-else symbol name="icona-Icon-Arrowshouqi"></icon> 
          </iButton> 
        </el-popover> 
      </div> 
    </div> 
    <div class="partListView-content" ref="partSchedulPartListViewContent" v-infinite-scroll="load" :infinite-scroll-distance="20"> 
      <div v-for="pro in showParts" :key="pro.label" class="productItem" ref="partSchedulPartListViewItem"> 
        <div class="productItem-top"> 
          <div class="checkBox-wrapper">
            <!-- <el-checkbox v-model="pro.isChecked" @change="handleCheckboxChange($event, pro)">  -->
              <el-popover
                v-if="pro.zp && pro.zp === 'ZP5'"
                :content="language('ZP5LINGJIANZHENGXUPAICHENGCONGDINGIDIANJIEDIANKAISHI','ZP5零件，正序排程从定点节点开始')"
                placement="top-start"
                trigger="hover">
                <!-- <span slot="reference" >*</span> -->
                <span slot="reference" class="checkBox-wrapper-text">*</span>
              </el-popover>
            <!-- </el-checkbox>  -->
            <!-- <span @click="() => {$set(pro, 'isChecked', !pro.isChecked);handleCheckboxChange()}" class="checkBox-wrapper-text">{{`${pro.partNum || ''} ${pro.partNameZh || ''} ${pro.partNameDe || ''}`}} </span> -->
            <span class="checkBox-wrapper-text">{{`${pro.partNum || ''} ${pro.partNameZh || ''} ${pro.partNameDe || ''}`}} </span>
          </div>
          <div class="productItem-top-targetList"> 
            <!---------------------------目标指示灯，1-正常 2-风险 3-延误-------------------------------------------> 
            <div v-for="item in targetList" :key="item.value" class="productItem-top-targetList-item"> 
              <icon v-if="pro[item.value] == 1" symbol name="iconbaojiapingfengenzong-jiedian-lv" class="productItem-top-targetList-item-icon"></icon> 
              <icon v-else-if="pro[item.value] == 2" symbol name="iconbaojiapingfengenzong-jiedian-huang" class="productItem-top-targetList-item-icon"></icon> 
              <icon v-else-if="pro[item.value] == 3" symbol name="iconbaojiapingfengenzong-jiedian-hong" class="productItem-top-targetList-item-icon"></icon> 
              <span class="productItem-top-targetList-item-label">{{language(item.key, item.label)}}</span> 
            </div> 
          </div> 
        </div> 
        <div class="productItem-bottom"> 
          <div class="productItem-bottom-text"> 
            <el-popover
              :content="language('TIAOZHUANLISHIJINDUSHUJUKU','跳转历史进度数据库')"
              placement="top-start"
              trigger="hover">
              <icon slot="reference" @click.native="gotoDBhistory(pro)" symbol name="iconpaichengzhushou_lishizhi" class="margin-left8 cursor" style="width:20px;outline:none"></icon> 
            </el-popover>
             
          </div> 
          <div v-for="(item, index) in nodeList" :key="item.key" class="productItem-bottom-node"> 
            <div class="productItem-bottom-nodeItem">  
              <span class="productItem-bottom-nodeItem-label" v-if="!item.label.includes('1st')">{{item.key ? language(item.key, item.label) : item.label}}</span> 
              <span class="productItem-bottom-nodeItem-label" v-else>1<sup>st</sup>{{item.label.split('1st')[1]}}</span> 
              <icon v-if="index === nodeList.length - 1 ? pro[item.status] == 1 && pro[item.status2] == 1 : pro[item.status] == 1" symbol name="icondingdianguanli-yiwancheng" class="step-icon  click-icon"></icon> 
              <icon v-else symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>  
              <!--------------------------节点发生时间-已发生的不可编辑------------------------------------> 
              <div v-if="index == nodeList.length - 1" class="margin-top20 doubleItem"> 
                <iText v-if="pro[item.status] == 1" :class="`productItem-bottom-stepBetween-input text cursor`">{{pro[item.kw]}}</iText> 
                <!-- 是BMG 并且状态不等于1 就可以修改 -->
                <span v-else  :class="`productItem-bottom-stepBetween-input input cursor` " @click="openChangeKw(pro, item.kw, index)" >{{pro[item.kw]}}</span>
                (<span v-if="pro.bmgFlag === '是' && pro[item.status2] != 1" :class="`productItem-bottom-stepBetween-input input cursor` " @click="openChangeKw(pro, item.kw2, index)" >{{pro[item.kw2]}}</span>
                <iText v-else  :class="`productItem-bottom-stepBetween-input text cursor`">{{pro.bmgFlag === '否' ? '/' : pro[item.kw2]}}</iText>)
              </div>   
              <iText v-else-if="pro[item.status] == 1" :class="`productItem-bottom-stepBetween-input text margin-top20 cursor`">{{pro[item.kw]}}</iText> 
              <!-- <el-cascader 
                  v-else 
                  :class="`productItem-bottom-stepBetween-input margin-top20 ` "  
                  :value="pro[item.kw].split('-KW')"  
                  :options="yearWeekOptions(pro, item.kw, index)"  
                  @change="handleChange($event, pro, item.kw, index)" 
                  separator="-KW" 
                ></el-cascader>   -->
                <span v-else :class="`productItem-bottom-stepBetween-input input margin-top20 cursor` " @click="openChangeKw(pro, item.kw, index)" >{{pro[item.kw]}}</span>
            </div> 
            <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1"> 
              <div :class="`productItem-bottom-stepBetween-double flex-box margin-bottom5`"> 
                <!--------------------------节点时长-不可编辑------------------------------------> 
                <template v-if="index == nodeList.length - 2"> 
                  <iText :class="`productItem-bottom-stepBetween-input text `">{{pro[item.keyPoint]}}W</iText> 
                  (<iText :class="`productItem-bottom-stepBetween-input text `">{{pro.bmgFlag === '否' ? '/' : pro[item.keyPoint2] + 'W'}}</iText>)
                </template> 
                <iText v-else :class="`productItem-bottom-stepBetween-input text `">{{pro[item.keyPoint]}}W</iText> 
              </div>  
              <!-- <icon symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon"></icon>  -->
              <span v-html="svgList['iconliuchengjiedianyiwancheng1']" class="step-between-icon"></span>
            </div>  
          </div> 
        </div> 
      </div> 
    </div> 
    <fsConfirm ref="fsConfirmPart" :dialogVisible="dialogVisibleFS" @handleConfirm="handleSendFsConfirm" :tableListNomi="tableListNomi" :tableListKickoff="tableListKickoff" :cartypeProId="cartypeProId" @changeVisible="changeFsConfirmVisible" /> 
    <selectKwDialog :dialogVisible="dialogVisibleSelectKw" @changeVisible="changeSelectKwVisible" :value="selectKw" @handleChange="handleChangeKw" />
  </div> 
</template> 

<script> 
import { iButton, icon, iText, iMessage } from 'rise' 
import { getPartSchedule, getFsUserListPart, exportPartSchedule, partProgressConfirm, updatePartSchedule, getAllFS, addScheduleVersion, getPartGroupConfig, updatePartGroupConfig, getWorkDay } from '@/api/project' 
import logicSettingBtn from '@/views/project/components/logicSettingBtn' 
import moment from 'moment' 
import { partLogicList } from '../data' 
import fsConfirm from './fsconfirm' 
import selectKwDialog from './selectKw'
export default { 
  components: { iButton, icon, iText, logicSettingBtn, fsConfirm, selectKwDialog }, 
  props: { 
    cartypeProId: {type:String}, 
    carProjectName: {type:String}, 
    isSop: {type:Boolean, default: false}, 
    collapseValue: {type:Boolean, default: false} 
  }, 
  data() { 
    return { 
      dialogVisibleFS: false, 
      tableListNomi: [], 
      tableListKickoff: [], 
      logicData: {}, 
      partLogicList, 
      parts: [],  
      partsTemp: [], 
      saveloading: false, 
      loading: false, 
      checkAll: false, 
      isIndeterminate: false,  
      checkedParts: [], 
      targetList: [ 
        {label: '1TO目标', key: '1TOMUBIAO', value: 'vffTarget'},
        {label: 'EM/OTS目标', key: 'EMOTSMUBIAO', value: 'zerosTarget'},
        // {label: '0S目标', key: '0SMUBIAO', value: 'zerosTarget'} 
      ], 
      nodeList: [ 
        {label: '释放', key: 'SHIFANG', kw: 'releaseTimeKw', keyPoint: 'keyReleaseToNomiWeek', isChange: 'keyReleaseToNomiStatus', status: 'releaseStatus'}, 
        {label: '定点', key: 'DINGDIAN', kw: 'nomiTimeKw', keyPoint: 'keyNomiToBffWeek', isChange: 'keyNomiToBffStatus', status: 'nomiStatus'}, 
        {label: '数据冻结', kw: 'bfTimeKw', keyPoint: 'keyBfToFirstTryoutWeek', isChange: 'keyBfToFirstTryoutStatus', status: 'bfStatus'}, 
        {label: '1st Tryout', kw: 'firstTryoutTimeKw', keyPoint: 'keyFirstTryEmWeek', keyPoint2: 'keyFirstTryOtsWeek', isChange: 'keyFirstTryEmStatus', status: 'firstTryStatus'}, 
        {label: 'EM(OTS)', kw: 'emTimeKw', keyPoint: 'keyFirstTryOtsWeek', kw2: 'otsTimeKw', status: 'emStatus', status2: 'otsStatus' } 
      ], 
      logicVisible: false, 
      option: [], 
      selectOptions: {}, 
      versionLoading: false, 
      showDownloadContent: false, 
      downloadTypeList: [ 
        {label: '风险预警零件', key: 'FENGXIANYUJINGLINGJIAN', type: 1}, 
        {label: '未释放零件', key: 'WEISHIFANGLINGJIAN', type: 3}, 
        {label: '数据待冻结零件', key: 'SHUJUDAIDONGJIELINGJIAN', type: 2} 
      ], 
      downloadLoading: false,
      svgList: {
        'iconliuchengjiedianyiwancheng1': '<svg t="1631761282163" class="icon" viewBox="0 0 128000 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="95301" width="200" height="200"><path d="M1212.928 1024C543.232 1024 0 794.624 0 512s543.232-512 1212.928-512h126150.656c669.696 0 641.024 519.68 634.368 512-8.192-15.36 35.84 512-634.368 512z" fill="#1660F1" p-id="95302"></path></svg>',
      },
      sliceArr: [0, 10],
      partLength: 0,
      selectKw: '',
      selectKwPro: {},
      dialogVisibleSelectKw: false
    } 
  }, 
  mounted() { 
    this.option = this.initOption() 
    // let timeId;
    // window.addEventListener('scroll', () => {
    //   // 页面滚动停止100毫秒后才会执行下面的函数。
    //   clearTimeout(timeId);
    //   timeId = setTimeout(() => {
    //     this.scrollToTop();
    //     console.log('执行完了哦');
    //   }, 100);
    // } , true);
  },  
  created() { 
    this.getFSOPtions() 
  }, 
  computed: { 
    yearWeekOptions() {  
      return () => this.option 
      // return (item, props, index) => {  
      //   // eslint-disable-next-line no-undef 
      //   const selectOption = _.cloneDeep(this.option) 
      //   let beforeYear = null, beforeWeek = null, afterYear = null, afterWeek = null 
      //   if (this.nodeList[index - 1]) { 
      //     const beforeNode = item[this.nodeList[index - 1].kw] 
      //     beforeYear = beforeNode.split('-KW')[0]  
      //     beforeWeek = beforeNode.split('-KW')[1] 
      //   }  
      //   if (this.nodeList[index + 1]) { 
      //     const afterNode = props === 'otsTimeKw' ? item[this.nodeList[index + 1].kw2] : item[this.nodeList[index + 1].kw] 
      //     afterYear = afterNode.split('-KW')[0] 
      //     afterWeek = afterNode.split('-KW')[1] 
      //   } 
      //   for(var i = 0; i < selectOption.length; i++) { 
      //     if ((beforeYear && selectOption[i].value < beforeYear) || (afterYear && selectOption[i].value > afterYear)) { 
      //       // this.$set(selectOption[i],'disabled',true) 
      //       selectOption[i].disabled = true 
      //     } else { 
      //       // this.$set(selectOption[i],'disabled',false) 
      //       selectOption[i].disabled = false 
      //       for(var j = 0; j < selectOption[i].children.length; j++) { 
      //         if (beforeYear && beforeWeek && selectOption[i].value == beforeYear && selectOption[i].children[j].value <= beforeWeek) { 
      //           // this.$set(selectOption[i].children[j],'disabled',true) 
      //           selectOption[i].children[j].disabled = true 
      //         } else if (afterYear && afterWeek && selectOption[i].value == afterYear && selectOption[i].children[j].value >= afterWeek) { 
      //           // this.$set(selectOption[i].children[j],'disabled',true) 
      //           selectOption[i].children[j].disabled = true 
      //         } else { 
      //           // this.$set(selectOption[i].children[j],'disabled',false) 
      //           selectOption[i].children[j].disabled = false 
      //         } 
      //       } 
      //     } 
      //   } 
      //   return selectOption 
      // } 
    },
    showParts() {
      return this.parts.length < 10 ? this.parts : this.parts.slice(this.sliceArr[0],this.sliceArr[1])
      // return this.parts
    }
  }, 
  methods: { 
    changeSelectKwVisible(visible) {
      this.dialogVisibleSelectKw = visible
    },
    handleChangeKw(val) {
      const { pro, item, index } = this.selectKwPro
      console.log(val, pro, item, index);
      this.handleChange(val, pro, item, index)
    },
    openChangeKw(pro, item, index) {
      console.log(pro, item, pro[item], index)
      this.selectKw = pro[item]
      this.selectKwPro = {pro, item, index}
      this.changeSelectKwVisible(true)
    },
    load() {
      this.sliceArr = [0, this.sliceArr[1] + 2]
    },
    
    async handleDownload(item) {  
      // item.type 导出类型 1-风险预警 2-未BF 3-未释放 
      const partScheduleInfoVOList = this.partsTemp.filter(pItem => { 
        if (item.type == 1) { 
          const targetList = [pItem.pvsTarget, pItem.vffTarget] 
          return targetList.some(item => item == 3) || targetList.some(item => item == 2) 
        }  
        if (item.type == 2) { 
          return pItem.partPeriod == 4 
        } 
        if (item.type == 3) { 
          return pItem.partPeriod == 1  
        } 
      }) 
      if (partScheduleInfoVOList.length < 1) {
        iMessage.warn(this.language('MEIYOUXUYAODAOCHUDESHUJU','没有需要导出的数据'))
        return
      }
      const params = { 
        cartypeProId: this.cartypeProId,  
        partScheduleInfoVOList: partScheduleInfoVOList, 
        type: item.type 
      } 
      this.downloadLoading = true 
      await exportPartSchedule(params) 
      this.downloadLoading = false  
    }, 
    changeShowDownloadContent(isShow) {  
      this.showDownloadContent = isShow  
    }, 
    /** 
     * @Description: 生成排程版本 
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */    
    handleSecheduleVersion() { 
      this.versionLoading = true  
      const params = {  
        cartypeProId: this.cartypeProId, 
        source: 4, 
        type: 2  
      } 
      addScheduleVersion(params).then(res => { 
        if (res?.result) { 
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } else {  
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        }  
      }).finally(() => { 
        this.versionLoading = false 
      }) 
    }, 
    async gotoDBhistory(part) { 
      this.loading = true 
      try{ 
        const res = await getPartGroupConfig(this.cartypeProId) 
        this.loading = false 
        if (res?.result) {  
          // console.log(this.cartypeProId) 
          const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/historyprocessdb`, query: {partNum: part.partNum,cartypeProId:this.cartypeProId, sixPartCode:part.partNum.slice(3,9), level: '2', categoryType: res.data.category, carProjectName:this.carProjectName}}) 
          window.open(router.href,'_blank') 
        } else { 
          iMessage.warn('HUOQUSUANFAPEIZHISHIBAI','获取算法配置失败') 
        }  
      } catch(error) {  
        this.loading = false  
      }  
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
            this.getPartList(this.cartypeProId) 
          } 
        } else {  
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }).finally(() => {  
        this.$refs.fsConfirmPart.changeSaveLoading(false) 
      }) 
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
    async autoSave() { 
      await this.handleSave(false)  
    }, 
    /** 
     * @Description: 根据选中的行获取每一行的fs下拉列表 
     * @Author: Luoshuang 
     * @param {*} tableList 
     * @return {*} 
     */    
    async getFsUserList(tableList) {  
      const res = await getFsUserListPart(tableList.map(item => item.partNum)) 
        if (res?.result) { 
          return res.data   
        } else { 
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
          return null  
        } 
    }, 
    /**
     * @Description: 获取三个工作日后的日期 
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */    
    async getNextThreeWorkDay() { 
      const params = {
        queryDayNum: 4,
        queryType: 1,
        startDay: moment().format('YYYY-MM-DD')
      }
      const res = await getWorkDay(params) 
      if (res && res.result && res.data && res.data.length > 0) {
        let { year, month, day } = res.data[res.data.length - 1]
        if(+day <10){
          day = '0'+day
        }
        
        if(+month < 10){
          month = '0'+month
        }
        return year + '-' + month + '-' + day
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
    /**
     * @Description: 发送fs 
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */     
    async handleSendFs() { 
      await this.autoSave() 
      try { 
        console.log('3')
        this.loading = true 
        // 筛选出待定点和待kickoff的数据 
        const selectRows = this.partsTemp.filter(item => { 
          const targetList = [item.zerosTarget, item.vffTarget] 
          return !targetList.every(item => item == 1) && (item.fsConfirmStatus	== 1 || item.fsConfirmStatus == 3 || item.fsConfirmStatus	== 4) && (item.partPeriod == 2 || item.partPeriod == 3) 
        }) 
        if (selectRows.length < 1) { 
          iMessage.warn(this.language('MEIYOUFUHETIAOJIANDELINGJIAN','没有符合发送条件的零件')) 
          throw(false) 
        }  
        // 获取询价采购员下拉数据 
        const fsOptions = await this.getFsUserList(selectRows) 
        // 获取三个工作日之后的日期 
        const nextThreeWorkDay = await this.getNextThreeWorkDay() 
        const tableListNomi = []  
        const tableListKickoff = [] 
        const {buyerUserMap={},userInfoVOList=[]} = fsOptions;
        selectRows.forEach((item) => { 
          // const fs = fsOptions && fsOptions[item.partNum] && fsOptions[item.partNum][0].userName || '' 
          // const fsId = fsOptions && fsOptions[item.partNum] && fsOptions[item.partNum][0].userId || '' 
          // const options = fsOptions ? fsOptions[item.partNum]?.reduce((accu, item) => { 
          //   if (item.userId) { 
          //     return [...accu, { 
          //       ...item, 
          //       value: item.userId, 
          //       label: item.userName 
          //     }] 
          //   } else { 
          //     return accu 
          //   } 
          // },[]) : [] 
          let fs = '';
          const fsId = buyerUserMap[item.partNum] ? buyerUserMap[item.partNum]+'' : '';
          userInfoVOList.map((userItem)=>{
            userItem.value = userItem.userId;
            userItem.label = userItem.userName;
            if(fsId && userItem.userId == fsId){
              fs = userItem.userName
            }
          })
 
          const targetList = [item.pvsTarget, item.vffTarget] 
          const tableItem = {  
            // ...item, 
            cartypeProId: this.cartypeProId, 
            cartypeProject: this.carProjectName, 
            cartypeProjectZh:item.cartypeProjectZh,
            partNum: item.partNum, 
            partName: item.partNameZh, 
            confirmDateDeadline: nextThreeWorkDay, 
            projectPurchaser: this.$store.state.permission.userInfo.nameZh, 
            projectPurchaserId: this.$store.state.permission.userInfo.id, 
            // selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions, 
            selectOption:userInfoVOList || [],
            fs, 
            fsId, 
            delayWeek: item.expectImpactWeek, 
            isBmg: item.bmgFlag || '否', 
            scheNomiTimeKw: item.nomiTimeKw, 
            scheKickoffTimeKw: item.kickoffTimeKw, 
            scheFirstTryoutTimeKw: item.firstTryoutTimeKw, 
            scheOtsTimeKw: item.otsTimeKw, 
            scheEmTimeKw: item.emTimeKw, 
            riskLevel: targetList.every(item => item == 1) ? 1 : targetList.some(item => item == 3) ? 3 : 2, 
            confirmStatus: item.fsConfirmStatus, 
            partPeriod: item.partPeriod 
          } 
          if (item.partPeriod == 2) { 
            tableListNomi.push(tableItem) 
          }  
          if (item.partPeriod == 3) {  
            tableListKickoff.push(tableItem)  
          }  
        }) 
        this.tableListNomi = tableListNomi 
        this.tableListKickoff = tableListKickoff 
        this.loading = false 
        this.changeFsConfirmVisible(true) 
      } catch(e) { 
        this.loading = false 
      } 
    }, 
    /** 
     * @Description: 打开算法配置弹窗  
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*}
     */    
    openLogicDialog() {   
      this.getPartGroupConfig()  
      this.changeLogicVisible(true)  
    },  
    /**
     * @Description: 更新零件排程算法配置
     * @Author: Luoshuang 
     * @param {*} logicData 
     * @return {*} 
     */    
    updatePartGroupConfig(logicData) {   
      console.log(logicData)  
      if (!logicData) {  
        return 
      } 
      updatePartGroupConfig({...logicData, cartypeProId: this.cartypeProId}).then(res => { 
        if (res?.result) {  
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
          this.$refs.logicSettingBtn.changeVisible(false)  
          this.getPartList(this.cartypeProId) 
        } else {  
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }).finally(() => { 
        this.$refs.logicSettingBtn.changeSaveLoading(false) 
      }) 
    },
    /**
     * @Description: 获取排程算法 
     * @Author: Luoshuang 
     * @param {*}
     * @return {*} 
     */     
    getPartGroupConfig() {  
      getPartGroupConfig(this.cartypeProId).then(res => { 
        if (res?.result) { 
          this.logicData = res.data 
        } else { 
          this.logicData = {} 
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }) 
    }, 
    /**
     * @Description: 初始化下拉框
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */    
    initOption() { 
      const option = [] 
      for(var i = 2000; i <= moment().year() + 10; i++) { 
        const countMonth = moment(i+'-01-01').weeksInYear() 
        const children = [] 
        for(var j = 1; j <= countMonth; j++) { 
          children.push({value: j<10?'0'+j:j+'',label: j<10?'0'+j:j+''}) 
        } 
        option.push({value:i+'',label:i+'',children:children}) 
      } 
      return option 
    },
    /**
     * @Description: 计算两个节点直接的间隔（周） 
     * @Author: Luoshuang 
     * @param {*} time1 
     * @param {*} time2 
     * @return {*} 
     */    
    getWeekBetween(time1, time2) { 
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
      if (year1 === year2) { 
        return week2 - week1 
      } 
      return -this.getWeekBetween(time2, time1) 
    },  
    /**
     * @Description: 根据起始kw时间和间隔周数计算下一个kw时间
     * @Author: Luoshuang
     * @param {*} start 起始kw时间
     * @param {*} between 间隔周数
     * @return {*}
     */    
    getKw(start, betweenKW) {
      if (!start) {
        return null
      }
      const between = betweenKW || 0
      const startYear = Number(start.split('-KW')[0]) 
      const startWeek = Number(start.split('-KW')[1]) 
      const startAllWeek = moment(startYear+'-01-01').weeksInYear()
      if (startWeek + between > 0 && startWeek + between <= startAllWeek) {
        return startYear + '-KW' + ((startWeek + between) < 10 ? '0' + (startWeek + between) : (startWeek + between))
      } else if (startWeek + between > startAllWeek) {
        let addYearNum = 0
        let addWeek = startWeek + between - startAllWeek
        let nextYear = startYear+addYearNum
        let yearWeek = moment(nextYear+'-01-01').weeksInYear()
        for (let i = addWeek; i > 0; i -= yearWeek) {
          addYearNum += 1
          addWeek = i
          nextYear = startYear+addYearNum
          yearWeek = moment(nextYear+'-01-01').weeksInYear()
        }
        return (startYear + addYearNum) + '-KW' + (addWeek < 10 ? '0' + addWeek : addWeek)
      } else {
        let descYearNum = 0
        let deWeek = startWeek + between
        let lastYear = startYear-descYearNum
        let lasYearWeek = moment(lastYear+'-01-01').weeksInYear()
        for (let j = deWeek; j < 0; j += lasYearWeek) {
          descYearNum += 1
          lastYear = startYear-descYearNum
          lasYearWeek = moment(lastYear+'-01-01').weeksInYear()
          deWeek = lasYearWeek+j
        }
        return (startYear - descYearNum) + '-KW' + (deWeek < 10 ? '0' + deWeek : deWeek)
      }
    },
    /** 
     * @Description: 下拉框更改 
     * @Author: Luoshuang
     * @param {*} val
     * @param {*} item
     * @param {*} props
     * @param {*} index nodeList的index
     * @return {*}
     */    
    handleChange(val, item, props, index) { 
      this.$set(item, props, val) 
      // 为了保存接口只传修改的数据 加一个字段来判断是否编辑过
      this.$set(item,'edit', true) 
      // const index = this.nodeList.findIndex(item => item.kw === props || item.kw2 === props) 
      if (this.nodeList[index - 1]) {  
        this.$set(item, props === 'otsTimeKw' ? this.nodeList[index - 1].keyPoint2 : this.nodeList[index - 1].keyPoint, this.getWeekBetween(item[this.nodeList[index - 1].kw], val)) 
      } 
      if (this.nodeList[index + 1]) { 
        for (let i = index + 1; i < this.nodeList.length; i++) {
          this.$set(item, this.nodeList[i].kw, this.getKw(item[this.nodeList[i - 1].kw], item[this.nodeList[i - 1].keyPoint]))
          i === this.nodeList.length - 1 && item.bmgFlag !== '是' && this.$set(item, this.nodeList[i].kw2, this.getKw(item[this.nodeList[i - 1].kw], item[this.nodeList[i - 1].keyPoint2]))
        }
        // this.$set(item, props === 'otsTimeKw' ? this.nodeList[index].keyPoint2 : this.nodeList[index].keyPoint, this.getWeekBetween(val, props === 'otsTimeKw' ?  item[this.nodeList[index + 1].kw2] : item[this.nodeList[index + 1].kw])) 
      } 
    }, 
    /**
     * @Description: 保存
     * @Author: Luoshuang
     * @param {*} refresh 
     * @return {*}
     */    
    async handleSave(refresh = true) { 
      console.log('1')
      // this.saveloading = true 
      const filterData = this.partsTemp.map(item => { 
        const findItem = this.parts.find(pItem => pItem.partNum === item.partNum) 
        return findItem ? findItem : item 
      })
      const sendData = filterData.filter((item)=>item.edit) || [];

      if(!sendData.length) return;   // 未编辑过不调接口
      
      const res = await updatePartSchedule(sendData)
      if (res?.result) { 
        refresh && iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        await this.getPartList(this.cartypeProId) 
      } else { 
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)  
      } 
      this.saveloading = false 
    },
    /**
     * @Description: 算法配置弹窗状态更新 
     * @Author: Luoshuang 
     * @param {*} visible 
     * @return {*} 
     */    
    changeLogicVisible(visible) { 
      console.log(visible) 
      this.logicVisible = visible 
    }, 
    /**
     * @Description: 根据零件德文名去删选符合的零件
     * @Author: Luoshuang
     * @param {*} partNameDe 
     * @return {*} 
     */    
    getFitPartNameDeList(partNameDe) { 
      return this.partsTemp.reduce((accu, curr) => { 
        if (curr.partNameDe.includes(partNameDe)) { 
          return [...accu, {value:curr.partNameDe}] 
        } 
        return [...accu] 
      },[]) 
    }, 
    /**
     * @Description: 根据零件中文名/德文名去删选符合的零件
     * @Author: Luoshuang
     * @param {*} partNameZh 
     * @return {*}
     */    
    getFitPartNameZhList(partNameZh) { 
      return this.partsTemp.reduce((accu, curr) => { 
        const filterRes = []
        if (curr.partNameZh && curr.partNameZh.toLocaleLowerCase().includes(partNameZh.toLocaleLowerCase())) { 
          filterRes.push({value:curr.partNameZh})
        } 
        if (curr.partNameDe && curr.partNameDe.toLocaleLowerCase().includes(partNameZh.toLocaleLowerCase())) { 
          filterRes.push({value:curr.partNameDe})
        } 
        return [...accu, ...filterRes] 
      },[]) 
    }, 
    /**
     * @Description: 根据零件号去删选符合的零件 
     * @Author: Luoshuang 
     * @param {*} partNum 
     * @return {*} 
     */    
    getFitPartNumList(partNum) { 
      return this.partsTemp.reduce((accu, curr) => { 
        if (curr.partNum && curr.partNum.includes(partNum)) { 
          return [...accu, {value:curr.partNum}] 
        } 
        return [...accu] 
      },[]) 
    }, 
    /**
     * @Description: 搜索零件列表 
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */    
    searchPartList({partNum, partNameZh, partNameDe, level, partStatus}) { 
      this.loading = true 
      // eslint-disable-next-line no-undef
      this.parts = this.partsTemp.filter(item => { 
        let result = true 
        if (partNum && result === true) { 
          result = item.partNum && item.partNum.toLocaleLowerCase().includes(partNum.toLocaleLowerCase()) 
        } 
        if (partNameZh && result === true) { 
          result = item.partNameZh && item.partNameZh.toLocaleLowerCase().includes(partNameZh.toLocaleLowerCase()) || item.partNameDe && item.partNameDe.toLocaleLowerCase().includes(partNameZh.toLocaleLowerCase()) 
        } 
        if (partNameDe && result === true) { 
          result = item.partNameDe.includes(partNameDe) 
        } 
        if (partStatus && result === true) {
          result = ['7','8'].includes(partStatus) ? item.partPeriod == partStatus || item.partPeriod == '6'  : item.partPeriod == partStatus
        }
        if (level && result === true) { 
          const targetList = [item.zerosTarget, item.vffTarget]
          if (level == 1) { 
            result = targetList.every(item => item == 1) 
          } else if (level == 2) { 
            result = !targetList.some(item => item == 3) && targetList.some(item => item == 2) 
          } else if (level == 3) { 
            result = targetList.some(item => item == 3) 
          } 
        } 
        return result 
      })
      this.partLength = this.parts.length 
      this.sliceArr = [0, 10]
      setTimeout(() => { 
        this.loading = false 
      }, 500); 
       
    }, 
    /**
     * @Description: 选中全部零件状态切换 
     * @Author: Luoshuang 
     * @param {*} val 
     * @return {*} 
     */    
    handleCheckAllChange(val) { 
      this.parts = this.parts?.map(item => { 
        return { 
          ...item, 
          isChecked: val 
        } 
      }) 
      this.isIndeterminate = false; 
    }, 
    /**
     * @Description: 产品组checkbox选中状态变更 
     * @Author: Luoshuang 
     * @param {*} value 
     * @param {*} pro 
     * @return {*} 
     */    
    handleCheckboxChange(value, pro) { 
      let checkedCount = this.parts.filter(item => item.isChecked).length; 
      this.checkAll = checkedCount === this.parts.length; 
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.parts.length; 
    }, 
    /**
     * @Description: 获取零件排程列表 
     * @Author: Luoshuang 
     * @param {*} cartypeProId 
     * @param {*} selectPartNums 选择的零件
     * @return {*} 
     */    
    getPartList(cartypeProId, selectPartNums = '') {  
      console.log('2')
      this.loading = true 
      this.$emit('reSetSearchParams')
      getPartSchedule(cartypeProId).then(res => { 
        if (res?.result) { 
          const partList = (res.data || []).map(item => { 
            return { 
              ...item, 
              emIsLarger: this.isLarger(item.emTimeKw, item.otsTimeKw) 
            } 
          }) 
          const selectPartNumsArr = selectPartNums !== '' ? selectPartNums.split(',') : []
          const selectPartNumsArrLength = selectPartNumsArr.length
          // eslint-disable-next-line no-undef 
          this.parts = selectPartNumsArrLength < 1 ? [...partList] : partList.filter(item => selectPartNumsArr.includes(item.partNum))
          // eslint-disable-next-line no-undef 
          this.partsTemp = _.cloneDeep(partList) 
          this.partLength = this.parts.length
          this.checkAll = false 
          this.isIndeterminate = false 
        } else { 
          this.parts = [] 
          this.partsTemp = [] 
          this.partLength = 0
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }).catch(e => {
        this.parts = [] 
        this.partsTemp = [] 
        this.partLength = 0
      }).finally(() => {  
        this.loading = false 
        this.sliceArr = [0, 10]
      })
    }, 
    /**
     * @Description: 判断time1是否大于time2,time1和time2格式为'2021-KW21' 
     * @Author: Luoshuang 
     * @param {*} time1 
     * @param {*} time2 
     * @return {*}
     */    
    isLarger(time1, time2) { 
      if (!time1) { 
        return false 
      } 
      if (!time2) { 
        return true 
      } 
      const year1 = time1.split('-')[0] 
      const week1 = time1.split('KW')[1] 
      const year2 = time2.split('-')[0] 
      const week2 = time2.split('KW')[1] 
      if (year1 > year2) {  
        return true 
      } 
      if (year1 == year2 && week1 >= week2) { 
        return true 
      } 
      return false 
    } 
  } 
} 
</script>

<style lang="scss" scoped>
.partListView { 
  height: calc(100% - 65px); 
  overflow: auto; 
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
    height: calc(100% - 60px); 
    overflow: auto; 
  } 
  .productItem { 
    background-color: rgba(205, 212, 226, 0.12); 
    border-radius: 10px; 
    padding: 25px 20px 30px; 
    &-top { 
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      .checkBox-wrapper {
        display: flex;
        &-text {
          font-weight: bold;
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
          white-space:pre;
        }
      }
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
    } 
    &-bottom { 
      display: flex; 
      justify-content: space-between; 
      margin-top: 30px; 
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
        flex: 10; 
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
          .doubleItem {
            display: flex;
            align-items: center;
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
          margin-top: 15px; 
          .flex-box { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
          } 
          &-input { 
            height: 30px; 
            width: 130px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            ::v-deep .el-input__inner { 
              text-align: center; 
              font-weight: bold; 
              padding-right: 15px; 
              padding-left: 15px; 
            } 
            ::v-deep .el-input__suffix { 
              display: none; 
            } 
            &.text { 
              border: 1px solid rgba(181, 186, 198, 0.19); 
              background-color: rgba(233, 236, 241, 0.75); 
            } 
            &.input {
              font-size: 14px;
              border: 1px solid rgba(181, 186, 198, 0.19); 
              background-color: #fff; 
            }
            &.markBlue { 
              ::v-deep .el-input__inner{ 
                color: rgba(23, 99, 247, 1); 
                text-align: center; 
                border-color: rgba(23, 99, 247, 1); 
              } 
            } 
            &.markRed { 
              color: rgba(227, 13, 13, 1); 
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
              height: 10px;
              width: 100%;
            }
          } 
        } 
        &:nth-child(5) {
          .productItem-bottom-stepBetween {
            .productItem-bottom-stepBetween-double {
              font-size: 18px;
              .productItem-bottom-stepBetween-input {
                width: 80px;
                margin-right: 5px;
                &:last-child {
                  margin-left: 5px;
                }
              }
            } 
          }
        }
        &:nth-child(6) {
          .productItem-bottom-nodeItem {
            div {
              display: flex;
              font-size: 18px;
              .productItem-bottom-stepBetween-input {
                width: 100px;
                font-size: 16px;
                margin-right: 5px;
                &:last-child {
                  margin-left: 5px;
                }
              }
            }
          }
        }
      } 
    } 
  } 
  .productItem + .productItem { 
    margin-top: 20px; 
  } 
  &-title, &-content { 
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
   
} 
</style> 

<style lang="scss">  
.el-popover .partListView-downloadContent {  
  padding: 0 0 8px;  
  div { 
    font-size: 14px;  
    color: #55575A; 
    padding: 10px 20px; 
  } 
  div + div {  
    border-top: 1px solid rgba(112, 112, 112, .1); 
  }  
} 
</style> 