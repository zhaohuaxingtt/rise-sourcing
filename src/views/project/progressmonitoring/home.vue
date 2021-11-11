<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-11 11:07:32
 * @Description: 项目进度监控
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\home.vue
-->
<template>
  <div class="projectoverview" v-permission.auto="PROJECTMGT_PROGRESSMONITORING_PAGE|项目进度监控页面">
    <!--  -->
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                ---------------->
    <!---------------------------------------------------------------------->
    <carProject
      :carProjectId="carProject"
      @handleCarProjectChange="handleCarProjectChange"
      v-permission.auto="PROJECTMGT_PROGRESSMONITORING_CARTYPESCARD|车型项目板块"
     />
     <!--  -->
    <!---------------------------------------------------------------------->
    <!----------                  车型状态                   ---------------->
    <!---------------------------------------------------------------------->
    <!-- -->
    <iCard class="margin-top20" v-permission.auto="PROJECTMGT_PROGRESSMONITORING_CARTYPESTATUS|车型状态" >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language("CHEXINGZHUANGTAI",'车型状态')}}</span>
        <span class="updateTime">
          <icon symbol name="icontongbu" class="icon" />
          {{language("nominationSuggestion_ShuaXinShiJian","刷新时间")}}:
          <span class="time">{{updateTime}}</span>
        </span>
        <div class="floatright" v-permission.auto="PROJECTMGT_PROGRESSMONITORING_TIPS|TIPS表">
          <!--  -->
          <span class="switch">
            {{!showTips ? language("TIPSBIAO","TIPS表") : `${language("TIPSBIAOZONGJI","TIPS表总计")}:`}}
            <el-tooltip placement="top" popper-class="tooltip-proper" v-if="showTips">
              <div slot="content">{{language('TIPSBIAOCONTENTDESC','本数字为匹配异常至EM&OTS已完成八个模块与CKD/HT零件的零件个数汇总')}}</div>
              <span class="tipsSum">{{tipsSum}}</span>
            </el-tooltip>
            <el-switch v-model="showTips" width="35" @change="confirmShowTips"></el-switch>
          </span>
          
        </div>
      </div>
      <!-- 图表区 -->
      <!--  -->
      <div class="diagram" v-loading="loading" v-permission.auto="PROJECTMGT_PROGRESSMONITORING_CHART|进度监控图表">
        <el-row gutter="20" v-if="carProject">
          <el-col span="3" v-for="(item, index) in data" :key="index">
            <projectStateChart
              :data="item"
              :id="item.id"
              :disabled="item.disabled"
              :hideTaskProcess="item.hideTaskProcess"
              @onSeriesBarClick="onSeriesBarClick"
              @onTaskProcessClick="onSeriesBarClick"
              @onTitleClick="onSeriesBarClick" />
          </el-col>
        </el-row>
        <carEmpty v-else />
      </div>
      <!--  -->
      <div class="countView" v-permission.auto="PROJECTMGT_PROGRESSMONITORING_COUNTTIPS|统计信息">
         <iFormGroup row="4" class="form">
            <iFormItem>
              <span slot="label">{{language('WEIJINTIPSBIAO', '未进TIPS表')}}:</span>
              <span class="cursor" @click="toPartList(1)"><iText>{{showTips ? notInTips : 0}}</iText></span>
            </iFormItem>
            <iFormItem>
              <span slot="label">{{language('CKDHTZSBLINGJIAN', 'CKD/HT/ZSB零件')}}:</span>
              <span class="cursor" @click="toPartList(2)"><iText>{{showTips ? ckdconfirm : 0}}</iText></span>
            </iFormItem>
         </iFormGroup>
      </div>
    </iCard>
  </div>
  
</template>

<script>
import {iCard,icon,iFormGroup,iFormItem,iText,iMessage } from 'rise'
import carProject from '@/views/project/components/carprojectprogress'
import carEmpty from '@/views/project/components/empty/carEmpty'
import projectStateChart from './components/projectStateChart'
import {pendingChartData,chartData,projectRisk,partProc,projectDone,patchStatus} from './components/lib/data'
import {getLastCarType, getProjectProgressMonitor,getAutoData,updateAutoData} from '@/api/project/process'
import {selectDictByKeyss} from '@/api/dictionary'

