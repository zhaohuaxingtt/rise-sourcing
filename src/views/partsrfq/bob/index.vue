<!--
 * @Author: xuxin
 * @Date: 2021-06-16 10:41:04
 * @Description: 临时入口
 * @FilePath: \front-web\src\views\bob\index.vue
-->
<template>
  <iPage>
    <div>
      <el-radio-group v-model="page" size="mini">
        <el-radio-button label="2">{{$t('专项分析工具')}}</el-radio-button>
        <el-radio-button label="3">{{$t('谈判基本信息')}}</el-radio-button>
      </el-radio-group>
      
      
      <iButton style="float:right">{{$t('costanalysismanage.BaoGaoQingDan')}}</iButton>
      <iButton style="float:right;margin-right:10px">{{$t('search')}}</iButton>
      <iButton style="float:right;margin-right:10px">{{$t('LK_FANHUI')}}</iButton>
    </div>
    <base-info v-if="page==='3'"/>
    <bob v-if="page==='2'"/>
  </iPage>
</template>

<script>
import {iPage,iButton} from "rise"
import BaseInfo from './baseInfo/index.vue'
import Bob from './bob.vue'
export default {
  components:{
    iPage,
    iButton,
    BaseInfo,
    Bob
  },
  data(){
    return {
      page:'2'
    }
  }
}
</script>

<style>

</style>