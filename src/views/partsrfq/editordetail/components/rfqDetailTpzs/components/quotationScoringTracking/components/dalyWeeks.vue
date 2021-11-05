<!--
 * @Author: your name
 * @Date: 2021-05-25 22:28:31
 * @LastEditTime: 2021-06-09 23:52:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\dalyWeeks.vue
-->
<template>
<div>
  <span v-if='daliyTime == 0'>暂无进度</span>
  <span v-if='daliyTime == 1'><icon symbol name='iconbaojiapingfengenzong-jiedian-huang'></icon> Delay within 2 weeks</span>
  <span v-if='daliyTime == 2'><icon symbol name='iconbaojiapingfengenzong-jiedian-cheng'></icon> Delay within 2-4 weeks</span>
  <span v-if='daliyTime == 3'><icon symbol name='iconbaojiapingfengenzong-jiedian-hong'></icon> Delay for more than 4 weeks</span>
</div>
</template>
<script>
import {icon} from 'rise'
export default{
  components:{icon},
  props:{
    daliyTime:{
      type:Number,
      default: 0
    }
  }
}
</script>
<style lang='scss' scoped>
</style>