export default {
  components: { iCard, icon, carProject, iFormGroup, iFormItem, iText, projectStateChart, carEmpty},
  data() {
    return {
      carProject: this.$route.query.carProject,
      carProjectName: this.$route.query.cartypeProjectZh,
      showTips: false,
      updateTime: window.moment().format('YYYY-MM-DD HH:mm:ss'),
      pendingChartData,
      projectRisk,
      projectDone,
      partProc,
      patchStatus,
      data: [],
      notInTips: 0,
      ckdconfirm: 0,
      tipsSum: 0,
      options: {},
      loading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * @description: 初始化图表
     * @param {*}
     * @return {*}
     */    
    init() {
      const carProjectId = this.$route.query.carProject || ''
      const cartypeProjectZh = this.$route.query.cartypeProjectZh || ''
      // 获取车型状态
      this.handleCarProjectChange(carProjectId, cartypeProjectZh)
    },
    /**
     * @description: （未进TIPS表/待确认的CKD零件）跳转
     * @param {*} type （1/2）
     * @return {*}
     */    
    toPartList(type) {
      if (!this.showTips) return
      this.$router.push({name: 'progressmonitoring-monitoring-partList', query: {
        carProjectId: this.carProject,
        carProjectName: this.carProjectName,
        type
      }})
    },
    /**
     * @description: 柱状图点击事件
     * @param {*} params
     * @return {*}
     */    
    onSeriesBarClick(params) {
      if (params.disabled) return
      console.log(params)
      const itemName = params.seriesName || params.title
      const target = this.data.find(o => o.title === itemName) || {}
      const targetIndex = this.data.findIndex(o => o.title === itemName)
      // 进度风险对象
      const projectRisk = !params.seriesName ? '' : this.projectRisk.find(o => o.name === params.name) || {}
      // 零件进度
      const partProc = params.seriesName ? '' : this.partProc.find(o => o.name === params.name) || {}
      // 项目已结束指标
      const projectDone = this.projectDone.find(o => o.name === params.name) || {}
      // 匹配异常
      const patchStatus = this.patchStatus.find(o => o.name === params.name) || {}

      // 匹配异常跳转
      if (targetIndex === 0 && !(target && target.disabled)) {
        this.$router.push({name: 'progressmonitoring-parts-taskList', query: {
          cartypeProId: this.carProject,
          carProjectName: this.carProjectName,
          status: patchStatus.code
          }
        })
      }
      if (targetIndex > 0) {
        const query = {
          carProjectId: params.carProjectId,
          carProjectName: params.carProjectName,
          partStatus: params.partStatus,
          projectRisk: projectRisk.code || '',
          partProc: partProc.code || '',
          projectDone: projectDone.code || ''
        }
        console.log('onSeriesBarClick', query, params)
        this.$router.push({name: 'progressmonitoring-detail', query
        })
      }
    },
    /**
     * @description: TIPS表同步
     * @param {*}
     * @return {*}
     */    
    autoTips(cb){
      if (!this.carProject) {
        iMessage.error(this.language('NOCARPROJECTTYPEERROR','未获取到车型项目'))
        return
      }
      const params = {
        cartypeProId:this.carProject,
        autoSyn:this.showTips,
        cartypeProject:this.carProjectName
      }
      updateAutoData(params).then(res => {
        if (res.code === '200') {
          typeof cb === 'function' && (cb())
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    toggleShowAutoTips(state) {
      // 修改tips状态成功后的回调
      this.data.map((o, index) => {
        if (index <= 1) {
          this.$set(o, 'disabled', !state)
        }
        return o
      })
    },
    /**
     * @description: 获取是否打开了TIPS表同步
     * @param {*} carProjectId
     * @return {*}
     */    
    async getAutoCarTips(carProjectId){
      try {
        const res = await getAutoData(carProjectId)
        if (res.code === '200') {
          this.showTips = res.data;
          this.toggleShowAutoTips(res.data)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    /**
     * @description: 获取最后一次查看的车型项目
     * @param {*}
     * @return {*}
     */    
    async getLastCarType() {
      try {
        const res = await getLastCarType()
        if (res.code === '200') {
          this.carProject = res.data.id
          this.carProjectName = res.data.cartypeProName
          this.carProject && (this.handleCarProjectChange(this.carProject, this.carProjectName))
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    /**
     * @description: 获取项目进度详情
     * @param {*} carProjectId 车型项目
     * @param {*} carProjectName 车型名称
     * @return {*}
     */    
    async handleCarProjectChange(carProjectId, carProjectName) {
      this.carProject = String(carProjectId)
      this.carProjectName = carProjectName
      if (!this.carProject) {
        this.getLastCarType()
        return
      }
      // console.log('carProjectId', carProjectId, carProjectName)
      try {
        // const res = require('./moke.json')
        this.loading = true
        const res = await getProjectProgressMonitor({
          carTypeProjectId: carProjectId
        })
        if (res.code === '200') {
          let data = res.data && res.data.records || []
          data = data.map((o, index) => {
            const tarConfig = chartData.find(conf => conf.title === o.modelStatusName) || {}
            // 零件状态
            o.partStatus = tarConfig.code
            // 车型项目名称
            o.carProjectName = this.carProjectName
            // 车型项目id
            o.carProjectId = carProjectId
            // 图表id
            o.id = `chart${index}`
            // 图表标题
            o.title = o.modelStatusName || ''
            o.title === 'tryout待完成' && (o.title = `<span class="sup">1<sup>st</sup> Tryout待完成</span>`)
            // 正常
            o.value1 = o.projectRiskNormal
            // 风险
            o.value2 = o.projectRiskRisk
            // 延误
            o.value3 = o.projectRiskDelay
            // 总计
            o.value4 = o.projectRiskSum
            // 类型
            o.type = tarConfig.type
            if (index < 1) {
              // 待处理
              o.value7 = o.projectRiskDelay
              // 已处理
              o.value8 = o.projectRiskNormal
            }
            // 是否隐藏任务进度
            o.hideTaskProcess = ['EM&OTS已完成', '匹配异常', '待释放'].includes(o.modelStatusName)
            if (index === data.length - 1) {
              o.type = 2
              // 超期汇总
              o.value5 = o.projectRiskDelay
              // 按期汇总
              o.value6 = o.projectRiskNormal
            }
            return o
          })
          this.data = [...data]
          // notInTips
          this.notInTips = res.data && res.data.noTipsNum || 0
          // ckdconfirm
          this.ckdconfirm = res.data && res.data.ckdNum || 0
          // tipsSum
          this.tipsSum = res.data && res.data.tipsSum || 0
          this.updateTime = res.data && res.data.synDate || ''
          // 获取车型状态是否加入TIPS
          await this.getAutoCarTips(carProjectId)
          console.log('this.data', this.data)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      } catch (e) {
        console.log('e',e)
        this.loading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    /**
     * @description: tips开关打开确认
     * @param {*} state
     * @return {*}
     */    
    async confirmShowTips(state) {
      // 确认
      const code = state ? 'sureopentips' : 'sureclosetips'
      const desc = state ? '您确定要打开TIPS开关？': '您确定要关闭TIPS开关？'
      this.$confirm(
        this.language(code,desc), 
        this.language('TIPSTONGBU','TIPS同步'), 
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否'),
          customClass: 'progressmoni-tipsConfirm'
        }
      ).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          this.autoTips(() => {
            this.toggleShowAutoTips(state)
            if (!state) {
              // this.notInTips = 0
              // this.ckdconfirm = 0
              // this.tipsSum = 0
            }
          })
          
        }
      }).catch(()=> {
        this.showTips = !state
      })
    },
    // getOptions() {
    //   let types = [
    //     // 风险等级CODE
    //     "DELAY_GRADE_CONFIG",
    //     // 零件状态code
    //     "PART_PERIOD_TYPE",
    //     // 零件进度
    //     "PARTS_PROGRESS"
    //   ];
    //   selectDictByKeyss(types).then((res) => {
    //     this.options = res.data;
    //   });
    // },
  }
}
</script>
<style lang="scss" scoped>
.updateTime {
  display: inline-block;
  padding-left: 15px;
  font-size: 12px;
  color: #9198A3;
  .icon {
    font-size: 20px;
    color: #1762F7;
  }
}
.diagram {
  height: 450px;
}
.countView {
  .cursor {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  ::v-deep.el-form-item {
    margin-bottom: 0px;
    .el-form-item__content {
      text-align: center !important;
      background: #F5F6F7;
      cursor: pointer;
      height: 40px;
      .itext {
        text-align: center;
        background: #F5F6F7;
        cursor: pointer;
      }
      .el-input__inner {
        text-align: center;
        background: #F5F6F7;
        color: rgba(22, 96, 241, 1);
        cursor: pointer;
      }
    }
  }
}
.switch {
  .tipsSum {
    display: inline-block;
    padding: 0px 5px;
  }
}
</style>
<style lang="scss">
.progressmoni-tipsConfirm {
  .el-message-box__btns {
    display: flex;
    flex-direction: row-reverse;
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>