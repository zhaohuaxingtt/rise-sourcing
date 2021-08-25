<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 16:13:40
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
          {{updateTime}}
        </span>
        <div class="floatright">
          <span>TIPS表</span>
          <el-switch
            v-model="showTips"
          >
          </el-switch>
        </div>
      </div>
      <!-- 图表区 -->
      <div class="diagram">
        <el-row gutter="20">
          <el-col span="3">

          </el-col>
        </el-row>
      </div>
    </iCard>
  </div>
  
</template>

<script>
import {iCard,icon } from 'rise'
import carProject from '@/views/project/components/carprojectprogress'

export default {
  components: { carProject, iCard, icon },
  data() {
    return {
      carProject: '',
      showTips: false,
      updateTime: '2021-08-22 12:22:11'
    }
  },
  methods: {
    handleCarProjectChange(carProjectId, carProjectName) {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.updateTime {
  display: inline-block;
  padding-left: 15px;
  font-size: 12px;
}
</style>