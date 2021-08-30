<!--
 * @Author: Luoshuang
 * @Date: 2021-08-25 16:49:24
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-27 17:29:58
 * @Description: 零件排程列表
 * @FilePath: \front-web\src\views\project\schedulingassistant\part\components\partList.vue
-->

<template>
  <div class="partListView" v-loading="loading">
    <div class="partListView-title">
      <div class="partListView-title-span">
        <el-checkbox class="partListView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <span class="partListView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span>
      </div>
      <div v-if="!isSop">
        <logicSettingBtn ref="logicSettingBtn" class="margin-right10" @handleUse="updatePartGroupConfig" @click="openLogicDialog" :logicData="logicData" :logicList="partLogicList" @changeVisible="changeLogicVisible" :logicVisible="logicVisible" />
        <iButton @click="handleSave" :loading="saveloading">{{language('BAOCUN', '保存')}}</iButton>
        <iButton @click="$emit('changeNodeView')">{{language('SHENGCHENGPAICHENGBANBEN', '生成排程版本')}}</iButton>
        <iButton @click="handleSendFs">{{language('FASONGFSQUEREN', '发送FS确认')}}</iButton>
        <iButton @click="handleDownloadPvPk" :loading="downloadLoading">{{language('DAOCHUPAICHENGQINGDAN', '导出排程清单')}}</iButton>
      </div>
    </div>
    <div class="partListView-content">
      <div v-for="pro in parts" :key="pro.label" class="productItem">
        <div class="productItem-top">
          <el-checkbox v-model="pro.isChecked" @change="handleCheckboxChange($event, pro)">
            {{`${pro.partNum} ${pro.partNameZh} ${pro.partNameDe}`}}
          </el-checkbox>
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
            <icon @click.native="gotoDBhistory(pro)" symbol name="iconpaichengzhushou_lishizhi" class="margin-left8 cursor" style="width:20px"></icon>
          </div>
          <div v-for="(item, index) in nodeList" :key="item.key" class="productItem-bottom-node">
            <div class="productItem-bottom-nodeItem">
              <span class="productItem-bottom-nodeItem-label" v-if="!item.label.includes('1st')">{{item.key ? language(item.key, item.label) : item.label}}</span>
              <span class="productItem-bottom-nodeItem-label" v-else>1<sup>st</sup>{{item.label.split('1st')[1]}}</span>
              <icon v-if="pro[item.status] == 1" symbol name="icondingdianguanli-yiwancheng" class="step-icon  click-icon"></icon>
              <icon v-else symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
              <!--------------------------节点发生时间-已发生的不可编辑------------------------------------>
              <template v-if="index == nodeList.length - 1">
                <iText v-if="pro[item.status] == 1 && pro.emIsLarger" :class="`productItem-bottom-stepBetween-input text margin-top20`">{{pro[item.kw]}}</iText>
                <iText v-else-if="pro[item.status] == 1" :class="`productItem-bottom-stepBetween-input text margin-top20`">{{pro[item.kw2]}}</iText>
                <el-cascader
                  v-else-if="pro.emIsLarger"
                  :class="`productItem-bottom-stepBetween-input margin-top20 ` "
                  :value="pro[item.kw].split('-KW')"
                  :options="yearWeekOptions(pro, item.kw, index)"
                  @change="handleChange($event, pro, item.kw, index)"
                  separator="-KW"
                ></el-cascader>
                <el-cascader
                  v-else
                  :class="`productItem-bottom-stepBetween-input margin-top20 ` "
                  :value="pro[item.kw2].split('-KW')"
                  :options="yearWeekOptions(pro, item.kw2, index)"
                  @change="handleChange($event, pro, item.kw2, index)"
                  separator="-KW"
                ></el-cascader>

              </template>
              <iText v-else-if="pro[item.status] == 1" :class="`productItem-bottom-stepBetween-input text margin-top20`">{{pro[item.kw]}}</iText>
              <el-cascader
                  v-else
                  :class="`productItem-bottom-stepBetween-input margin-top20 ` "
                  :value="pro[item.kw].split('-KW')"
                  :options="yearWeekOptions(pro, item.kw, index)"
                  @change="handleChange($event, pro, item.kw, index)"
                  separator="-KW"
                ></el-cascader>
            </div>
            <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1">
              <div :class="`productItem-bottom-stepBetween-double flex-box margin-bottom5`">
                <!--------------------------节点时长-不可编辑------------------------------------>
                <template v-if="index == nodeList.length - 2">
                  <iText v-if="pro.emIsLarger" :class="`productItem-bottom-stepBetween-input text `">{{pro[item.keyPoint]}}W</iText>
                  <iText v-else :class="`productItem-bottom-stepBetween-input text `">{{pro[item.keyPoint2]}}W</iText>
                </template>
                <iText v-else :class="`productItem-bottom-stepBetween-input text `">{{pro[item.keyPoint]}}W</iText>
              </div>
              <icon symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon"></icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fsConfirm ref="fsConfirmPart" :dialogVisible="dialogVisibleFS" @handleConfirm="handleSendFsConfirm" :tableListNomi="tableListNomi" :tableListKickoff="tableListKickoff" :cartypeProId="cartypeProId" @changeVisible="changeFsConfirmVisible" />
  </div>
