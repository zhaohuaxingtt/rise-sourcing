<!--
 * @Author: your name
 * @Date: 2021-12-23 10:37:26
 * @LastEditTime: 2021-12-29 16:20:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\preview.vue
-->
<template>
  <div class="paddingScorll">
    <prevewfssugs preview></prevewfssugs>
  </div>
</template>
<script>
import prevewfssugs from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz/index.vue'
export default{
  components:{prevewfssugs}
}
</script>
<style lang='scss' scoped>
  .paddingScorll{
    height: 100%;
    overflow-y: scroll;
    padding: 20px;
    background-color: white;
  }
</style>