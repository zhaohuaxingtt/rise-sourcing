<!--
 * @Author: your name
 * @Date: 2021-11-08 11:48:04
 * @LastEditTime: 2022-01-28 23:54:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailInfo\components\inquiryAttachment\index.vue
-->
<template>
  <div>
    <inquiry-attachment v-if='rfqId' :rfqId='rfqId'/>
    <inquiry-drawing :baseInfo="baseInfo" v-if='rfqId' :rfqId='rfqId' class="margin-top20"/>
  </div>
</template>

<script>
import inquiryAttachment from './components/inquiryAttachment'
import inquiryDrawing from './components/inquiryDrawing'

export default {
  props:{
    rfqId:String,
    baseInfo:{
      type:Object,
      default:()=>{},
    }
  },
  components: {
    inquiryAttachment,
    inquiryDrawing
  },
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>