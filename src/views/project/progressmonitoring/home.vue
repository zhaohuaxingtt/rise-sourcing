<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-14 15:21:06
 * @Description: 项目进度监控
 * @FilePath: \front-web\src\views\project\progressmonitoring\home.vue
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
            TIPS表
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
              :hideTaskProcess="item.hideTaskProcess" />
          </el-col>
        </el-row>
        <carEmpty v-else />
      </div>
      <!--  -->
      <div class="countView" v-permission.auto="PROJECTMGT_PROGRESSMONITORING_COUNTTIPS|统计信息">
         <iFormGroup row="4" class="form">
            <iFormItem>
              <span slot="label">{{language('WEIJINTIPSBIAO', '未进TIPS表')}}:</span>
              <iInput v-model="notInTips" disabled />
            </iFormItem>
            <iFormItem>
              <span slot="label">{{language('DAIQUERENDECKDLINGJIAN', '待确认的CKD零件')}}:</span>
              <iInput v-model="ckdconfirm" disabled />
            </iFormItem>
         </iFormGroup>
      </div>
    </iCard>
  </div>
  
</template>

<script>
import {iCard,icon,iFormGroup,iFormItem,iInput,iMessage } from 'rise'
import carProject from '@/views/project/components/carprojectprogress'
import carEmpty from '@/views/project/components/empty/carEmpty'
import projectStateChart from './components/projectStateChart'
import {pendingChartData} from './components/lib/data'
import {getLastCarType, getProjectProgressMonitor} from '@/api/project/process'

export default {
  components: { iCard, icon, carProject, iFormGroup, iFormItem, iInput, projectStateChart, carEmpty},
  data() {
    return {
      carProject: this.$route.query.carProject,
      showTips: false,
      updateTime: window.moment().format('YYYY-MM-DD HH:mm:ss'),
      pendingChartData,
      data: [],
      notInTips: 0,
      ckdconfirm: 0,
      loading: false
    }
  },
  mounted() {
    const carProjectId = this.$route.query.carProject || ''
    const cartypeProjectZh = this.$route.query.cartypeProjectZh || ''
    this.handleCarProjectChange(carProjectId, cartypeProjectZh)
  },
  methods: {
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
          this.carProject && (this.handleCarProjectChange(this.carProject, res.data.cartypeProName))
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        console.log('e',e)
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
          let data = res.data || []
          data = data.map((o, index) => {
            o.id = `chart${index}`
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
            o.type = 1
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
          this.data = [...pendingChartData, ...data]
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
    confirmShowTips(state) {
      // 确认
      const code = state ? 'sureopentips' : 'sureclosetips'
      const desc = state ? '您确定要打开TIPS开关？': '您确定要关闭TIPS开关？'
      this.$confirm(this.language(code,desc)).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          this.data.map((o, index) => {
            if (index <= 1) {
              this.$set(o, 'disabled', !o.disabled)
            }
            return o
          })
        }
      }).catch(()=> {
        this.showTips = !state
      })
    }
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
  ::v-deep.el-form-item {
    margin-bottom: 0px;
    .el-form-item__content {
      .el-input__inner {
        text-align: center;
        background: #F5F6F7;
        color: rgba(22, 96, 241, 1);
      }
    }
  }
}
</style>