</template>

<script>
import { iButton, icon, iText, iMessage } from 'rise'
import { getPartSchedule, getFsUserListPart, partProgressConfirm, updatePartSchedule, getAllFS, getFsUserList, getPartGroupConfig, updatePartGroupConfig, validSchedule } from '@/api/project'
import logicSettingBtn from '@/views/project/components/logicSettingBtn'
import moment from 'moment'
import { partLogicList } from '../data'
import fsConfirm from './fsconfirm'
export default {
  components: { iButton, icon, iText, logicSettingBtn, fsConfirm },
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
        {label: 'VFF目标', key: 'VFFMUBIAO', value: 'vffTarget'},
        {label: 'PVS目标', key: 'PVSMUBIAO', value: 'pvsTarget'},
        {label: '0S目标', key: '0SMUBIAO', value: 'zerosTarget'}
      ],
      nodeList: [
        {label: '释放', key: 'SHIFANG', kw: 'releaseTimeKw', keyPoint: 'keyReleaseToNomiWeek', isChange: 'keyReleaseToNomiStatus', status: 'releaseStatus'},
        {label: '定点', key: 'DINGDIAN', kw: 'nomiTimeKw', keyPoint: 'keyNomiToBffWeek', isChange: 'keyNomiToBffStatus', status: 'nomiStatus'},
        {label: 'BF', kw: 'bfTimeKw', keyPoint: 'keyBfToFirstTryoutWeek', isChange: 'keyBfToFirstTryoutStatus', status: 'bfStatus'},
        {label: '1st Tryout', kw: 'firstTryoutTimeKw', keyPoint: 'keyFirstTryEmWeek', keyPoint2: 'keyFirstTryOtsWeek', isChange: 'keyFirstTryEmStatus', status: 'firstTryStatus'},
        {label: 'EM(OTS)', kw: 'emTimeKw', keyPoint: 'keyFirstTryOtsWeek', kw2: 'otsTimeKw', status: 'emStatus', status2: 'otsStatus' }
      ],
      logicVisible: false,
      option: [],
      selectOptions: {},
    }
  },
  mounted() {
    this.option = this.initOption()
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
    }
  },
  methods: {
    async gotoDBhistory(part) {
      this.loading = true
      try{
        const res = await getPartGroupConfig(this.cartypeProId)
        this.loading = false
        if (res?.result) {
          // console.log(this.cartypeProId)
          const router =  this.$router.resolve({path: `/projectscheassistant/historyprocessdb`, query: {...res.data,cartypeProId:this.cartypeProId, sixPartCode:part.partNum.slice(3,9), level: '2', categoryType: res.data.category}})
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
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeFsConfirmVisible(false)
          this.getPartList(this.cartypeProId)
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
    autoSave() {
      this.handleSave(false)
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
     * @Description: 获取三个工作日后的日期
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getNextThreeWorkDay() {
      if (moment().day() === 2 || moment().day() === 1) {
        return moment().add(3, 'days').format('YYYY-MM-DD')
      } else {
        return moment().add(5, 'days').format('YYYY-MM-DD')
      }
    },
    changeFsConfirmVisible(visible) {
      this.dialogVisibleFS = visible
    },
    async handleSendFs() {
      await this.autoSave()
      try {
        this.loading = true
        // 筛选出待定点和待kickoff的数据
        const selectRows = this.partsTemp.filter(item => {
          const targetList = [item.pvsTarget, item.vffTarget, item.zerosTarget]
          return !targetList.every(item => item == 1) && (item.fsConfirmStatus	== 1 || item.fsConfirmStatus == 3) && (item.partPeriod == 2 || item.partPeriod == 3)
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
        selectRows.forEach((item) => {
          const options = fsOptions ? fsOptions[item.partNum]?.map(item => {
            return {
              ...item,
              value: item.userId,
              label: item.userName
            }
          }) : []
          const targetList = [item.pvsTarget, item.vffTarget, item.zerosTarget]
          const tableItem = {
            // ...item,
            carTypeProId: this.cartypeProId,
            carTypeProject: this.carProjectName,
            partNum: item.partNum,
            partName: item.partNameZh,
            confirmDateDeadline: nextThreeWorkDay,
            projectPurchaser: this.$store.state.permission.userInfo.nameZh,
            projectPurchaserId: this.$store.state.permission.userInfo.id,
            selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions,
            fs: options && options[0] ? options[0].label : '',
            fsId: options && options[0] ? options[0].value : '',
            delayWeek: item.expectImpactWeek || 10,
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
    openLogicDialog() {
      this.getPartGroupConfig()
      this.changeLogicVisible(true)
    },
    updatePartGroupConfig() {
      updatePartGroupConfig({...this.logicData, cartypeProId: this.cartypeProId}).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeLogicVisible(false)
          this.getPartList(this.cartypeProId)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.logicSettingBtn.changeSaveLoading(false)
      })
    },
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
    handleChange(val, item, props, index) {
      console.log(val, item, props)
      this.$set(item, props, val.join('-KW'))
      // const index = this.nodeList.findIndex(item => item.kw === props || item.kw2 === props)
      if (this.nodeList[index - 1]) {
        this.$set(item, this.nodeList[index - 1].keyPoint, this.getWeekBetween(item[this.nodeList[index - 1].kw], val.join('-KW')))
      }
      if (this.nodeList[index + 1]) {
        this.$set(item, props === 'otsTimeKw' ? this.nodeList[index].keyPoint2 : this.nodeList[index].keyPoint, this.getWeekBetween(val.join('-KW'), props === 'otsTimeKw' ?  item[this.nodeList[index + 1].kw2] : item[this.nodeList[index + 1].kw]))
      }
    },
    handleSave(refresh = true) {
      this.saveloading = true
      updatePartSchedule(this.partsTemp.map(item => {
        const findItem = this.parts.find(pItem => pItem.partNum === item.partNum)
        return findItem ? findItem : item
      })).then(res => {
        if (res?.result) {
          refresh && iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          refresh && this.getPartList(this.cartypeProId)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveloading = false
      })
    },
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
     * @Description: 根据零件中文名去删选符合的零件
     * @Author: Luoshuang
     * @param {*} partNameZh
     * @return {*}
     */    
    getFitPartNameZhList(partNameZh) {
      return this.partsTemp.reduce((accu, curr) => {
        if (curr.partNameZh.includes(partNameZh)) {
          return [...accu, {value:curr.partNameZh}]
        }
        return [...accu]
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
        if (curr.partNum.includes(partNum)) {
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
    searchPartList({partNum, partNameZh, partNameDe, level}) {
      this.loading = true
      // eslint-disable-next-line no-undef
      this.parts = this.partsTemp.filter(item => {
        let result = true
        if (partNum && result === true) {
          result = item.partNum.includes(partNum)
        }
        if (partNameZh && result === true) {
          result = item.partNameZh.includes(partNameZh)
        }
        if (partNameDe && result === true) {
          result = item.partNameDe.includes(partNameDe)
        }
        if (level && result === true) {
          const targetList = [item.pvsTarget, item.vffTarget, item.zerosTarget]
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
     * @return {*}
     */    
    getPartList(cartypeProId) {
      this.loading = true
      getPartSchedule(cartypeProId).then(res => {
        if (res?.result) {
          const partList = (res.data || []).map(item => {
            return {
              ...item,
              emIsLarger: this.isLarger(item.emTimeKw, item.otsTimeKw)
            }
          })
          // eslint-disable-next-line no-undef
          this.parts = _.cloneDeep(partList)
          // eslint-disable-next-line no-undef
          this.partsTemp = _.cloneDeep(partList)
        } else {
          this.parts = []
          this.partsTemp = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
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
      if (week1 >= week2) {
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