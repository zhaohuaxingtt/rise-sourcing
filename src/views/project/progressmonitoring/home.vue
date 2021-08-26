<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 16:06:14
 * @Description: 项目进度监控
 * @FilePath: \front-web\src\views\project\progressmonitoring\index.vue
-->
<template>
  <div class="projectoverview">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                ---------------->
    <!---------------------------------------------------------------------->
    <carProject :carProjectId="carProject" @handleCarProjectChange="handleCarProjectChange" />
    <!---------------------------------------------------------------------->
    <!----------                  车型状态                   ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language("CHEXINGZHUANGTAI",'车型状态')}}</span>
        <span class="updateTime">
          <icon symbol name="icontongbu" class="icon" />
          {{language("nominationSuggestion_ShuaXinShiJian","刷新时间")}}:
          <span class="time">{{updateTime}}</span>
        </span>
        <div class="floatright">
          <span class="switch">
            TIPS表
            <el-switch v-model="showTips" width="35"></el-switch>
          </span>
          
        </div>
      </div>
      <!-- 图表区 -->
      <div class="diagram">
        <el-row gutter="20">
          <el-col span="3" v-for="(item, index) in chartData" :key="index">
            <projectStateChart
              :data="item"
              :id="item.id"
              :disabled="item.disabled" />
          </el-col>
        </el-row>
      </div>
      <div class="countView">
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
import {iCard,icon,iFormGroup,iFormItem,iInput } from 'rise'
import carProject from '@/views/project/components/carprojectprogress'
import projectStateChart from './components/projectStateChart'
import {chartData} from './components/lib/data'

export default {
  components: { iCard, icon, carProject, iFormGroup, iFormItem, iInput, projectStateChart,},
  data() {
    return {
      carProject: '',
      showTips: false,
      updateTime: '2021-08-22 12:22:11',
      chartData,
      notInTips: 37,
      ckdconfirm: 10
    }
  },
  methods: {
    handleCarProjectChange(carProjectId, carProjectName) {
      
    }
  },
  watch: {
    showTips() {
      this.chartData.map((o, index) => {
        if (index <= 1) {
          this.$set(o, 'disabled', !o.disabled)
        }
        return o
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